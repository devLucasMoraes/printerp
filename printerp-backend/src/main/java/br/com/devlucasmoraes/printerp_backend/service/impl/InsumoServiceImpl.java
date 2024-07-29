package br.com.devlucasmoraes.printerp_backend.service.impl;

import br.com.devlucasmoraes.printerp_backend.controller.dto.request.AcertoEstoqueDTO;
import br.com.devlucasmoraes.printerp_backend.domain.model.Insumo;
import br.com.devlucasmoraes.printerp_backend.domain.model.RequisicaoEstoqueItem;
import br.com.devlucasmoraes.printerp_backend.domain.repository.InsumoRepository;
import br.com.devlucasmoraes.printerp_backend.service.CategoriaService;
import br.com.devlucasmoraes.printerp_backend.service.InsumoService;
import br.com.devlucasmoraes.printerp_backend.service.exception.BusinessException;
import br.com.devlucasmoraes.printerp_backend.service.exception.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class InsumoServiceImpl implements InsumoService {

    private final InsumoRepository insumoRepository;

    private final CategoriaService categoriaService;

    public InsumoServiceImpl(InsumoRepository insumoRepository, CategoriaService categoriaService) {
        this.insumoRepository = insumoRepository;
        this.categoriaService = categoriaService;
    }

    @Transactional(readOnly = true)
    public Page<Insumo> findAll(Pageable pageable) {
        return this.insumoRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Insumo> dynamicFindAll(Specification<Insumo> specification, Pageable pageable) {

        return this.insumoRepository.findAll(specification, pageable);
    }

    @Transactional(readOnly = true)
    public Insumo findById(Long id) {
        return this.insumoRepository.findById(id).orElseThrow(() -> new NotFoundException("Insumo"));
    }

    @Transactional
    public Insumo create(Insumo insumoToCreate) {

        if (!categoriaService.existsById(insumoToCreate.getCategoria().getId())) {
            throw new NotFoundException("Categoria");
        }

        if (insumoRepository.existsByDescricao(insumoToCreate.getDescricao())) {
            throw new BusinessException("Insumo com mesma descrição já cadastrada");
        }

        insumoToCreate.setCreatedAt(LocalDateTime.now());
        insumoToCreate.setUpdatedAt(LocalDateTime.now());

        return this.insumoRepository.save(insumoToCreate);
    }

    @Transactional
    public Insumo update(Long id, Insumo insumoToUpdate) {
        Insumo dbInsumo = this.findById(id);

        if (!dbInsumo.getId().equals(insumoToUpdate.getId())) {
            throw new BusinessException("Os IDs de atualização devem ser iguais.");
        }

        dbInsumo.setDescricao(insumoToUpdate.getDescricao());
        dbInsumo.setValorUntMedAuto(insumoToUpdate.getValorUntMedAuto());
        if (!insumoToUpdate.getValorUntMedAuto()) {
            dbInsumo.setValorUntMed(insumoToUpdate.getValorUntMed());
        }
        dbInsumo.setUndEstoque(insumoToUpdate.getUndEstoque());
        dbInsumo.setEstoqueMinimo(insumoToUpdate.getEstoqueMinimo());
        dbInsumo.setCategoria(insumoToUpdate.getCategoria());
        dbInsumo.setUpdatedAt(LocalDateTime.now());

        return this.insumoRepository.save(dbInsumo);
    }

    @Transactional
    public void acertarEstoque(AcertoEstoqueDTO acerto) {
        Insumo dbInsumo = this.findById(acerto.idMaterial());


    }

    @Transactional
    public void delete(Long id) {
        Insumo dbInsumo = this.findById(id);
        this.insumoRepository.delete(dbInsumo);
    }

    @Transactional
    public void incrementTotalSaidas(BigDecimal value, Insumo insumo) {
        Insumo dbInsumo = this.findById(insumo.getId());
        var totalSadaAtual = dbInsumo.getTotalSaidas();
        dbInsumo.setTotalSaidas(totalSadaAtual.add(value));
        this.insumoRepository.save(dbInsumo);
    }

    @Transactional
    public void decrementTotalSaidas(BigDecimal value, Insumo insumo) {
        Insumo dbInsumo = this.findById(insumo.getId());
        var totalSadaAtual = dbInsumo.getTotalSaidas();
        dbInsumo.setTotalSaidas(totalSadaAtual.subtract(value));
        this.insumoRepository.save(dbInsumo);
    }

    public Page<Insumo> getAbaixoMinimo(Pageable pageable) {
        return insumoRepository.findAllBelowMinimumStock(pageable);
    }

    public Boolean existsById(Long id) {
        return this.insumoRepository.existsById(id);
    }

    public EstimativaDuracao estimarDuracaoEstoque(Long insumoId) {
        Insumo insumo = insumoRepository.findById(insumoId)
                .orElseThrow(() -> new RuntimeException("Insumo não encontrado"));

        BigDecimal estoqueAtual = insumo.getTotalEntradas().subtract(insumo.getTotalSaidas());
        BigDecimal mediaConsumo = calcularMediaConsumo(insumoId);

        if (mediaConsumo.compareTo(BigDecimal.ZERO) == 0) {
            return null;
        }

        BigDecimal diasEstimados = estoqueAtual.divide(mediaConsumo, 2, BigDecimal.ROUND_HALF_UP);
        LocalDate dataEstimada = LocalDate.now().plusDays(diasEstimados.longValue());

        return new EstimativaDuracao(diasEstimados.doubleValue(), dataEstimada);
    }

    private BigDecimal calcularMediaConsumo(Long insumoId) {
        PageRequest pageRequest = PageRequest.of(0, 5,
                Sort.by(Sort.Direction.DESC, "dataRequisicao"));

        List<RequisicaoEstoqueItem> requisicoes = requisicaoEstoqueItemRepository
                .findByInsumoId(insumoId, pageRequest);

        if (requisicoes.isEmpty()) {
            return BigDecimal.ZERO;
        }

        BigDecimal consumoTotal = requisicoes.stream()
                .map(RequisicaoEstoqueItem::getQuantidade)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        LocalDate primeiraData = requisicoes.get(requisicoes.size() - 1).getDataRequisicao();
        LocalDate ultimaData = requisicoes.get(0).getDataRequisicao();
        long diasTotais = ChronoUnit.DAYS.between(primeiraData, ultimaData) + 1; // +1 para incluir o último dia

        return consumoTotal.divide(BigDecimal.valueOf(diasTotais), 2, BigDecimal.ROUND_HALF_UP);
    }
}

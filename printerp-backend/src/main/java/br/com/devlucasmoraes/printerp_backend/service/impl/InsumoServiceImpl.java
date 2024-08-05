package br.com.devlucasmoraes.printerp_backend.service.impl;

import br.com.devlucasmoraes.printerp_backend.controller.dto.request.AcertoEstoqueDTO;
import br.com.devlucasmoraes.printerp_backend.domain.model.Insumo;
import br.com.devlucasmoraes.printerp_backend.domain.repository.InsumoRepository;
import br.com.devlucasmoraes.printerp_backend.service.CategoriaService;
import br.com.devlucasmoraes.printerp_backend.service.InsumoService;
import br.com.devlucasmoraes.printerp_backend.service.exception.BusinessException;
import br.com.devlucasmoraes.printerp_backend.service.exception.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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

}

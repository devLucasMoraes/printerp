package br.com.devlucasmoraes.printerp_backend.service.impl;

import br.com.devlucasmoraes.printerp_backend.domain.model.Requisitante;
import br.com.devlucasmoraes.printerp_backend.domain.repository.RequisitanteRepository;
import br.com.devlucasmoraes.printerp_backend.service.RequisitanteService;
import br.com.devlucasmoraes.printerp_backend.service.exception.BusinessException;
import br.com.devlucasmoraes.printerp_backend.service.exception.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class RequisitanteServiceImpl implements RequisitanteService {

    private final RequisitanteRepository requisitanteRepository;

    public RequisitanteServiceImpl(RequisitanteRepository requisitanteRepository) {
        this.requisitanteRepository = requisitanteRepository;
    }


   @Transactional(readOnly = true)
    public Page<Requisitante> findAll(Pageable pageable) {
        return this.requisitanteRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Requisitante> dynamicFindAll(Specification<Requisitante> spec, Pageable pageable) {
        return this.requisitanteRepository.findAll(spec, pageable);
    }

    @Transactional(readOnly = true)
    public Requisitante findById(Long id) {
        return this.requisitanteRepository.findById(id).orElseThrow(() -> new NotFoundException("Requisitante"));
    }

    @Transactional
    public Requisitante create(Requisitante requisitanteToCreate) {

        if(requisitanteRepository.existsByNome(requisitanteToCreate.getNome())){
            throw new BusinessException("O nome do requisitante ja existe");
        }

        requisitanteToCreate.setCreatedAt(LocalDateTime.now());
        requisitanteToCreate.setUpdatedAt(LocalDateTime.now());

        return this.requisitanteRepository.save(requisitanteToCreate);
    }

    @Transactional
    public Requisitante update(Long id, Requisitante requisitanteUpdate) {
        Requisitante dbRequisitante = this.findById(id);

        if(!dbRequisitante.getId().equals(requisitanteUpdate.getId())) {
            throw new BusinessException("Os IDs de atualização devem ser iguais.");
        }

        dbRequisitante.setNome(requisitanteUpdate.getNome());
        dbRequisitante.setFone(requisitanteUpdate.getFone());
        dbRequisitante.setUpdatedAt(LocalDateTime.now());

        return this.requisitanteRepository.save(dbRequisitante);
    }

    @Transactional
    public void delete(Long id) {
        Requisitante dbRequisitante = this.findById(id);

        this.requisitanteRepository.delete(dbRequisitante);
    }

    public Boolean existsById(Long id) {
       return this.requisitanteRepository.existsById(id);
    }
}

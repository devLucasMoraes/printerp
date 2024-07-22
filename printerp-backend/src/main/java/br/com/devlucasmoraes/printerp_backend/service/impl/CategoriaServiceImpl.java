package br.com.devlucasmoraes.printerp_backend.service.impl;

import br.com.devlucasmoraes.printerp_backend.domain.model.Categoria;
import br.com.devlucasmoraes.printerp_backend.domain.repository.CategoriaRepository;
import br.com.devlucasmoraes.printerp_backend.service.CategoriaService;
import br.com.devlucasmoraes.printerp_backend.service.exception.BusinessException;
import br.com.devlucasmoraes.printerp_backend.service.exception.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static java.util.Optional.ofNullable;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaServiceImpl(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @Transactional(readOnly = true)
    public Page<Categoria> findAll(Pageable pageable) {
        return this.categoriaRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Categoria> dynamicFindAll(Specification<Categoria> spec, Pageable pageable) {
        return this.categoriaRepository.findAll(spec, pageable);
    }

    @Transactional(readOnly = true)
    public Categoria findById(Long id) {
        return this.categoriaRepository.findById(id).orElseThrow(() -> new NotFoundException("Categoria"));
    }

    @Transactional
    public Categoria create(Categoria categoriaToCreate) {
        ofNullable(categoriaToCreate).orElseThrow(() -> new BusinessException("A categoria a ser criada não deve ser nula."));
        ofNullable(categoriaToCreate.getNome()).orElseThrow(() -> new BusinessException("O nome da categoria a ser criado não deve ser nula."));

        if(categoriaRepository.existsByNome(categoriaToCreate.getNome())){
            throw new BusinessException("Categoria com mesmo nome já cadastrada");
        }

        categoriaToCreate.setCreatedAt(LocalDateTime.now());
        categoriaToCreate.setUpdatedAt(LocalDateTime.now());


        return this.categoriaRepository.save(categoriaToCreate);
    }

    @Transactional
    public Categoria update(Long id, Categoria categoriaToUpdate) {
        Categoria dbCategoria = this.findById(id);

        if(!dbCategoria.getId().equals(categoriaToUpdate.getId())) {
            throw new BusinessException("Os IDs de atualização devem ser iguais.");
        }

        dbCategoria.setNome(categoriaToUpdate.getNome());
        dbCategoria.setUpdatedAt(LocalDateTime.now());

        return this.categoriaRepository.save(dbCategoria);
    }

    @Transactional
    public void delete(Long id) {
        Categoria dbCategoria = this.findById(id);
        this.categoriaRepository.delete(dbCategoria);
    }

    @Transactional(readOnly = true)
    public Boolean existsById(Long id) {
        return this.categoriaRepository.existsById(id);
    }
}

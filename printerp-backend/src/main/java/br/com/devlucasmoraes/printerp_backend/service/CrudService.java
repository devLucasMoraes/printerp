package br.com.devlucasmoraes.printerp_backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CrudService<ID, T> {
    Page<T> findAll(Pageable pageable);
    T findById(ID id);
    T create(T entity);
    T update(ID id, T entity);
    void delete(ID id);

}

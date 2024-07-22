package br.com.devlucasmoraes.printerp_backend.service;

import br.com.devlucasmoraes.printerp_backend.domain.model.Requisitante;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface RequisitanteService extends CrudService<Long, Requisitante>{
    Boolean existsById(Long id);

    Page<Requisitante> dynamicFindAll(Specification<Requisitante> spec, Pageable pageable);

}

package br.com.devlucasmoraes.printerp_backend.service;

import br.com.devlucasmoraes.printerp_backend.controller.dto.request.AcertoEstoqueDTO;
import br.com.devlucasmoraes.printerp_backend.domain.model.Insumo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public interface InsumoService extends CrudService<Long, Insumo>{
    Boolean existsById(Long id);

    Page<Insumo> dynamicFindAll(Specification<Insumo> spec, Pageable pageable);

    void acertarEstoque(AcertoEstoqueDTO acertoEstoqueDTO);

    void incrementTotalSaidas(BigDecimal value, Insumo insumo);

    void decrementTotalSaidas(BigDecimal value, Insumo insumo);

    Page<Insumo> getAbaixoMinimo(Pageable pageable);
}

package br.com.devlucasmoraes.printerp_backend.controller.dto.response;


import br.com.devlucasmoraes.printerp_backend.domain.model.Insumo;
import br.com.devlucasmoraes.printerp_backend.domain.model.Unidade;

import java.math.BigDecimal;

public record ShowAbaixoDoMinimoDTO(
        Long id,
        BigDecimal saldo,
        Unidade undEstoque,
        Boolean abaixoDoMinimo

) {
    public ShowAbaixoDoMinimoDTO(Insumo model) {
        this(
                model.getId(),
                model.getSaldo(),
                model.getUndEstoque(),
                model.getAbaixoDoMinimo()
        );
    }
}

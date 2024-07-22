package br.com.devlucasmoraes.printerp_backend.controller.dto.response;


import br.com.devlucasmoraes.printerp_backend.domain.model.Insumo;
import br.com.devlucasmoraes.printerp_backend.domain.model.Unidade;

import java.math.BigDecimal;

public record ShowSaldoDTO(
        Long id,
        String descricao,
        Long idCategoria,
        BigDecimal totalEntradas,
        BigDecimal totalSaidas,
        Unidade undEstoque,
        BigDecimal saldo,
        BigDecimal valorTotal,
        Boolean abaixoDoMinimo

) {
    public ShowSaldoDTO(Insumo model) {
        this(
                model.getId(),
                model.getDescricao(),
                model.getCategoria().getId(),
                model.getTotalEntradas(),
                model.getTotalSaidas(),
                model.getUndEstoque(),
                model.getSaldo(),
                model.getValorTotal(),
                model.getAbaixoDoMinimo()
        );
    }
}

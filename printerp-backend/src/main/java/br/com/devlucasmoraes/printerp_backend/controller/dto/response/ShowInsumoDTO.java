package br.com.devlucasmoraes.printerp_backend.controller.dto.response;


import br.com.devlucasmoraes.printerp_backend.domain.model.Insumo;
import br.com.devlucasmoraes.printerp_backend.domain.model.Unidade;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ShowInsumoDTO(
        Long id,
        String descricao,
        BigDecimal valorUntMed,
        Boolean valorUntMedAuto,
        Unidade undEstoque,
        BigDecimal estoqueMinimo,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Long idCategoria
) {
    public ShowInsumoDTO(Insumo model) {
        this(
                model.getId(),
                model.getDescricao(),
                model.getValorUntMed(),
                model.getValorUntMedAuto(),
                model.getUndEstoque(),
                model.getEstoqueMinimo(),
                model.getCreatedAt(),
                model.getUpdatedAt(),
                model.getCategoria().getId()
        );
    }
}

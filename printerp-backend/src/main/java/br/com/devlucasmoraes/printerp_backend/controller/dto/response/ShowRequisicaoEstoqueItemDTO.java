package br.com.devlucasmoraes.printerp_backend.controller.dto.response;

import br.com.devlucasmoraes.printerp_backend.domain.model.RequisicaoEstoqueItem;
import br.com.devlucasmoraes.printerp_backend.domain.model.Unidade;

import java.math.BigDecimal;

public record ShowRequisicaoEstoqueItemDTO(
        Long idItem,
        Long idInsumo,
        Unidade undConsumo,
        BigDecimal quantEntregue,
        BigDecimal valorUntEntregue
) {
    public ShowRequisicaoEstoqueItemDTO(RequisicaoEstoqueItem model) {
        this(
                model.getId(),
                model.getInsumo().getId(),
                model.getUnidade(),
                model.getQuantidade(),
                model.getValorUnitario()
        );
    }
}

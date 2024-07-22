package br.com.devlucasmoraes.printerp_backend.controller.dto.request;

import br.com.devlucasmoraes.printerp_backend.domain.model.Insumo;
import br.com.devlucasmoraes.printerp_backend.domain.model.RequisicaoEstoqueItem;
import br.com.devlucasmoraes.printerp_backend.domain.model.Unidade;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record RequisicaoEstoqueItemDTO(
        Long idItem,
        @NotNull Long idInsumo,
        @NotNull Unidade undConsumo,
        @Positive(message = "deve ser maior que zero") BigDecimal quantEntregue
) {
    public RequisicaoEstoqueItem toModel() {
        RequisicaoEstoqueItem model = new RequisicaoEstoqueItem();
        model.setId(this.idItem);
        model.setInsumo(new Insumo(this.idInsumo));
        model.setUnidade(this.undConsumo);
        model.setQuantidade(this.quantEntregue);
        return model;
    }

    public RequisicaoEstoqueItem toNewModel() {
        RequisicaoEstoqueItem model = new RequisicaoEstoqueItem();
        model.setInsumo(new Insumo(this.idInsumo));
        model.setUnidade(this.undConsumo);
        model.setQuantidade(this.quantEntregue);
        return model;
    }
}

package br.com.devlucasmoraes.printerp_backend.controller.dto.request;

import br.com.devlucasmoraes.printerp_backend.domain.model.Categoria;
import br.com.devlucasmoraes.printerp_backend.domain.model.Insumo;
import br.com.devlucasmoraes.printerp_backend.domain.model.Unidade;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record InsumoDTO(
        Long id,
        @NotBlank String descricao,
        BigDecimal valorUntMed,
        @NotNull Boolean valorUntMedAuto,
        @NotNull Unidade undEstoque,
        @NotNull BigDecimal estoqueMinimo,
        @NotNull Long idCategoria
) {
    public Insumo toModel() {
        Insumo model = new Insumo();
        model.setId(this.id);
        model.setDescricao(this.descricao);
        model.setValorUntMedAuto(this.valorUntMedAuto);
        if(!this.valorUntMedAuto) {
            model.setValorUntMed(this.valorUntMed);
        }
        model.setUndEstoque(this.undEstoque);
        model.setEstoqueMinimo(this.estoqueMinimo);
        model.setCategoria(new Categoria(this.idCategoria));
        return model;
    }
}

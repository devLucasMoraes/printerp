package br.com.devlucasmoraes.printerp_backend.controller.dto.request;

import br.com.devlucasmoraes.printerp_backend.domain.model.Categoria;
import jakarta.validation.constraints.NotBlank;

public record CategoriaDTO(
        Long id,
        @NotBlank String nome
) {
    public Categoria toModel() {
        Categoria model = new Categoria();
        model.setId(this.id);
        model.setNome(this.nome);
        return model;
    }
}

package br.com.devlucasmoraes.printerp_backend.controller.dto.response;


import br.com.devlucasmoraes.printerp_backend.domain.model.Categoria;
import br.com.devlucasmoraes.printerp_backend.domain.model.Equipamento;
import br.com.devlucasmoraes.printerp_backend.domain.model.Insumo;
import br.com.devlucasmoraes.printerp_backend.domain.model.Requisitante;

public record AutoCompleteDTO( Long id, String label ) {
    public AutoCompleteDTO(Insumo model) {
        this(
                model.getId(),
                model.getDescricao()
        );
    }

    public AutoCompleteDTO(Categoria model) {
        this(
                model.getId(),
                model.getNome()
        );
    }

    public AutoCompleteDTO(Equipamento model) {
        this(
                model.getId(),
                model.getNome()
        );
    }

    public AutoCompleteDTO(Requisitante model) {
        this(
                model.getId(),
                model.getNome()
        );
    }
}

package br.com.devlucasmoraes.printerp_backend.controller.dto.response;

import br.com.devlucasmoraes.printerp_backend.domain.model.Requisitante;

import java.time.LocalDateTime;

public record ShowRequisitanteDTO(
        Long id,
        String nome,
        String fone,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public ShowRequisitanteDTO(Requisitante requisitante) {
        this(requisitante.getId(), requisitante.getNome(), requisitante.getFone(), requisitante.getCreatedAt(), requisitante.getUpdatedAt());
    }
}

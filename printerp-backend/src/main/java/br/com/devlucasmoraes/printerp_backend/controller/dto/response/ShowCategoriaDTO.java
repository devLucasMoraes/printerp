package br.com.devlucasmoraes.printerp_backend.controller.dto.response;


import br.com.devlucasmoraes.printerp_backend.domain.model.Categoria;

import java.time.LocalDateTime;

public record ShowCategoriaDTO(
        Long id,
        String nome,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public ShowCategoriaDTO(Categoria categoria) {
        this(
                categoria.getId(),
                categoria.getNome(),
                categoria.getCreatedAt(),
                categoria.getUpdatedAt()
        );
    }
}

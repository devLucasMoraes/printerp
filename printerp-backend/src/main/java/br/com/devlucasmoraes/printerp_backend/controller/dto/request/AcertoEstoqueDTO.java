package br.com.devlucasmoraes.printerp_backend.controller.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record AcertoEstoqueDTO(
        @NotBlank
        String justificativa,
        @NotNull
        BigDecimal quantidade,
        @NotNull
        Long idMaterial
) {

}

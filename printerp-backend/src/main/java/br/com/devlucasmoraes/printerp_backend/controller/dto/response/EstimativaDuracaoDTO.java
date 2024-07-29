package br.com.devlucasmoraes.printerp_backend.controller.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

public record EstimativaDuracaoDTO(
        BigDecimal dias,
        LocalDate dataFim
) {
}
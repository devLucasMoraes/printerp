package br.com.devlucasmoraes.printerp_backend.controller.dto.response;

import br.com.devlucasmoraes.printerp_backend.domain.model.RequisicaoEstoque;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static java.util.Collections.emptyList;
import static java.util.Optional.ofNullable;
import static java.util.stream.Collectors.toList;

public record ShowRequisicaoEstoqueDTO(
        Long id,
        LocalDateTime dataRequisicao,
        BigDecimal valorTotal,
        String obs,
        String ordemProducao,
        Long idRequisitante,
        Long idEquipamento,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<ShowRequisicaoEstoqueItemDTO> itens
) {
    public ShowRequisicaoEstoqueDTO(RequisicaoEstoque model) {
        this(
                model.getId(),
                model.getDataRequisicao(),
                model.getValorTotal(),
                model.getObs(),
                model.getOrdemProducao(),
                model.getRequisitante().getId(),
                model.getEquipamento().getId(),
                model.getCreatedAt(),
                model.getUpdatedAt(),
                ofNullable(model.getItens()).orElse(emptyList()).stream().map(ShowRequisicaoEstoqueItemDTO::new).collect(toList())
        );
    }

}

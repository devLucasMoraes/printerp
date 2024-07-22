package br.com.devlucasmoraes.printerp_backend.controller.dto.request;

import br.com.devlucasmoraes.printerp_backend.domain.model.Equipamento;
import br.com.devlucasmoraes.printerp_backend.domain.model.RequisicaoEstoque;
import br.com.devlucasmoraes.printerp_backend.domain.model.Requisitante;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

import static java.util.Collections.emptyList;
import static java.util.Optional.ofNullable;
import static java.util.stream.Collectors.toList;

public record RequisicaoEstoqueDTO(
        Long id,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", locale = "pt_BR") LocalDateTime dataRequisicao,
        String obs,
        String ordemProducao,
        @NotNull Long idRequisitante,
        @NotNull Long idEquipamento,
        @Valid @NotNull @NotEmpty List<RequisicaoEstoqueItemDTO> itens
) {
    public RequisicaoEstoque toModel() {
        RequisicaoEstoque model = new RequisicaoEstoque();
        model.setId(this.id);
        model.setDataRequisicao(this.dataRequisicao);
        model.setObs(this.obs);
        model.setOrdemProducao(this.ordemProducao);
        model.setEquipamento(new Equipamento(this.idEquipamento));
        model.setRequisitante(new Requisitante(this.idRequisitante));
        model.setItens(ofNullable(this.itens)
                .orElse(emptyList())
                .stream().map(RequisicaoEstoqueItemDTO::toModel).collect(toList()));
        return model;
    }

    public RequisicaoEstoque toNewModel() {
        RequisicaoEstoque model = new RequisicaoEstoque();
        model.setDataRequisicao(this.dataRequisicao);
        model.setObs(this.obs);
        model.setOrdemProducao(this.ordemProducao);
        model.setEquipamento(new Equipamento(this.idEquipamento));
        model.setRequisitante(new Requisitante(this.idRequisitante));
        model.setItens(ofNullable(this.itens)
                .orElse(emptyList())
                .stream().map(RequisicaoEstoqueItemDTO::toNewModel).collect(toList()));
        return model;
    }
}

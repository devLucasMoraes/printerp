package br.com.devlucasmoraes.printerp_backend.service;

import br.com.devlucasmoraes.printerp_backend.controller.dto.response.EstimativaDuracaoDTO;
import br.com.devlucasmoraes.printerp_backend.domain.model.RequisicaoEstoque;

public interface RequisicaoEstoqueService extends CrudService<Long, RequisicaoEstoque>{

    EstimativaDuracaoDTO estimarDuracaoEstoque(Long id);
}

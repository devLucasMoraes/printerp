package br.com.devlucasmoraes.printerp_backend.controller;


import br.com.devlucasmoraes.printerp_backend.controller.dto.request.AcertoEstoqueDTO;
import br.com.devlucasmoraes.printerp_backend.controller.dto.response.EstimativaDuracaoDTO;
import br.com.devlucasmoraes.printerp_backend.controller.dto.response.ShowInsumoDTO;
import br.com.devlucasmoraes.printerp_backend.controller.dto.response.ShowSaldoDTO;
import br.com.devlucasmoraes.printerp_backend.controller.filter.InsumoSearchFilter;
import br.com.devlucasmoraes.printerp_backend.service.InsumoService;
import br.com.devlucasmoraes.printerp_backend.service.RequisicaoEstoqueService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/estoque")
@CrossOrigin
public record EstoqueController(InsumoService insumoService, RequisicaoEstoqueService requisicaoEstoqueService) {


    @GetMapping("saldo")
    public ResponseEntity<Page<ShowSaldoDTO>> getSaldo(Pageable pageable) {
        var insumos = insumoService.findAll(pageable);
        var showSaldoDTO = insumos.map(ShowSaldoDTO::new);
        return ResponseEntity.ok(showSaldoDTO);
    }

    @PatchMapping("acerto")
    public  ResponseEntity<Void> acertoEstoque(@RequestBody @Valid AcertoEstoqueDTO acertoEstoqueDTO) {
        insumoService.acertarEstoque(acertoEstoqueDTO);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("query")
    public ResponseEntity<Page<ShowInsumoDTO>> dynamicGetAll(InsumoSearchFilter filters, Pageable pageable) {
        var materiais = insumoService.dynamicFindAll(filters.toSpec(), pageable);
        var materiaisDTO = materiais.map(ShowInsumoDTO::new);
        return ResponseEntity.ok(materiaisDTO);
    }

    @GetMapping("/{id}/estimativa-duracao")
    public ResponseEntity<EstimativaDuracaoDTO> getEstimativaDuracao(@PathVariable Long id) {
        EstimativaDuracaoDTO estimativa = requisicaoEstoqueService.estimarDuracaoEstoque(id);
        if (estimativa == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(estimativa);
    }

}

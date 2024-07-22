package br.com.devlucasmoraes.printerp_backend.controller;


import br.com.devlucasmoraes.printerp_backend.controller.dto.response.ShowAbaixoDoMinimoDTO;
import br.com.devlucasmoraes.printerp_backend.service.InsumoService;
import br.com.devlucasmoraes.printerp_backend.service.RequisicaoEstoqueService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/dashboard")
@CrossOrigin
public record DashboardController(RequisicaoEstoqueService requisicaoEstoqueService, InsumoService insumoService) {

    @GetMapping("abaixo-do-minimo")
        public ResponseEntity<Page<ShowAbaixoDoMinimoDTO>> getAbaixoMinimo(Pageable pageable) {
        var insumos = insumoService.getAbaixoMinimo(pageable);
        var insumosDTO = insumos.map(ShowAbaixoDoMinimoDTO::new);
        return ResponseEntity.ok(insumosDTO);
    }

}

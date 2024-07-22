package br.com.devlucasmoraes.printerp_backend.controller;


import br.com.devlucasmoraes.printerp_backend.controller.dto.request.InsumoDTO;
import br.com.devlucasmoraes.printerp_backend.controller.dto.response.AutoCompleteDTO;
import br.com.devlucasmoraes.printerp_backend.controller.dto.response.ShowInsumoDTO;
import br.com.devlucasmoraes.printerp_backend.controller.filter.InsumoSearchFilter;
import br.com.devlucasmoraes.printerp_backend.service.InsumoService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("api/insumos")
@CrossOrigin
public record InsumoController(InsumoService insumoService) {

    @PostMapping("create")
    public ResponseEntity<ShowInsumoDTO> create(@RequestBody @Valid InsumoDTO insumoDTO) {
        var material = insumoService.create(insumoDTO.toModel());
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(material.getId())
                .toUri();
        return ResponseEntity.created(location).body(new ShowInsumoDTO(material));
    }

    @GetMapping
    public ResponseEntity<Page<ShowInsumoDTO>> getAll(Pageable pageable) {
        var materiais = insumoService.findAll(pageable);
        var materiaisDTO = materiais.map(ShowInsumoDTO::new);
        return ResponseEntity.ok(materiaisDTO);
    }

    @GetMapping("query")
    public ResponseEntity<Page<ShowInsumoDTO>> dynamicGetAll(InsumoSearchFilter filters, Pageable pageable) {
        var materiais = insumoService.dynamicFindAll(filters.toSpec(), pageable);
        var materiaisDTO = materiais.map(ShowInsumoDTO::new);
        return ResponseEntity.ok(materiaisDTO);
    }

    @GetMapping("autocomplete")
    public ResponseEntity<Page<AutoCompleteDTO>> searchTerm(InsumoSearchFilter filters, Pageable pageable) {
        var materiais = insumoService.dynamicFindAll(filters.toSpec(), pageable);
        var materiaisDTO = materiais.map(AutoCompleteDTO::new);
        return ResponseEntity.ok(materiaisDTO);
    }

    @GetMapping("show/{id}")
    public ResponseEntity<ShowInsumoDTO> getById(@PathVariable Long id) {
        var material = insumoService.findById(id);
        return ResponseEntity.ok(new ShowInsumoDTO(material));
    }


    @PutMapping("edit/{id}")
    public  ResponseEntity<ShowInsumoDTO> updateById(@PathVariable Long id, @RequestBody @Valid InsumoDTO insumoDTO) {
        var material = insumoService.update(id, insumoDTO.toModel());
        return ResponseEntity.ok(new ShowInsumoDTO(material));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        insumoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

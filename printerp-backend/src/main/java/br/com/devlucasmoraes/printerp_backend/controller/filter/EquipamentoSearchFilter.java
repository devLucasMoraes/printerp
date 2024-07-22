package br.com.devlucasmoraes.printerp_backend.controller.filter;

import br.com.devlucasmoraes.printerp_backend.domain.model.Equipamento;
import org.springframework.data.jpa.domain.Specification;

public record EquipamentoSearchFilter(
        String label,
        String nome,
        Long id) {
    public Specification<Equipamento> toSpec() {
        Specification<Equipamento> spec = Specification.where(null);

        if (this.label != null) {
            spec = spec.and(nomeLike(this.label));
        }

        if (this.nome != null) {
            spec = spec.and(nomeLike(this.nome));
        }

        if (this.id != null) {
            spec = spec.and(equipamentoIdIs(this.id));
        }

        return spec;
    }

    private Specification<Equipamento> nomeLike(String nome) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(
                criteriaBuilder.lower(root.get("nome")),
                "%" + nome.toLowerCase() + "%");
    }

    private Specification<Equipamento> equipamentoIdIs(Long id) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("id"), id);
    }

}

package br.com.devlucasmoraes.printerp_backend.controller.filter;

import br.com.devlucasmoraes.printerp_backend.domain.model.Requisitante;
import org.springframework.data.jpa.domain.Specification;

public record RequisitanteSearchFilter(
        String label,
        String nome,
        Long id) {
    public Specification<Requisitante> toSpec() {
        Specification<Requisitante> spec = Specification.where(null);

        if (this.label != null) {
            spec = spec.and(nomeLike(this.label));
        }

        if (this.nome != null) {
            spec = spec.and(nomeLike(this.nome));
        }

        if (this.id != null) {
            spec = spec.and(requisitanteIdIs(this.id));
        }

        return spec;
    }

    private Specification<Requisitante> nomeLike(String nome) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(
                criteriaBuilder.lower(root.get("nome")),
                "%" + nome.toLowerCase() + "%");
    }

    private Specification<Requisitante> requisitanteIdIs(Long id) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("id"), id);
    }

}

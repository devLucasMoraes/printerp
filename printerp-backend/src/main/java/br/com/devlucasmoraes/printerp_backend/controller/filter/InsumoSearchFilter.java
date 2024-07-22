package br.com.devlucasmoraes.printerp_backend.controller.filter;

import br.com.devlucasmoraes.printerp_backend.domain.model.Insumo;
import org.springframework.data.jpa.domain.Specification;

public record InsumoSearchFilter(
        String label,
        String descricao,
        Long id_categoria,
        Long id

) {
    public Specification<Insumo> toSpec() {
        Specification<Insumo> spec = Specification.where(null);

        if (this.label != null) {
            spec = spec.and(descricaoLike(this.label));
        }

        if(this.descricao != null){
            spec = spec.and(descricaoLike(this.descricao));
        }

        if(this.id_categoria != null){
            spec = spec.and(categoriaIdIs(this.id_categoria));
        }

        if(this.id != null){
            spec = spec.and(insumoIdIs(this.id));
        }

        return spec;
    }

    private Specification<Insumo> descricaoLike(String descricao) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("descricao")),
                        "%" + descricao.toLowerCase() + "%");
    }

    private Specification<Insumo> categoriaIdIs(Long id) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("categoria").get("id"), id);
    }

    private Specification<Insumo> insumoIdIs(Long id) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("id"), id);
    }
}

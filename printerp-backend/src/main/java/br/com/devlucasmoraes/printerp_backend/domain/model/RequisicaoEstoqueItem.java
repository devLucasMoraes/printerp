package br.com.devlucasmoraes.printerp_backend.domain.model;


import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "requisicoes_estoque_itens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class RequisicaoEstoqueItem extends BaseItem{

    @ManyToOne
    @JoinColumn(name = "requisicoes_estoque_id", nullable = false)
    private RequisicaoEstoque requisicaoEstoque;

}

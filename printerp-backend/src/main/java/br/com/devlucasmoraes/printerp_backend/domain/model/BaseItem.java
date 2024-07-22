package br.com.devlucasmoraes.printerp_backend.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@MappedSuperclass
@Getter
@Setter
public class BaseItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "insumos_id", nullable = false)
    private Insumo insumo;

    @Column(name = "quantidade", nullable = false)
    private BigDecimal quantidade;

    @Enumerated(EnumType.STRING)
    @JoinColumn(name = "unidade", nullable = false)
    private Unidade unidade;

    @Column(name = "valor_unitario", nullable = false)
    private BigDecimal valorUnitario = BigDecimal.ZERO;

    public BigDecimal getValorTotal() {
        return this.quantidade.multiply(this.valorUnitario);
    }
}

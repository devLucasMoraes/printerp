package br.com.devlucasmoraes.printerp_backend.domain.repository;

import br.com.devlucasmoraes.printerp_backend.domain.model.RequisicaoEstoque;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequisicaoEstoqueRepository extends JpaRepository<RequisicaoEstoque, Long> {

    @Query("SELECT requisicaoEstoque FROM RequisicaoEstoque requisicaoEstoque " +
            "JOIN requisicaoEstoque.itens item " +
            "WHERE item.insumo.id = :insumoId " +
            "ORDER BY requisicaoEstoque.dataRequisicao DESC")
    List<RequisicaoEstoque> findByInsumoIdOrderByDataRequisicaoDesc(Long insumoId, Pageable pageable);
}

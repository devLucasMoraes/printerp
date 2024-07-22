package br.com.devlucasmoraes.printerp_backend.domain.repository;

import br.com.devlucasmoraes.printerp_backend.domain.model.RequisicaoEstoque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequisicaoEstoqueRepository extends JpaRepository<RequisicaoEstoque, Long> {
}

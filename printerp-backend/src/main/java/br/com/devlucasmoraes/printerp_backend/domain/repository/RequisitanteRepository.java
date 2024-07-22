package br.com.devlucasmoraes.printerp_backend.domain.repository;

import br.com.devlucasmoraes.printerp_backend.domain.model.Requisitante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RequisitanteRepository extends JpaRepository<Requisitante, Long>, JpaSpecificationExecutor<Requisitante> {

    boolean existsByNome(String nome);
}

package br.com.devlucasmoraes.printerp_backend.domain.repository;


import br.com.devlucasmoraes.printerp_backend.domain.model.Insumo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InsumoRepository extends JpaRepository<Insumo, Long>, JpaSpecificationExecutor<Insumo> {

    boolean existsByDescricao(String descricao);

    @Query("SELECT i FROM Insumo i WHERE i.totalEntradas - i.totalSaidas < i.estoqueMinimo")
    Page<Insumo> findAllBelowMinimumStock(Pageable pageable);
}

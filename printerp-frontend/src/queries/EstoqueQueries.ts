/* eslint-disable react-hooks/rules-of-hooks */
import { TSaldoEstoque } from "@/schemas";
import { estoqueService, EstoqueService } from "@/services/EstoqueService";
import { queryOptions } from "@tanstack/react-query";
import { QueryBase } from "./QueryBase";

class EstoqueQueries extends QueryBase<TSaldoEstoque> {
  constructor() {
    super("ESTOQUE-KEY", new EstoqueService());
  }

  getSaldo(page: number, pageSize: number) {
    return queryOptions({
      queryKey: [this.resourceKey, page, pageSize],
      queryFn: () => estoqueService.getSaldo(page, pageSize),
    });
  }

  getEstimativaDuracaoTodos(page: number, pageSize: number) {
    return queryOptions({
      queryKey: [this.resourceKey, page, pageSize],
      queryFn: () => estoqueService.getEstimativaDuracaoTodos(page, pageSize),
    });
  }

  /*   acertoEstoque() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (data: TAcerto) => materialService.acertoEstoque(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [this.resourceKey] })
      },
      onError: error => {
        alert(error)
      }
    })
  } */
}

export const estoqueQueries = new EstoqueQueries();

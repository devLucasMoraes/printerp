/* eslint-disable react-hooks/rules-of-hooks */
import { TSaldoEstoque } from "@/schemas";
import { EstoqueService } from "@/services/EstoqueService";
import { insumoService } from "@/services/InsumoService";
import { queryOptions } from "@tanstack/react-query";
import { QueryBase } from "./QueryBase";

class EstoqueQueries extends QueryBase<TSaldoEstoque> {
  constructor() {
    super("ESTOQUE-KEY", new EstoqueService());
  }

  getEstoque(page: number, pageSize: number) {
    return queryOptions({
      queryKey: [this.resourceKey, page, pageSize],
      queryFn: () => insumoService.getEstoque(page, pageSize),
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

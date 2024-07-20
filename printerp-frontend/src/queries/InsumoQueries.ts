/* eslint-disable react-hooks/rules-of-hooks */
import { TInsumo } from "@/schemas";
import { InsumoService, insumoService } from "@/services/InsumoService";
import { queryOptions } from "@tanstack/react-query";
import { QueryBase } from "./QueryBase";

class InsumoQueries extends QueryBase<TInsumo> {
  constructor() {
    super("INSUMO-KEY", new InsumoService());
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

export const insumoQueries = new InsumoQueries();

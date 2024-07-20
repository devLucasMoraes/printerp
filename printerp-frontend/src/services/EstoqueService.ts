import { ApiInstance } from "@/api";
import { Environment } from "@/environment";
import { TInsumo, TSaldoEstoque } from "@/schemas";
import { TAutocompleteOption, TSpringPageData } from "@/types/models";
import { BaseService } from "./BaseService";

export class EstoqueService extends BaseService<
  TSaldoEstoque,
  TSpringPageData<TSaldoEstoque>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super("/estoque/saldo");
  }

  async getSaldo(
    page = 0,
    size = Environment.LIMITE_DE_LINHAS
  ): Promise<TSpringPageData<TInsumo>> {
    const path = `/estoque?page=${page}&size=${size}`;

    const response = await ApiInstance.get<TSpringPageData<TInsumo>>(
      `${this.endpoint}${path}`
    );

    return response.data;
  }

  /*   async acertoEstoque(data: TAcerto): Promise<TAcerto> {
    const response = await ApiInstance.patch(
      `${this.endpoint}/estoque/acerto`,
      data
    );
    return response.data;
  } */
}

export const estoqueService = new EstoqueService();

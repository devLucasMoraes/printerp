import { ApiInstance } from "@/api";
import { Environment } from "@/environment";
import { TInsumo } from "@/schemas";
import { TAutocompleteOption, TSpringPageData } from "@/types/models";
import { BaseService } from "./BaseService";

export class InsumoService extends BaseService<
  TInsumo,
  TSpringPageData<TInsumo>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super("/insumos");
  }

  async getEstoque(
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

export const insumoService = new InsumoService();

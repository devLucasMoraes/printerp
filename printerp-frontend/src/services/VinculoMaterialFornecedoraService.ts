import { ApiInstance } from "@/api";
import { TVinculoMaterialFornecedora } from "@/schemas";
import { TAutocompleteOption, TSpringPageData } from "@/types/models";
import { BaseService } from "./BaseService";

export class VinculoMaterialFornecedoraService extends BaseService<
  TVinculoMaterialFornecedora,
  TSpringPageData<TVinculoMaterialFornecedora>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super("/vinculos");
  }

  async dynamicGetOne(query: string): Promise<TVinculoMaterialFornecedora> {
    const response = await ApiInstance.get<TVinculoMaterialFornecedora>(
      `${this.endpoint}/show/query${query}`
    );

    return response.data;
  }
}

export const vinculoMaterialFornecedoraService =
  new VinculoMaterialFornecedoraService();

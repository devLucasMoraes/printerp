import { TRequisicaoEstoque } from "@/schemas";
import { TAutocompleteOption, TSpringPageData } from "@/types/models";
import { BaseService } from "./BaseService";

export class RequisicaoEstoqueService extends BaseService<
  TRequisicaoEstoque,
  TSpringPageData<TRequisicaoEstoque>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super("/requisicoes-estoque");
  }
}

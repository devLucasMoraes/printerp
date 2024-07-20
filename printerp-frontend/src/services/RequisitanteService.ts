import { TRequisitante } from "@/schemas";
import { TAutocompleteOption, TSpringPageData } from "@/types/models";
import { BaseService } from "./BaseService";

export class RequisitanteService extends BaseService<
  TRequisitante,
  TSpringPageData<TRequisitante>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super("/requisitantes");
  }
}

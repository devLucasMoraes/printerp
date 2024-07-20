import { TEquipamento } from "@/schemas";
import { TAutocompleteOption, TSpringPageData } from "@/types/models";
import { BaseService } from "./BaseService";

export class EquipamentoService extends BaseService<
  TEquipamento,
  TSpringPageData<TEquipamento>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super("/equipamentos");
  }
}

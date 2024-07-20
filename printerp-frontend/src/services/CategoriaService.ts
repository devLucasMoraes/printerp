import { TCategoria } from "@/schemas";
import { TAutocompleteOption, TSpringPageData } from "@/types/models";
import { BaseService } from "./BaseService";

export class CategoriaService extends BaseService<
  TCategoria,
  TSpringPageData<TCategoria>,
  TSpringPageData<TAutocompleteOption>
> {
  constructor() {
    super("/categorias");
  }
}

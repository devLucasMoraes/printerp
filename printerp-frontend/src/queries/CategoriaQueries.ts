import { TCategoria } from "@/schemas";
import { CategoriaService } from "@/services/CategoriaService";
import { QueryBase } from "./QueryBase";

class CategoriaQueries extends QueryBase<TCategoria> {
  constructor() {
    super("CATEGORIA-KEY", new CategoriaService());
  }
}

export const categoriaQueries = new CategoriaQueries();

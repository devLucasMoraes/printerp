import { TRequisitante } from "@/schemas";
import { RequisitanteService } from "@/services/RequisitanteService";
import { QueryBase } from "./QueryBase";

class RequisitanteQueries extends QueryBase<TRequisitante> {
  constructor() {
    super("REQUISITANTE-KEY", new RequisitanteService());
  }
}

export const requisitanteQueries = new RequisitanteQueries();

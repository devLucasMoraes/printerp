import { TRequisicaoEstoque } from "@/schemas";
import { RequisicaoEstoqueService } from "@/services/RequisicaoDeEstoqueService";
import { QueryBase } from "./QueryBase";

class RequisicaoEstoqueQueries extends QueryBase<TRequisicaoEstoque> {
  constructor() {
    super("REQUISICAO-ESTOQUE-KEY", new RequisicaoEstoqueService());
  }
}

export const requisicaoEstoqueQueries = new RequisicaoEstoqueQueries();

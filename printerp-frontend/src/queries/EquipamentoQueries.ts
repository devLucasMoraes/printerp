import { TEquipamento } from "@/schemas";
import { EquipamentoService } from "@/services/EquipamentoService";
import { QueryBase } from "./QueryBase";

class EquipamentoQueries extends QueryBase<TEquipamento> {
  constructor() {
    super("EQUIPAMENTO-KEY", new EquipamentoService());
  }
}

export const equipamentoQueries = new EquipamentoQueries();

import { Unidade } from "@/types/enum";
import { z } from "zod";

export const ConversaoDeConsumoSchema = z.object({
  idConversao: z.number().optional(),
  undConsumo: z.string().min(1),
  undEstoque: z.string().min(1),
  fatorDeConversao: z.coerce.number(),
});

export const categoriaSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TCategoria = z.infer<typeof categoriaSchema>;

export const ConversaoDeCompraSchema = z.object({
  idConversao: z.number().optional(),
  undCompra: z.string().min(1),
  undEstoque: z.string().min(1),
  fatorDeConversao: z.number(),
});

export const VinculoMaterialFornecedoraSchema = z.object({
  idVinculo: z.number().optional(),
  idFornecedora: z.number(),
  idMaterial: z.number().optional(),
  referenciaFornecedora: z.string(),
  descricaoFornecedora: z.string().optional(),
  conversoesDeCompra: z.array(ConversaoDeCompraSchema).optional(),
});

export type TVinculoMaterialFornecedora = z.infer<
  typeof VinculoMaterialFornecedoraSchema
>;

export const insumoSchema = z.object({
  id: z.number().optional(),
  descricao: z.string().min(1),
  valorUntMed: z.coerce.number().nonnegative(),
  valorUntMedAuto: z.boolean(),
  undEstoque: z.nativeEnum(Unidade),
  estoqueMinimo: z.coerce.number().nonnegative(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  idCategoria: z.number(),
});

export type TInsumo = z.infer<typeof insumoSchema>;

export const FornecedoraSchema = z.object({
  id: z.number().optional(),
  nomeFantasia: z.string().min(1),
  razaoSocial: z.string().min(1),
  cnpj: z.string().min(1),
  fone: z.string().min(1),
  materiaisVinculados: z.array(VinculoMaterialFornecedoraSchema).optional(),
});

export type TFornecedora = z.infer<typeof FornecedoraSchema>;

export const TransportadoraSchema = z.object({
  id: z.number().optional(),
  nomeFantasia: z.string().min(1),
  razaoSocial: z.string().min(1),
  cnpj: z.string().min(1),
  fone: z.string().min(1),
});

export type TTransportadora = z.infer<typeof TransportadoraSchema>;

export const requisitanteSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1),
  fone: z.string().min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TRequisitante = z.infer<typeof requisitanteSchema>;

export const equipamentoSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TEquipamento = z.infer<typeof equipamentoSchema>;

export const ItemNfeDeCompraSchema = z.object({
  idItem: z.number().optional(),
  idMaterial: z.number(),
  undCom: z.nativeEnum(Unidade),
  quantCom: z.number(),
  valorUntCom: z.number(),
  valorIpi: z.number(),
  descricaoFornecedora: z.string().optional(),
  referenciaFornecedora: z.string().optional(),
});

export const NfeDeCompraSchema = z.object({
  id: z.number().optional(),
  nfe: z.string().optional(),
  chaveNfe: z.string().optional(),
  dataEmissao: z.date().optional().nullable(),
  dataRecebimento: z.date(),
  valorFrete: z.number().optional(),
  valorSeguro: z.number().optional(),
  valorDesconto: z.number().optional(),
  valorOutros: z.number().optional(),
  valorTotalIpi: z.number().optional(),
  valorTotalProdutos: z.number().optional(),
  valorTotalNfe: z.number().optional(),
  obs: z.string().optional(),
  idTransportadora: z.number(),
  idFornecedora: z.number(),
  itens: z.array(ItemNfeDeCompraSchema),
});

export type TNfeDeCompra = z.infer<typeof NfeDeCompraSchema>;

export const requisicaoEstoqueItemSchema = z.object({
  idItem: z.number().optional(),
  idInsumo: z.number(),
  undConsumo: z.nativeEnum(Unidade),
  quantEntregue: z.coerce.number(),
  valorUntEntregue: z.coerce.number().optional(),
});

export const requisicaoEstoqueSchema = z.object({
  id: z.number().optional(),
  dataRequisicao: z.date(),
  valorTotal: z.number().optional(),
  obs: z.string().optional(),
  ordemProducao: z.string().optional(),
  idRequisitante: z.coerce.number(),
  idEquipamento: z.coerce.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  itens: z.array(requisicaoEstoqueItemSchema),
});

export type TRequisicaoEstoque = z.infer<typeof requisicaoEstoqueSchema>;

export const saldoEstoqueSchema = z.object({
  id: z.number().optional(),
  idCategoria: z.coerce.number(),
  descricao: z.string(),
  totalEntradas: z.coerce.number(),
  totalSaidas: z.coerce.number(),
  undEstoque: z.nativeEnum(Unidade),
  saldo: z.coerce.number(),
  valorTotal: z.coerce.number(),
  abaixoDoMinimo: z.boolean(),
});

export type TSaldoEstoque = z.infer<typeof saldoEstoqueSchema>;

export const AcertoSchema = z.object({
  id: z.number().optional(),
  idMaterial: z.number(),
  justificativa: z.string().min(1),
  quantidade: z.number(),
});

import { TRequisicaoEstoque, requisicaoEstoqueSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";
import RequisicoesEstoqueForm from "./RequisicoesEstoqueForm";

const DevT: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
);

export default function RequisicoesEstoqueFormProvider({
  data,
  id,
}: {
  data?: TRequisicaoEstoque;
  id?: string;
}) {
  const methods = useForm<TRequisicaoEstoque>({
    mode: "all",
    resolver: zodResolver(requisicaoEstoqueSchema),
    defaultValues: {
      dataRequisicao: new Date(Date.now()),
      obs: "",
      ordemProducao: "",
      itens: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <RequisicoesEstoqueForm id={id} data={data} />
      <DevT control={methods.control} />
    </FormProvider>
  );
}

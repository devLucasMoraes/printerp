import { TInsumo, insumoSchema } from "@/schemas";
import { Unidade } from "@/types/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";
import InsumosForm from "./InsumosForm";

const DevT: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
);

export default function InsumosFormProvider({
  data,
  id,
}: {
  data?: TInsumo;
  id?: string;
}) {
  const methods = useForm<TInsumo>({
    mode: "all",
    resolver: zodResolver(insumoSchema),
    defaultValues: {
      descricao: "",
      valorUntMed: 0,
      valorUntMedAuto: false,
      estoqueMinimo: 0,
      undEstoque: Unidade.UNIDADE,
    },
  });

  return (
    <FormProvider {...methods}>
      <InsumosForm id={id} data={data} />
      <DevT control={methods.control} />
    </FormProvider>
  );
}

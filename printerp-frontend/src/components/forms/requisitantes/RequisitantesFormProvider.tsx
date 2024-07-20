import { TRequisitante, requisitanteSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";
import { RequisitanteForm } from "./RequisitanteForm";

const DevT: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
);

export default function RequisitantesFormProvider({
  data,
  id,
}: {
  data?: TRequisitante;
  id?: string;
}) {
  const methods = useForm<TRequisitante>({
    mode: "all",
    resolver: zodResolver(requisitanteSchema),
    defaultValues: {
      nome: "",
      fone: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <RequisitanteForm id={id} data={data} />
      <DevT control={methods.control} />
    </FormProvider>
  );
}

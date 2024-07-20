import { TEquipamento, equipamentoSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";
import EquipamentosForm from "./EquipamentosForm";

const DevT: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
);

export default function EquipamentosFormProvider({
  data,
  id,
}: {
  data?: TEquipamento;
  id?: string;
}) {
  const methods = useForm<TEquipamento>({
    mode: "all",
    resolver: zodResolver(equipamentoSchema),
    defaultValues: {
      nome: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <EquipamentosForm id={id} data={data} />
      <DevT control={methods.control} />
    </FormProvider>
  );
}

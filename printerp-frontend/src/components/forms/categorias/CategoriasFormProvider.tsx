import { TCategoria, categoriaSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";
import CategoriasForm from "./CategoriasForm";

const DevT: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
);

export default function CategoriasFormProvider({
  data,
  id,
}: {
  data?: TCategoria;
  id?: string;
}) {
  const methods = useForm<TCategoria>({
    mode: "all",
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      nome: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <CategoriasForm id={id} data={data} />
      <DevT control={methods.control} />
    </FormProvider>
  );
}

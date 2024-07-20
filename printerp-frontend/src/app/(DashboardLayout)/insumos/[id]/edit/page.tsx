"use client";
import PageContainer from "@/components/container/PageContainer";
import InsumosFormProvider from "@/components/forms/insumos/InsumosFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { CrudTools } from "@/components/shared/CrudTools";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { insumoQueries } from "@/queries/InsumoQueries";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function InsumosEdit({ params }: { params: { id: string } }) {
  console.log("renderizou InsumosEdit");

  const { INSUMOS } = Environment;

  const id = params.id;

  const { mutate: deleteById } = insumoQueries.deleteById();

  const { data: insumo } = useQuery({
    ...insumoQueries.getById(Number(id)),
  });

  const router = useRouter();

  function handleDelete(id: number): void {
    if (confirm("Realmente deseja apagar?")) {
      deleteById(id, {
        onSuccess: (response) => {
          router.push(INSUMOS.LIST_PAGE);
        },
      });
    }
  }

  return (
    <PageContainer title="Editar Insumo" description="pagina edição de insumo">
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Insumos", to: `${INSUMOS.LIST_PAGE}` },
            { label: "Editar" },
          ]}
        />

        <DashboardCard
          title="Editar Insumo"
          action={
            <CrudTools.Root>
              <CrudTools.ShowButton
                showRoute={`${INSUMOS.SHOW_PAGE.replace("id", id)}`}
              />
              <CrudTools.DeleteButton
                handleDelete={() => handleDelete(Number(id))}
              />
            </CrudTools.Root>
          }
        >
          <InsumosFormProvider id={id} data={insumo} />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

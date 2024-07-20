"use client";
import PageContainer from "@/components/container/PageContainer";
import InsumosFormProvider from "@/components/forms/insumos/InsumosFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { insumoQueries } from "@/queries/InsumoQueries";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function InsumosCopy({ params }: { params: { id: string } }) {
  console.log("renderizou InsumosCopy");

  const { INSUMOS } = Environment;

  const id = params.id;

  const { data: insumo } = useQuery({
    ...insumoQueries.getById(Number(id)),
  });

  return (
    <PageContainer title="Novo Insumo" description="pagina cadastro de insumos">
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Insumos", to: `${INSUMOS.LIST_PAGE}` },
            { label: "Novo" },
          ]}
        />

        <DashboardCard title="Novo Insumo">
          <InsumosFormProvider data={insumo} />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

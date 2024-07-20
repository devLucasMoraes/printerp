"use client";
import PageContainer from "@/components/container/PageContainer";
import InsumosFormProvider from "@/components/forms/insumos/InsumosFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { Stack } from "@mui/material";

export default function InsumosCreate() {
  console.log("renderizou InsumosCreate");

  const { INSUMOS } = Environment;

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
          <InsumosFormProvider />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

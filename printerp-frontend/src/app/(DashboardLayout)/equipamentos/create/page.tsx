"use client";
import PageContainer from "@/components/container/PageContainer";
import EquipamentosFormProvider from "@/components/forms/equipamentos/EquipamentosFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { Stack } from "@mui/material";

export default function EquipamentosCreate() {
  console.log("renderizou EquipamentosCreate");

  const { EQUIPAMENTOS } = Environment;

  return (
    <PageContainer
      title="Novo Equipamento"
      description="pagina cadastro de equipamentos"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Equipamentos", to: `${EQUIPAMENTOS.LIST_PAGE}` },
            { label: "Novo" },
          ]}
        />

        <DashboardCard title="Novo Equipamento">
          <EquipamentosFormProvider />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

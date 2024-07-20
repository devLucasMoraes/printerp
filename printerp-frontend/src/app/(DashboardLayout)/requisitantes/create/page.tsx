"use client";
import PageContainer from "@/components/container/PageContainer";
import RequisitantesFormProvider from "@/components/forms/requisitantes/RequisitantesFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { Stack } from "@mui/material";

export default function RequisitantesCreate() {
  console.log("renderizou RequisitantesCreate");

  const { REQUISITANTES } = Environment;

  return (
    <PageContainer
      title="Novo Requisitante"
      description="pagina cadastro de requisitante"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Requisitantes", to: `${REQUISITANTES.LIST_PAGE}` },
            { label: "Novo" },
          ]}
        />

        <DashboardCard title="Novo Requisitante">
          <RequisitantesFormProvider />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

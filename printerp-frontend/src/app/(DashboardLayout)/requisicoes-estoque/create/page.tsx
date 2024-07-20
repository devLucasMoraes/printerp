"use client";
import PageContainer from "@/components/container/PageContainer";
import RequisicoesEstoqueFormProvider from "@/components/forms/requisicoesEstoque/RequisicoesEstoqueFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { Stack } from "@mui/material";

export default function RequisicoesEstoqueCreate() {
  console.log("renderizou RequisicoesEstoqueCreate");

  const { REQUISICOES_ESTOQUE } = Environment;

  return (
    <PageContainer
      title="Nova Requisição"
      description="pagina cadastro requisições de estoque"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Requisições", to: `${REQUISICOES_ESTOQUE.LIST_PAGE}` },
            { label: "Nova" },
          ]}
        />

        <DashboardCard title="Nova Requisição">
          <RequisicoesEstoqueFormProvider />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

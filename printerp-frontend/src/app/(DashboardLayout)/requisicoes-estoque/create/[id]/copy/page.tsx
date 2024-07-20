"use client";
import PageContainer from "@/components/container/PageContainer";
import RequisicoesEstoqueFormProvider from "@/components/forms/requisicoesEstoque/RequisicoesEstoqueFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { requisicaoEstoqueQueries } from "@/queries/RequisicaoEstoqueQueries";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function RequisicoesEstoqueCopy({
  params,
}: {
  params: { id: string };
}) {
  console.log("renderizou RequisicoesEstoqueCopy");

  const { REQUISICOES_ESTOQUE } = Environment;

  const id = params.id;

  const { data: requisicao } = useQuery({
    ...requisicaoEstoqueQueries.getById(Number(id)),
  });

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
          <RequisicoesEstoqueFormProvider data={requisicao} />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

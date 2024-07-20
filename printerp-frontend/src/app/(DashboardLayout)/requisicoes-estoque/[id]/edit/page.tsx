"use client";
import PageContainer from "@/components/container/PageContainer";
import RequisicoesEstoqueFormProvider from "@/components/forms/requisicoesEstoque/RequisicoesEstoqueFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { CrudTools } from "@/components/shared/CrudTools";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { requisicaoEstoqueQueries } from "@/queries/RequisicaoEstoqueQueries";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function RequisicoesEstoqueEdit({
  params,
}: {
  params: { id: string };
}) {
  console.log("renderizou RequisicoesEstoqueEdit");

  const { REQUISICOES_ESTOQUE } = Environment;

  const id = params.id;

  const { mutate: deleteById } = requisicaoEstoqueQueries.deleteById();

  const { data: requisicao } = useQuery({
    ...requisicaoEstoqueQueries.getById(Number(id)),
  });

  const router = useRouter();

  function handleDelete(id: number): void {
    if (confirm("Realmente deseja apagar?")) {
      deleteById(id, {
        onSuccess: (response) => {
          router.push(REQUISICOES_ESTOQUE.LIST_PAGE);
        },
      });
    }
  }

  return (
    <PageContainer
      title="Editar Requisição"
      description="pagina edição requisições de estoque"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Requisições", to: `${REQUISICOES_ESTOQUE.LIST_PAGE}` },
            { label: "Editar" },
          ]}
        />

        <DashboardCard
          title="Editar Requisição"
          action={
            <CrudTools.Root>
              <CrudTools.ShowButton
                showRoute={`${REQUISICOES_ESTOQUE.SHOW_PAGE.replace("id", id)}`}
              />
              <CrudTools.DeleteButton
                handleDelete={() => handleDelete(Number(id))}
              />
            </CrudTools.Root>
          }
        >
          <RequisicoesEstoqueFormProvider id={id} data={requisicao} />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

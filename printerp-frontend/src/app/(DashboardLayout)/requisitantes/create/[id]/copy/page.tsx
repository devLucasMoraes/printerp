"use client";
import PageContainer from "@/components/container/PageContainer";
import RequisitantesFormProvider from "@/components/forms/requisitantes/RequisitantesFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { requisitanteQueries } from "@/queries/RequisitanteQueries";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function RequisitanteCopy({
  params,
}: {
  params: { id: string };
}) {
  console.log("renderizou RequisitanteCopy");

  const { REQUISITANTES } = Environment;

  const id = params.id;

  const { data: requisitante } = useQuery({
    ...requisitanteQueries.getById(Number(id)),
  });

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
          <RequisitantesFormProvider data={requisitante} />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

"use client";
import PageContainer from "@/components/container/PageContainer";
import EquipamentosFormProvider from "@/components/forms/equipamentos/EquipamentosFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { equipamentoQueries } from "@/queries/EquipamentoQueries";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function EquipamentosCopy({
  params,
}: {
  params: { id: string };
}) {
  console.log("renderizou EquipamentosCopy");

  const { EQUIPAMENTOS } = Environment;

  const id = params.id;

  const { data: equipamento } = useQuery({
    ...equipamentoQueries.getById(Number(id)),
  });

  return (
    <PageContainer
      title="Novo Equipamento"
      description="pagina cadastro de equipamentos"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Equipamentos", to: `${EQUIPAMENTOS.LIST_PAGE}` },
            { label: "v" },
          ]}
        />

        <DashboardCard title="Novo Equipamento">
          <EquipamentosFormProvider data={equipamento} />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

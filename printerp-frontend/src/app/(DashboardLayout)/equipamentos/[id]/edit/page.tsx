"use client";
import PageContainer from "@/components/container/PageContainer";
import EquipamentosFormProvider from "@/components/forms/equipamentos/EquipamentosFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { CrudTools } from "@/components/shared/CrudTools";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { equipamentoQueries } from "@/queries/EquipamentoQueries";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function EquipamentosEdit({
  params,
}: {
  params: { id: string };
}) {
  console.log("renderizou EquipamentosEdit");

  const { EQUIPAMENTOS } = Environment;

  const id = params.id;

  const { mutate: deleteById } = equipamentoQueries.deleteById();

  const { data: equipamento } = useQuery({
    ...equipamentoQueries.getById(Number(id)),
  });

  const router = useRouter();

  function handleDelete(id: number): void {
    if (confirm("Realmente deseja apagar?")) {
      deleteById(id, {
        onSuccess: (response) => {
          router.push(EQUIPAMENTOS.LIST_PAGE);
        },
      });
    }
  }
  return (
    <PageContainer
      title="Editar Equipamento"
      description="pagina edição de equipamento"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Equipamentos", to: `${EQUIPAMENTOS.LIST_PAGE}` },
            { label: "Editar" },
          ]}
        />

        <DashboardCard
          title="Editar Equipamento"
          action={
            <CrudTools.Root>
              <CrudTools.ShowButton
                showRoute={`${EQUIPAMENTOS.SHOW_PAGE.replace("id", id)}`}
              />
              <CrudTools.DeleteButton
                handleDelete={() => handleDelete(Number(id))}
              />
            </CrudTools.Root>
          }
        >
          <EquipamentosFormProvider id={id} data={equipamento} />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

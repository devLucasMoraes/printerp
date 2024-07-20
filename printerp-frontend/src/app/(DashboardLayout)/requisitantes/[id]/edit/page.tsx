"use client";
import PageContainer from "@/components/container/PageContainer";
import RequisitantesFormProvider from "@/components/forms/requisitantes/RequisitantesFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { CrudTools } from "@/components/shared/CrudTools";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { requisitanteQueries } from "@/queries/RequisitanteQueries";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function RequisitanteEdit({
  params,
}: {
  params: { id: string };
}) {
  console.log("renderizou RequisitanteEdit");

  const { REQUISITANTES } = Environment;

  const id = params.id;

  const { mutate: deleteById } = requisitanteQueries.deleteById();

  const { data: requisitante } = useQuery({
    ...requisitanteQueries.getById(Number(id)),
  });

  const router = useRouter();

  function handleDelete(id: number): void {
    if (confirm("Realmente deseja apagar?")) {
      deleteById(id, {
        onSuccess: (response) => {
          router.push(REQUISITANTES.LIST_PAGE);
        },
      });
    }
  }

  return (
    <PageContainer
      title="Editar Requisitante"
      description="pagina edição de requisitante"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Requisitantes", to: `${REQUISITANTES.LIST_PAGE}` },
            { label: "Editar" },
          ]}
        />

        <DashboardCard
          title="Editar Requisitante"
          action={
            <CrudTools.Root>
              <CrudTools.ShowButton
                showRoute={`${REQUISITANTES.SHOW_PAGE.replace("id", id)}`}
              />
              <CrudTools.DeleteButton
                handleDelete={() => handleDelete(Number(id))}
              />
            </CrudTools.Root>
          }
        >
          <RequisitantesFormProvider id={id} data={requisitante} />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

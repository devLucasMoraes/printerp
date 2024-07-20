"use client";
import PageContainer from "@/components/container/PageContainer";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { CrudTools } from "@/components/shared/CrudTools";
import DashboardCard from "@/components/shared/DashboardCard";
import { EntityInfo } from "@/components/shared/EntityInfo";
import { Environment } from "@/environment";
import { equipamentoQueries } from "@/queries/EquipamentoQueries";
import { TEquipamento } from "@/schemas";
import formatarData from "@/utils/formatarData";
import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function EquipamentosShow({
  params,
}: {
  params: { id: string };
}) {
  console.log("renderizou EquipamentosShow");

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
      title="Exibir Equipamento"
      description="pagina edição de equipamento"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Equipamentos", to: `${EQUIPAMENTOS.LIST_PAGE}` },
            { label: "Exibir" },
          ]}
        />

        <DashboardCard
          title="Exibir Equipamento"
          action={
            <CrudTools.Root>
              <CrudTools.EditButton
                editRoute={`${EQUIPAMENTOS.EDIT_PAGE.replace("id", id)}`}
              />
              <CrudTools.DeleteButton
                handleDelete={() => handleDelete(Number(id))}
              />
            </CrudTools.Root>
          }
        >
          <EntityInfo<TEquipamento>
            data={equipamento}
            fields={equipamentoFields}
          />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

const equipamentoFields: {
  label: string;
  render: (data: TEquipamento) => React.ReactNode;
}[] = [
  { label: "Id", render: (data) => <Typography noWrap>{data.id}</Typography> },
  {
    label: "Nome",
    render: (data) => <Typography noWrap>{data.nome}</Typography>,
  },
  {
    label: "Criado em",
    render: (data) => (
      <Typography noWrap>{formatarData(data.createdAt)}</Typography>
    ),
  },
  {
    label: "Modificado em",
    render: (data) => (
      <Typography noWrap>{formatarData(data.updatedAt)}</Typography>
    ),
  },
];

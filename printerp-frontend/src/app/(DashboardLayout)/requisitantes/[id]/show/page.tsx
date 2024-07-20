"use client";
import PageContainer from "@/components/container/PageContainer";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { CrudTools } from "@/components/shared/CrudTools";
import DashboardCard from "@/components/shared/DashboardCard";
import { EntityInfo } from "@/components/shared/EntityInfo";
import { Environment } from "@/environment";
import { requisitanteQueries } from "@/queries/RequisitanteQueries";
import { TRequisitante } from "@/schemas";
import formatarData from "@/utils/formatarData";
import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function RequisitanteShow({
  params,
}: {
  params: { id: string };
}) {
  console.log("renderizou RequisitanteShow");

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
      title="Exibir Requisitante"
      description="pagina edição de requisitante"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Requisitante", to: `${REQUISITANTES.LIST_PAGE}` },
            { label: "Exibir" },
          ]}
        />

        <DashboardCard
          title="Exibir Requisitante"
          action={
            <CrudTools.Root>
              <CrudTools.EditButton
                editRoute={`${REQUISITANTES.EDIT_PAGE.replace("id", id)}`}
              />
              <CrudTools.DeleteButton
                handleDelete={() => handleDelete(Number(id))}
              />
            </CrudTools.Root>
          }
        >
          <EntityInfo<TRequisitante>
            data={requisitante}
            fields={requisitanteFields}
          />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

const requisitanteFields: {
  label: string;
  render: (data: TRequisitante) => React.ReactNode;
}[] = [
  { label: "Id", render: (data) => <Typography noWrap>{data.id}</Typography> },
  {
    label: "Nome",
    render: (data) => <Typography noWrap>{data.nome}</Typography>,
  },
  {
    label: "Telefone",
    render: (data) => <Typography noWrap>{data.fone}</Typography>,
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

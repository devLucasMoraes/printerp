"use client";
import PageContainer from "@/components/container/PageContainer";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { CrudTools } from "@/components/shared/CrudTools";
import DashboardCard from "@/components/shared/DashboardCard";
import { EntityInfo } from "@/components/shared/EntityInfo";
import { UnderlineLink } from "@/components/shared/UnderlineLink";
import { Environment } from "@/environment";
import { categoriaQueries } from "@/queries/CategoriaQueries";
import { insumoQueries } from "@/queries/InsumoQueries";
import { TInsumo } from "@/schemas";
import formatarData from "@/utils/formatarData";
import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const { INSUMOS, CATEGORIAS, FORNECEDORAS } = Environment;

export default function InsumosShow({ params }: { params: { id: string } }) {
  console.log("renderizou InsumosShow");

  const id = params.id;

  const { mutate: deleteById } = insumoQueries.deleteById();

  const { data: insumos } = useQuery({
    ...insumoQueries.getById(Number(id)),
  });

  const router = useRouter();

  function handleDelete(id: number): void {
    if (confirm("Realmente deseja apagar?")) {
      deleteById(id, {
        onSuccess: (response) => {
          router.push(INSUMOS.LIST_PAGE);
        },
      });
    }
  }

  return (
    <PageContainer
      title="Exibir Insumo"
      description="pagina exibição de insumos"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Insumos", to: `${INSUMOS.LIST_PAGE}` },
            { label: "Exibir" },
          ]}
        />

        <DashboardCard
          title="Exibir Insumo"
          action={
            <CrudTools.Root>
              <CrudTools.EditButton
                editRoute={`${INSUMOS.EDIT_PAGE.replace("id", id)}`}
              />
              <CrudTools.DeleteButton
                handleDelete={() => handleDelete(Number(id))}
              />
            </CrudTools.Root>
          }
        >
          <EntityInfo<TInsumo> data={insumos} fields={insumosFields} />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

const insumosFields: {
  label: string;
  render: (data: TInsumo) => React.ReactNode;
}[] = [
  { label: "Id", render: (data) => <Typography noWrap>{data.id}</Typography> },
  {
    label: "Nome",
    render: (data) => <Typography noWrap>{data.descricao}</Typography>,
  },
  {
    label: "Unidade de estoque",
    render: (data) => <Typography noWrap>{data.undEstoque}</Typography>,
  },
  {
    label: "Estoque mínimo",
    render: (data) => <Typography noWrap>{data.estoqueMinimo}</Typography>,
  },
  {
    label: "Valor unitário médio",
    render: (data) => <Typography noWrap>{data.valorUntMed}</Typography>,
  },
  {
    label: "Categoria",
    render: (data) => (
      <UnderlineLink
        id={data.idCategoria}
        queries={categoriaQueries}
        nameProperty="nome"
        linkPath={`${CATEGORIAS.SHOW_PAGE.replace(
          "id",
          String(data.idCategoria)
        )}`}
      />
    ),
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

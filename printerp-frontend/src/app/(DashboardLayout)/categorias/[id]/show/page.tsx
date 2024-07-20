"use client";
import PageContainer from "@/components/container/PageContainer";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { CrudTools } from "@/components/shared/CrudTools";
import DashboardCard from "@/components/shared/DashboardCard";
import { EntityInfo } from "@/components/shared/EntityInfo";
import { Environment } from "@/environment";
import { categoriaQueries } from "@/queries/CategoriaQueries";
import { TCategoria } from "@/schemas";
import formatarData from "@/utils/formatarData";
import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function CategoriasShow({ params }: { params: { id: string } }) {
  console.log("renderizou CategoriasShow");

  const { CATEGORIAS } = Environment;

  const id = params.id;

  const { mutate: deleteById } = categoriaQueries.deleteById();

  const { data: categoria } = useQuery({
    ...categoriaQueries.getById(Number(id)),
  });

  const router = useRouter();

  function handleDelete(id: number): void {
    if (confirm("Realmente deseja apagar?")) {
      deleteById(id, {
        onSuccess: (response) => {
          router.push(CATEGORIAS.LIST_PAGE);
        },
      });
    }
  }

  return (
    <PageContainer
      title="Exibir Categoria"
      description="pagina edição de categoria"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Categorias", to: `${CATEGORIAS.LIST_PAGE}` },
            { label: "Exibir" },
          ]}
        />

        <DashboardCard
          title="Exibir Categoria"
          action={
            <CrudTools.Root>
              <CrudTools.EditButton
                editRoute={`${CATEGORIAS.EDIT_PAGE.replace("id", id)}`}
              />
              <CrudTools.DeleteButton
                handleDelete={() => handleDelete(Number(id))}
              />
            </CrudTools.Root>
          }
        >
          <EntityInfo<TCategoria> data={categoria} fields={categoriaFields} />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

const categoriaFields: {
  label: string;
  render: (data: TCategoria) => React.ReactNode;
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

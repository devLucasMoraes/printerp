"use client";
import PageContainer from "@/components/container/PageContainer";
import CategoriasFormProvider from "@/components/forms/categorias/CategoriasFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { categoriaQueries } from "@/queries/CategoriaQueries";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function CategoriasCopy({ params }: { params: { id: string } }) {
  console.log("renderizou CategoriasCopy");

  const { CATEGORIAS } = Environment;

  const id = params.id;

  const { data: categoria } = useQuery({
    ...categoriaQueries.getById(Number(id)),
  });

  return (
    <PageContainer
      title="Nova Categoria"
      description="pagina cadastro de categorias"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Categorias", to: `${CATEGORIAS.LIST_PAGE}` },
            { label: "Nova" },
          ]}
        />

        <DashboardCard title="Nova Categoria">
          <CategoriasFormProvider data={categoria} />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

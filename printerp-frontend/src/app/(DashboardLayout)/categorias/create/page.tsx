"use client";
import PageContainer from "@/components/container/PageContainer";
import CategoriasFormProvider from "@/components/forms/categorias/CategoriasFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { Stack } from "@mui/material";

export default function CategoriasCreate() {
  console.log("renderizou CategoriasCreate");

  const { CATEGORIAS } = Environment;

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
          <CategoriasFormProvider />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

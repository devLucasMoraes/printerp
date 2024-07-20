"use client";
import PageContainer from "@/components/container/PageContainer";
import CategoriasFormProvider from "@/components/forms/categorias/CategoriasFormProvider";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { CrudTools } from "@/components/shared/CrudTools";
import DashboardCard from "@/components/shared/DashboardCard";
import { Environment } from "@/environment";
import { categoriaQueries } from "@/queries/CategoriaQueries";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function CategoriasEdit({ params }: { params: { id: string } }) {
  console.log("renderizou CategoriasEdit");

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
      title="Editar Categoria"
      description="pagina edição de categoria"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Categorias", to: `${CATEGORIAS.LIST_PAGE}` },
            { label: "Editar" },
          ]}
        />

        <DashboardCard
          title="Editar Categoria"
          action={
            <CrudTools.Root>
              <CrudTools.ShowButton
                showRoute={`${CATEGORIAS.SHOW_PAGE.replace("id", id)}`}
              />
              <CrudTools.DeleteButton
                handleDelete={() => handleDelete(Number(id))}
              />
            </CrudTools.Root>
          }
        >
          <CategoriasFormProvider id={id} data={categoria} />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

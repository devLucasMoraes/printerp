"use client";
import PageContainer from "@/components/container/PageContainer";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { CrudTools } from "@/components/shared/CrudTools";
import { DataGridWrapper } from "@/components/shared/DataGridWrapper";
import { Environment } from "@/environment";
import { categoriaQueries } from "@/queries/CategoriaQueries";
import { TCategoria } from "@/schemas";
import { Stack } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoriasList() {
  console.log("renderizou CategoriasList");

  const { CATEGORIAS, LIMITE_DE_LINHAS } = Environment;

  const router = useRouter();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS,
  });

  const { mutate: deleteById } = categoriaQueries.deleteById();

  const { data, isLoading } = useQuery({
    ...categoriaQueries.getAll(paginationModel.page, paginationModel.pageSize),
    placeholderData: keepPreviousData,
  });

  function onInfo(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de exibição
    if (!params.row.id) return;
    router.push(`${CATEGORIAS.SHOW_PAGE.replace("id", String(params.row.id))}`);
  }

  function onCopy(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de exibição
    if (!params.row.id) return;
    router.push(`${CATEGORIAS.COPY_PAGE.replace("id", String(params.row.id))}`);
  }

  function onEdit(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de edição
    if (!params.row.id) return;
    router.push(`${CATEGORIAS.EDIT_PAGE.replace("id", String(params.row.id))}`);
  }

  function onDelete(params: GridRenderCellParams): void {
    // se existe o id, remove o usuário
    if (!params.row.id) return;
    if (confirm("Realmente deseja apagar?")) {
      deleteById(params.row.id);
    }
  }

  const columns: GridColDef<TCategoria>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nome", headerName: "Nome", minWidth: 155, flex: 0.3 },
    {
      field: "actions",
      headerName: "Ações",
      minWidth: 200,
      flex: 0.1,
      sortable: false,
      disableColumnMenu: true,
      display: "flex",
      renderCell: (params) => (
        <CrudTools.CrudToolsStackRoot>
          <CrudTools.CopyButtonActions handleAction={() => onCopy(params)} />
          <CrudTools.ShowButtonActions handleAction={() => onInfo(params)} />
          <CrudTools.EditButtonActions handleAction={() => onEdit(params)} />
          <CrudTools.DeleteButtonActions
            handleAction={() => onDelete(params)}
          />
        </CrudTools.CrudToolsStackRoot>
      ),
    },
  ];

  return (
    <PageContainer
      title="Categorias"
      description="pagina listagem de categorias"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Categorias", to: `${CATEGORIAS.LIST_PAGE}` },
            { label: "Listar" },
          ]}
        />

        <DataGridWrapper
          title="Listar Categorias"
          isLoading={isLoading}
          columns={columns}
          rows={data?.content}
          totalRowCount={data?.totalElements}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          createRoute={CATEGORIAS.CREATE_PAGE}
          titleCreateButton="Nova Categoria"
        />
      </Stack>
    </PageContainer>
  );
}

"use client";
import PageContainer from "@/components/container/PageContainer";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { CrudTools } from "@/components/shared/CrudTools";
import { DataGridWrapper } from "@/components/shared/DataGridWrapper";
import { UnderlineLink } from "@/components/shared/UnderlineLink";
import { Environment } from "@/environment";
import { categoriaQueries } from "@/queries/CategoriaQueries";
import { insumoQueries } from "@/queries/InsumoQueries";
import { TInsumo } from "@/schemas";
import { Stack } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InsumosList() {
  console.log("renderizou InsumosList");

  const { INSUMOS, CATEGORIAS, LIMITE_DE_LINHAS } = Environment;

  const router = useRouter();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS,
  });

  const { mutate: deleteById } = insumoQueries.deleteById();

  const { data, isLoading } = useQuery({
    ...insumoQueries.getAll(paginationModel.page, paginationModel.pageSize),
    placeholderData: keepPreviousData,
  });

  function onInfo(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de exibição
    if (!params.row.id) return;
    router.push(`${INSUMOS.SHOW_PAGE.replace("id", String(params.row.id))}`);
  }

  function onCopy(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de exibição
    if (!params.row.id) return;
    router.push(`${INSUMOS.COPY_PAGE.replace("id", String(params.row.id))}`);
  }

  function onEdit(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de edição
    if (!params.row.id) return;
    router.push(`${INSUMOS.EDIT_PAGE.replace("id", String(params.row.id))}`);
  }

  function onDelete(params: GridRenderCellParams): void {
    // se existe o id, remove o usuário
    if (!params.row.id) return;
    if (confirm("Realmente deseja apagar?")) {
      deleteById(params.row.id);
    }
  }

  const columns: GridColDef<TInsumo>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "descricao", headerName: "Descrição", minWidth: 155, flex: 0.3 },
    {
      field: "valorUntMed",
      headerName: "Valor unitário",
      minWidth: 155,
      flex: 0.1,
    },
    {
      field: "undEstoque",
      headerName: "Unidade de estoque",
      minWidth: 220,
      flex: 0.2,
    },
    {
      field: "idCategoria",
      headerName: "Categoria",
      minWidth: 220,
      flex: 0.2,
      display: "flex",
      renderCell: (params) => (
        <UnderlineLink
          queries={categoriaQueries}
          nameProperty="nome"
          id={params.row.idCategoria}
          linkPath={`${CATEGORIAS.SHOW_PAGE.replace(
            "id",
            String(params.row.idCategoria)
          )}`}
        />
      ),
    },
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
    <PageContainer title="Insumos" description="pagina listagem de insumos">
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Insumos", to: `${INSUMOS.LIST_PAGE}` },
            { label: "Listar" },
          ]}
        />

        <DataGridWrapper
          title="Listar Insumos"
          isLoading={isLoading}
          columns={columns}
          rows={data?.content}
          totalRowCount={data?.totalElements}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          createRoute={INSUMOS.CREATE_PAGE}
          titleCreateButton="Novo Insumo"
        />
      </Stack>
    </PageContainer>
  );
}

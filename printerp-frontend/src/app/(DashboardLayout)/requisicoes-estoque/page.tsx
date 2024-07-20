"use client";
import PageContainer from "@/components/container/PageContainer";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { CrudTools } from "@/components/shared/CrudTools";
import { DataGridWrapper } from "@/components/shared/DataGridWrapper";
import { UnderlineLink } from "@/components/shared/UnderlineLink";
import { Environment } from "@/environment";
import { equipamentoQueries } from "@/queries/EquipamentoQueries";
import { requisicaoEstoqueQueries } from "@/queries/RequisicaoEstoqueQueries";
import { requisitanteQueries } from "@/queries/RequisitanteQueries";
import { TRequisicaoEstoque } from "@/schemas";
import { Stack } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RequisicoesEstoqueList() {
  console.log("renderizou RequisicoesEstoqueList");

  const { REQUISICOES_ESTOQUE, LIMITE_DE_LINHAS, REQUISITANTES, EQUIPAMENTOS } =
    Environment;

  const router = useRouter();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS,
  });

  const { mutate: deleteById } = requisicaoEstoqueQueries.deleteById();

  const { data, isLoading } = useQuery({
    ...requisicaoEstoqueQueries.getAll(
      paginationModel.page,
      paginationModel.pageSize
    ),
    placeholderData: keepPreviousData,
  });

  function onInfo(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de exibição
    if (!params.row.id) return;
    router.push(
      `${REQUISICOES_ESTOQUE.SHOW_PAGE.replace("id", String(params.row.id))}`
    );
  }

  function onCopy(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de exibição
    if (!params.row.id) return;
    router.push(
      `${REQUISICOES_ESTOQUE.COPY_PAGE.replace("id", String(params.row.id))}`
    );
  }

  function onEdit(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de edição
    if (!params.row.id) return;
    router.push(
      `${REQUISICOES_ESTOQUE.EDIT_PAGE.replace("id", String(params.row.id))}`
    );
  }

  function onDelete(params: GridRenderCellParams): void {
    // se existe o id, remove o usuário
    if (!params.row.id) return;
    if (confirm("Realmente deseja apagar?")) {
      deleteById(params.row.id);
    }
  }

  const columns: GridColDef<TRequisicaoEstoque>[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "dataRequisicao",
      headerName: "Requerido em",
      minWidth: 155,
      flex: 0.3,
      type: "date",
      valueGetter: (value) => value && new Date(value),
    },
    {
      field: "valorTotal",
      headerName: "Valor total",
      minWidth: 155,
      flex: 0.1,
    },
    {
      field: "idRequisitante",
      headerName: "Requisitante",
      minWidth: 200,
      flex: 0.3,
      display: "flex",
      renderCell: (params) => (
        <UnderlineLink
          queries={requisitanteQueries}
          id={params.row.idRequisitante}
          linkPath={`${REQUISITANTES.SHOW_PAGE.replace(
            "id",
            String(params.row.idRequisitante)
          )}`}
          nameProperty="nome"
        />
      ),
    },
    {
      field: "idEquipamento",
      headerName: "Equipamento",
      minWidth: 200,
      flex: 0.3,
      display: "flex",
      renderCell: (params) => (
        <UnderlineLink
          queries={equipamentoQueries}
          id={params.row.idEquipamento}
          linkPath={`${EQUIPAMENTOS.SHOW_PAGE.replace(
            "id",
            String(params.row.idEquipamento)
          )}`}
          nameProperty="nome"
        />
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
      minWidth: 200,
      flex: 0.1,
      sortable: false,
      display: "flex",
      disableColumnMenu: true,
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
      title="Requisições de Estoque"
      description="pagina listagem requisições de estoque"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Requisições", to: `${REQUISICOES_ESTOQUE.LIST_PAGE}` },
            { label: "Listar" },
          ]}
        />

        <DataGridWrapper
          title="Listar Requisições"
          isLoading={isLoading}
          columns={columns}
          rows={data?.content}
          totalRowCount={data?.totalElements}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          createRoute={REQUISICOES_ESTOQUE.CREATE_PAGE}
          titleCreateButton="Nova Requisição"
        />
      </Stack>
    </PageContainer>
  );
}

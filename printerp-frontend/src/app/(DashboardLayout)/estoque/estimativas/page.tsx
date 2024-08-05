"use client";
import PageContainer from "@/components/container/PageContainer";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { DataGridWrapper } from "@/components/shared/DataGridWrapper";
import { UnderlineLink } from "@/components/shared/UnderlineLink";
import { Environment } from "@/environment";
import { categoriaQueries } from "@/queries/CategoriaQueries";
import { estoqueQueries } from "@/queries/EstoqueQueries";
import { insumoQueries } from "@/queries/InsumoQueries";
import { TEstimativaEstoque } from "@/schemas";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function EstimativaEstoqueList() {
  console.log("renderizou SaldoEstoqueList");

  const { LIMITE_DE_LINHAS, CATEGORIAS, ESTOQUE, INSUMOS } = Environment;

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS,
  });

  const { data, isLoading } = useQuery({
    ...estoqueQueries.getEstimativaDuracaoTodos(
      paginationModel.page,
      paginationModel.pageSize
    ),
    placeholderData: keepPreviousData,
  });

  const columns: GridColDef<TEstimativaEstoque>[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "idCategoria",
      headerName: "Categoria",
      minWidth: 200,
      flex: 0.3,
      display: "flex",
      renderCell: (params) => (
        <UnderlineLink
          queries={categoriaQueries}
          id={params.row.idCategoria}
          linkPath={`${CATEGORIAS.SHOW_PAGE.replace(
            "id",
            String(params.row.idCategoria)
          )}`}
          nameProperty="nome"
        />
      ),
    },
    {
      field: "idInsumo",
      headerName: "Insumo",
      minWidth: 200,
      flex: 0.3,
      display: "flex",
      renderCell: (params) => (
        <UnderlineLink
          queries={insumoQueries}
          id={params.row.idInsumo}
          linkPath={`${INSUMOS.SHOW_PAGE.replace(
            "id",
            String(params.row.idCategoria)
          )}`}
          nameProperty="descricao"
        />
      ),
    },
    {
      field: "mediaConsumo",
      headerName: "Média Consumo",
      minWidth: 155,
      flex: 0.1,
    },
    {
      field: "dias",
      headerName: "Dias",
      minWidth: 155,
      flex: 0.1,
    },
    {
      field: "dataFim",
      headerName: "Data Fim",
      minWidth: 155,
      flex: 0.1,
    },
  ];

  return (
    <PageContainer
      title="Estimativas do Estoque"
      description="pagina listagem estimativas do estoque"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Estimativas", to: `${ESTOQUE.SALDO}` },
            { label: "Listar" },
          ]}
        />

        <DataGridWrapper
          title="Estimativa"
          isLoading={isLoading}
          columns={columns}
          rows={data?.content}
          totalRowCount={data?.totalElements}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      </Stack>
    </PageContainer>
  );
}

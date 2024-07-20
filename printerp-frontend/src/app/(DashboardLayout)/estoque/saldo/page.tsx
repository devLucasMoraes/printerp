"use client";
import PageContainer from "@/components/container/PageContainer";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { DataGridWrapper } from "@/components/shared/DataGridWrapper";
import { UnderlineLink } from "@/components/shared/UnderlineLink";
import { Environment } from "@/environment";
import { categoriaQueries } from "@/queries/CategoriaQueries";
import { estoqueQueries } from "@/queries/EstoqueQueries";
import { TSaldoEstoque } from "@/schemas";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function SaldoEstoqueList() {
  console.log("renderizou SaldoEstoqueList");

  const { LIMITE_DE_LINHAS, CATEGORIAS, ESTOQUE } = Environment;

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS,
  });

  const { data, isLoading } = useQuery({
    ...estoqueQueries.getAll(paginationModel.page, paginationModel.pageSize),
    placeholderData: keepPreviousData,
  });

  const columns: GridColDef<TSaldoEstoque>[] = [
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
      field: "descricao",
      headerName: "Descriçao",
      minWidth: 155,
      flex: 0.1,
    },
    {
      field: "totalEntradas",
      headerName: "Total entradas",
      minWidth: 155,
      flex: 0.1,
    },
    {
      field: "totalSaidas",
      headerName: "Total saídas",
      minWidth: 155,
      flex: 0.1,
    },
    {
      field: "undEstoque",
      headerName: "Unid.",
      minWidth: 155,
      flex: 0.1,
    },
    {
      field: "saldo",
      headerName: "Saldo",
      minWidth: 155,
      flex: 0.1,
    },
    {
      field: "valorTotal",
      headerName: "Valor total",
      minWidth: 155,
      flex: 0.1,
    },
    {
      field: "abaixoDoMinimo",
      headerName: "Abaixo min.",
      minWidth: 155,
      flex: 0.1,
    },
  ];

  return (
    <PageContainer
      title="Saldo do Estoque"
      description="pagina listagem saldo do estoque"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Saldo", to: `${ESTOQUE.SALDO}` },
            { label: "Listar" },
          ]}
        />

        <DataGridWrapper
          title="Saldo"
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

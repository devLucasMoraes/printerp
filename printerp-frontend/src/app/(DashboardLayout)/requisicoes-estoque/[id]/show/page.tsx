"use client";
import PageContainer from "@/components/container/PageContainer";
import { BreadcrumbsWrapper } from "@/components/shared/BreadcrumbsWrapper";
import { CrudTools } from "@/components/shared/CrudTools";
import DashboardCard from "@/components/shared/DashboardCard";
import { EntityInfo } from "@/components/shared/EntityInfo";
import { UnderlineLink } from "@/components/shared/UnderlineLink";
import { Environment } from "@/environment";
import { equipamentoQueries } from "@/queries/EquipamentoQueries";
import { insumoQueries } from "@/queries/InsumoQueries";
import { requisicaoEstoqueQueries } from "@/queries/RequisicaoEstoqueQueries";
import { requisitanteQueries } from "@/queries/RequisitanteQueries";
import { TRequisicaoEstoque } from "@/schemas";
import formatarData from "@/utils/formatarData";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const { REQUISICOES_ESTOQUE, REQUISITANTES, EQUIPAMENTOS, INSUMOS } =
  Environment;

export default function RequisicoesEstoqueShow({
  params,
}: {
  params: { id: string };
}) {
  console.log("renderizou RequisicoesEstoqueShow");

  const id = params.id;

  const { mutate: deleteById } = requisicaoEstoqueQueries.deleteById();

  const { data: requisicoes } = useQuery({
    ...requisicaoEstoqueQueries.getById(Number(id)),
  });

  const router = useRouter();

  function handleDelete(id: number): void {
    if (confirm("Realmente deseja apagar?")) {
      deleteById(id, {
        onSuccess: (response) => {
          router.push(REQUISICOES_ESTOQUE.LIST_PAGE);
        },
      });
    }
  }

  return (
    <PageContainer
      title="Exibir Requisição"
      description="pagina exibição requisições de estoque"
    >
      <Stack spacing={2}>
        <BreadcrumbsWrapper
          path={[
            { label: "Requisições", to: `${REQUISICOES_ESTOQUE.LIST_PAGE}` },
            { label: "Exibir" },
          ]}
        />

        <DashboardCard
          title="Exibir Requisição"
          action={
            <CrudTools.Root>
              <CrudTools.EditButton
                editRoute={`${REQUISICOES_ESTOQUE.EDIT_PAGE.replace("id", id)}`}
              />
              <CrudTools.DeleteButton
                handleDelete={() => handleDelete(Number(id))}
              />
            </CrudTools.Root>
          }
        >
          <EntityInfo<TRequisicaoEstoque>
            data={requisicoes}
            fields={requisicaoEstoqueFields}
          />
        </DashboardCard>
      </Stack>
    </PageContainer>
  );
}

const requisicaoEstoqueFields: {
  label: string;
  render: (data: TRequisicaoEstoque) => React.ReactNode;
}[] = [
  { label: "Id", render: (data) => <Typography noWrap>{data.id}</Typography> },
  {
    label: "Ordem de Produção",
    render: (data) => <Typography noWrap>{data.ordemProducao}</Typography>,
  },
  {
    label: "Requerido em",
    render: (data) => (
      <Typography noWrap>{formatarData(data.dataRequisicao)}</Typography>
    ),
  },
  {
    label: "Total",
    render: (data) => <Typography noWrap>{data.valorTotal}</Typography>,
  },
  {
    label: "Requisitante",
    render: (data) => (
      <UnderlineLink
        queries={requisitanteQueries}
        id={data.idRequisitante}
        nameProperty="nome"
        linkPath={`${REQUISITANTES.SHOW_PAGE.replace(
          "id",
          String(data.idRequisitante)
        )}`}
      />
    ),
  },
  {
    label: "Local de Aplicação",
    render: (data) => (
      <UnderlineLink
        queries={equipamentoQueries}
        id={data.idEquipamento}
        nameProperty="nome"
        linkPath={`${EQUIPAMENTOS.SHOW_PAGE.replace(
          "id",
          String(data.idEquipamento)
        )}`}
      />
    ),
  },
  {
    label: "Observações",
    render: (data) => <Typography noWrap>{data.obs}</Typography>,
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
  {
    label: "Itens",
    render: (data) => (
      <Grid
        container
        padding={2}
        marginTop={1}
        component={Paper}
        variant="outlined"
      >
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="caption" noWrap>
              Material
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption" noWrap>
              Quantidade Entregue
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="caption" noWrap>
              Undidade de Consumo
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption" noWrap>
              Valor Unitario
            </Typography>
          </Grid>
        </Grid>

        {data.itens?.map((item, index) => (
          <Grid container key={`${item.idInsumo}-${index}`}>
            <Grid item xs={3}>
              <UnderlineLink
                queries={insumoQueries}
                id={item.idInsumo}
                nameProperty="descricao"
                linkPath={`${INSUMOS.SHOW_PAGE.replace(
                  "id",
                  String(item.idInsumo)
                )}`}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography noWrap>{item.quantEntregue}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography noWrap>{item.undConsumo}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography noWrap>{item.valorUntEntregue}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    ),
  },
];

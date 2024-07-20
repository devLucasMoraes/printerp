import { RHFAutocomplete } from "@/components/RHFwithMUI/RHFAutocomplete";
import { RHFDatePicker } from "@/components/RHFwithMUI/RHFDatePicker";
import { RHFTextField } from "@/components/RHFwithMUI/RHFTextField";
import { CrudTools } from "@/components/shared/CrudTools";
import { AddButton } from "@/components/shared/CrudTools/AddButton";
import ItensTableWrapper from "@/components/shared/ItensTableWrapper";
import { Environment } from "@/environment";
import { equipamentoQueries } from "@/queries/EquipamentoQueries";
import { requisicaoEstoqueQueries } from "@/queries/RequisicaoEstoqueQueries";
import { requisitanteQueries } from "@/queries/RequisitanteQueries";
import { TEquipamento, TRequisicaoEstoque, TRequisitante } from "@/schemas";
import { useIsOpenDialog } from "@/store/dialogStore";
import { Box, Chip, Divider, Grid, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function RequisicoesEstoqueForm({
  data,
  id,
}: {
  data?: TRequisicaoEstoque;
  id?: string;
}) {
  const {
    watch,
    control,
    unregister,
    reset,
    setValue,
    handleSubmit,
    formState,
  } = useFormContext<TRequisicaoEstoque>();

  const { REQUISICOES_ESTOQUE } = Environment;

  const {
    isOpen,
    toggleRequisitanteDialog,
    toggleMaterialDialog,
    toggleLocalDeAplicacaoDialog,
  } = useIsOpenDialog();

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });

    return () => sub.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (data) {
      reset({
        dataRequisicao: new Date(data.dataRequisicao),
        obs: data.obs,
        ordemProducao: data.ordemProducao,
        idEquipamento: data.idEquipamento,
        idRequisitante: data.idRequisitante,
        itens: [...data.itens],
      });
    }
  }, [data, reset]);

  const router = useRouter();

  const { mutate: create } = requisicaoEstoqueQueries.create();

  const { mutate: update } = requisicaoEstoqueQueries.updateById(Number(id));

  const onSubmit = (data: TRequisicaoEstoque) => {
    if (!id) {
      create(data, {
        onSuccess: (response) => {
          !isOpen.materialDialog &&
            router.push(
              `${REQUISICOES_ESTOQUE.SHOW_PAGE.replace(
                "id",
                String(response.id)
              )}`
            );
          toggleMaterialDialog(false);
        },
      });
    } else {
      update(
        { ...data, id: Number(id) },
        {
          onSuccess: (response) => {
            router.push(
              `${REQUISICOES_ESTOQUE.SHOW_PAGE.replace(
                "id",
                String(response.id)
              )}`
            );
          },
        }
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowGap={2} columnSpacing={1} marginBottom={2}>
        <Grid item xs={12} lg={3}>
          <RHFDatePicker<TRequisicaoEstoque>
            label="Requerido em"
            name="dataRequisicao"
          />
        </Grid>

        <Grid item xs={12} lg={9}>
          <RHFTextField<TRequisicaoEstoque>
            label="Ordem de produção"
            name="ordemProducao"
          />
        </Grid>

        <Grid item xs={12} lg={6} textAlign="end">
          <AddButton
            title="Novo Requisitante"
            handleAdd={() => toggleRequisitanteDialog(true)}
          />

          <RHFAutocomplete<TRequisicaoEstoque, TRequisitante>
            label="Requisitante"
            name="idRequisitante"
            queries={requisitanteQueries}
          />
        </Grid>

        <Grid item xs={12} lg={6} textAlign="end">
          <AddButton
            title="Novo Equipamento"
            handleAdd={() => toggleLocalDeAplicacaoDialog(true)}
          />

          <RHFAutocomplete<TRequisicaoEstoque, TEquipamento>
            label="Equipamento"
            name="idEquipamento"
            queries={equipamentoQueries}
          />
        </Grid>

        <Grid item xs={12}>
          <RHFTextField<TRequisicaoEstoque>
            fullWidth
            label="Observações"
            name="obs"
          />
        </Grid>

        <Grid item flexGrow={1}>
          <Divider textAlign="left">
            <Chip label="Itens" />
          </Divider>
        </Grid>

        <Grid item xs={12}>
          <ItensTableWrapper />
        </Grid>
      </Grid>

      <Stack spacing={2} direction="row" justifyContent="end">
        <CrudTools.Root>
          <CrudTools.SaveSubmitButton />
          <CrudTools.CancelButton />
        </CrudTools.Root>
      </Stack>
    </Box>
  );
}

import { RHFAutocomplete } from "@/components/RHFwithMUI/RHFAutocomplete";
import { RHFCheckbox } from "@/components/RHFwithMUI/RHFCheckbox";
import { RHFTextField } from "@/components/RHFwithMUI/RHFTextField";
import { CrudTools } from "@/components/shared/CrudTools";
import { AddButton } from "@/components/shared/CrudTools/AddButton";
import { unidades } from "@/constants";
import { Environment } from "@/environment";
import { categoriaQueries } from "@/queries/CategoriaQueries";
import { insumoQueries } from "@/queries/InsumoQueries";
import { TCategoria, TInsumo } from "@/schemas";
import { useIsOpenDialog } from "@/store/dialogStore";
import { Box, Grid, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function InsumosForm({
  data,
  id,
}: {
  data?: TInsumo;
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
  } = useFormContext<TInsumo>();

  const { INSUMOS } = Environment;

  const {
    isOpen,
    toggleCategoriaDialog,
    toggleMaterialDialog,
    toggleFornecedoraDialog,
  } = useIsOpenDialog();

  useEffect(() => {
    if (data) {
      reset({
        descricao: data.descricao,
        valorUntMed: data.valorUntMed,
        valorUntMedAuto: data.valorUntMedAuto,
        undEstoque: data.undEstoque,
        estoqueMinimo: data.estoqueMinimo,
        idCategoria: data.idCategoria,
      });
    }
  }, [data, reset]);

  const router = useRouter();

  const { mutate: create } = insumoQueries.create();

  const { mutate: update } = insumoQueries.updateById(Number(id));

  const onSubmit = (data: TInsumo) => {
    if (!id) {
      create(data, {
        onSuccess: (response) => {
          !isOpen.materialDialog &&
            router.push(
              `${INSUMOS.SHOW_PAGE.replace("id", String(response.id))}`
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
              `${INSUMOS.SHOW_PAGE.replace("id", String(response.id))}`
            );
          },
        }
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowGap={2} columnSpacing={1} marginBottom={2}>
        <Grid item xs={12} sm={isOpen.materialDialog ? 12 : 12}>
          <RHFTextField<TInsumo> name="descricao" fullWidth label="Descrição" />
        </Grid>

        <Grid item xs={12} sm={isOpen.materialDialog ? 12 : 6}>
          <RHFTextField<TInsumo>
            name="undEstoque"
            fullWidth
            label="Unidade de estoque"
            select
            options={unidades}
          />
        </Grid>

        <Grid item xs={12} sm={isOpen.materialDialog ? 12 : 6}>
          <RHFTextField<TInsumo>
            name="estoqueMinimo"
            fullWidth
            label="Estoque mínimo"
            type="number"
          />
        </Grid>

        <Grid item xs={12} sm={isOpen.materialDialog ? 12 : 6}>
          <RHFTextField<TInsumo>
            name="valorUntMed"
            fullWidth
            label="Valor unitário médio"
            type="number"
          />
        </Grid>

        <Grid item xs={12} sm={isOpen.materialDialog ? 12 : 6}>
          <RHFCheckbox<TInsumo>
            name="valorUntMedAuto"
            label="Valor unitário auto"
          />
        </Grid>

        <Grid item xs={12} sm={isOpen.materialDialog ? 12 : 12} textAlign="end">
          <AddButton
            title="Nova Categoria"
            handleAdd={() => toggleCategoriaDialog(true)}
          />

          <RHFAutocomplete<TInsumo, TCategoria>
            name="idCategoria"
            queries={categoriaQueries}
            label="Categoria"
          />
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

import { RHFTextField } from "@/components/RHFwithMUI/RHFTextField";
import { CrudTools } from "@/components/shared/CrudTools";
import { Environment } from "@/environment";
import { categoriaQueries } from "@/queries/CategoriaQueries";
import { TCategoria } from "@/schemas";
import { useIsOpenDialog } from "@/store/dialogStore";
import { Box, Grid, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function CategoriasForm({
  data,
  id,
}: {
  data?: TCategoria;
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
  } = useFormContext<TCategoria>();

  const { CATEGORIAS } = Environment;

  const { isOpen, toggleCategoriaDialog } = useIsOpenDialog();

  useEffect(() => {
    if (data) {
      reset({
        nome: data.nome,
      });
    }
  }, [data, reset]);

  const router = useRouter();

  const { mutate: create } = categoriaQueries.create();

  const { mutate: update } = categoriaQueries.updateById(Number(id));

  const onSubmit = (data: TCategoria) => {
    if (!id) {
      create(data, {
        onSuccess: (response) => {
          !isOpen.categoriaDialog &&
            router.push(
              `${CATEGORIAS.SHOW_PAGE.replace("id", String(response.id))}`
            );
          toggleCategoriaDialog(false);
        },
      });
    } else {
      update(
        { ...data, id: Number(id) },
        {
          onSuccess: (response) => {
            router.push(
              `${CATEGORIAS.SHOW_PAGE.replace("id", String(response.id))}`
            );
          },
        }
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowGap={2} columnSpacing={1} marginBottom={2}>
        <Grid item xs={12}>
          <RHFTextField name="nome" fullWidth label="Nome" />
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

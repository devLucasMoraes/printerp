import { RHFTextField } from "@/components/RHFwithMUI/RHFTextField";
import { CrudTools } from "@/components/shared/CrudTools";
import { Environment } from "@/environment";
import { requisitanteQueries } from "@/queries/RequisitanteQueries";
import { TRequisitante } from "@/schemas";
import { useIsOpenDialog } from "@/store/dialogStore";
import { Box, Grid, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const RequisitanteForm = ({
  data,
  id,
}: {
  data?: TRequisitante;
  id?: string;
}) => {
  const { watch, control, unregister, reset, setValue, handleSubmit } =
    useFormContext<TRequisitante>();

  const { REQUISITANTES } = Environment;

  const { isOpen, toggleRequisitanteDialog } = useIsOpenDialog();

  useEffect(() => {
    if (data) {
      reset({
        nome: data.nome,
        fone: data.fone,
      });
    }
  }, [data, reset]);

  const router = useRouter();

  const { mutate: create } = requisitanteQueries.create();

  const { mutate: update } = requisitanteQueries.updateById(Number(id));

  const onSubmit = (data: TRequisitante) => {
    if (!id) {
      create(data, {
        onSuccess: (response) => {
          !isOpen.requisitanteDialog &&
            router.push(
              `${REQUISITANTES.SHOW_PAGE.replace("id", String(response.id))}`
            );
          toggleRequisitanteDialog(false);
        },
      });
    } else {
      update(
        { ...data, id: Number(id) },
        {
          onSuccess: (response) => {
            router.push(
              `${REQUISITANTES.SHOW_PAGE.replace("id", String(response.id))}`
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
          <RHFTextField<TRequisitante>
            name="nome"
            label="Nome"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <RHFTextField<TRequisitante>
            name="fone"
            label="Telefone"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>

      <Stack spacing={2} direction="row" justifyContent="end">
        <CrudTools.Root>
          <CrudTools.SaveSubmitButton />
          <CrudTools.CancelButton
            isPreviousRoute={!isOpen.requisitanteDialog}
            handleCancel={() => toggleRequisitanteDialog(false)}
          />
        </CrudTools.Root>
      </Stack>
    </Box>
  );
};

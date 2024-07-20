import { RHFTextField } from "@/components/RHFwithMUI/RHFTextField";
import { CrudTools } from "@/components/shared/CrudTools";
import { Environment } from "@/environment";
import { equipamentoQueries } from "@/queries/EquipamentoQueries";
import { TEquipamento } from "@/schemas";
import { useIsOpenDialog } from "@/store/dialogStore";
import { Box, Grid, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function EquipamentosForm({
  data,
  id,
}: {
  data?: TEquipamento;
  id?: string;
}) {
  const { watch, control, unregister, reset, setValue, handleSubmit } =
    useFormContext<TEquipamento>();

  const { EQUIPAMENTOS } = Environment;

  const { isOpen, toggleLocalDeAplicacaoDialog } = useIsOpenDialog();

  useEffect(() => {
    if (data) {
      reset({
        nome: data.nome,
      });
    }
  }, [data, reset]);

  const router = useRouter();

  const { mutate: create } = equipamentoQueries.create();

  const { mutate: update } = equipamentoQueries.updateById(Number(id));

  const onSubmit = (data: TEquipamento) => {
    if (!id) {
      create(data, {
        onSuccess: (response) => {
          !isOpen.localDeAplicacaoDialog &&
            router.push(
              `${EQUIPAMENTOS.SHOW_PAGE.replace("id", String(response.id))}`
            );
          toggleLocalDeAplicacaoDialog(false);
        },
      });
    } else {
      update(
        { ...data, id: Number(id) },
        {
          onSuccess: (response) => {
            router.push(
              `${EQUIPAMENTOS.SHOW_PAGE.replace("id", String(response.id))}`
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
          <RHFTextField<TEquipamento>
            name="nome"
            label="Descrição"
            variant="outlined"
            fullWidth
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

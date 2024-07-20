import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { MenuItem, TextField, TextFieldProps } from "@mui/material";

type ConstantArray = readonly {
  value: string;
  label: string;
}[];

type Props<T extends FieldValues> = {
  options?: ConstantArray;
  name: Path<T>;
} & Pick<TextFieldProps, "label" | "variant" | "fullWidth" | "type" | "select">;

export function RHFTextField<T extends FieldValues>({
  options,
  name,
  ...props
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message}
        >
          {options &&
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      )}
    />
  );
}

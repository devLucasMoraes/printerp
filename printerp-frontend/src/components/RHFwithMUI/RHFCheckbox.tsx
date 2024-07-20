import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { TAutocompleteOption } from "@/types/models";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: TAutocompleteOption[];
  label: string;
};

export function RHFCheckbox<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, name, onBlur, ref },
        fieldState: { error },
      }) => (
        <FormControl error={!!error}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  name={name}
                  onBlur={onBlur}
                  ref={ref}
                  value={value}
                />
              }
              label={label}
            />
          </FormGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    ></Controller>
  );
}

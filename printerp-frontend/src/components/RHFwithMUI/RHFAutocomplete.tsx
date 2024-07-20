import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { Environment } from "@/environment";
import { QueryBase } from "@/queries/QueryBase";
import { Autocomplete, TextField, debounce } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { SetStateAction, useState } from "react";

export function RHFAutocomplete<T extends FieldValues, k>({
  name,
  label,
  queries,
}: {
  name: Path<T>;
  label?: string;
  queries: QueryBase<k>;
}) {
  const { control } = useFormContext();

  const { LIMITE_DE_LINHAS } = Environment;

  const [inputValue, setInputValue] = useState("");
  const [id, setId] = useState("");

  const debouncedSetInputValue = debounce((value) => {
    setInputValue(value);
  }, 500);

  const { data: options, isLoading } = useQuery({
    ...queries.searchTerm(inputValue, 0, LIMITE_DE_LINHAS, id),
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
        function handleValue(value: number | SetStateAction<string>) {
          if (value) {
            if (options?.content.find((option) => value === option.id)) {
              return options?.content.find((option) => value === option.id);
            } else {
              setId(String(value));
              return null;
            }
          } else {
            return null;
          }
        }

        return (
          <Autocomplete
            options={options?.content ?? []}
            loading={isLoading}
            value={handleValue(value)}
            onChange={(_, newValue) => onChange(newValue ? newValue.id : null)}
            onInputChange={(_, newValue) => debouncedSetInputValue(newValue)}
            isOptionEqualToValue={(option, newValue) =>
              option.id === newValue.id
            }
            getOptionLabel={(option) => option.label}
            ref={ref}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  label={label}
                />
              );
            }}
          />
        );
      }}
    />
  );
}

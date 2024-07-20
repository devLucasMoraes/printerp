import { Stack } from "@mui/material";

export function CrudToolsStackRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack direction="row" spacing={1}>
      {children}
    </Stack>
  );
}

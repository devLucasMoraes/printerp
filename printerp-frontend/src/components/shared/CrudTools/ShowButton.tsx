import { Button } from "@mui/material";
import { IconEye } from "@tabler/icons-react";
import NextLink from "next/link";

export function ShowButton({ showRoute }: { showRoute: string }) {
  return (
    <Button
      component={NextLink}
      href={showRoute}
      startIcon={<IconEye />}
      variant="outlined"
    >
      Exibir
    </Button>
  );
}

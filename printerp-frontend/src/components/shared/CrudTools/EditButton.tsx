import { Button } from "@mui/material";
import { IconEdit } from "@tabler/icons-react";
import NextLink from "next/link";

export function EditButton({ editRoute }: { editRoute: string }) {
  return (
    <Button
      component={NextLink}
      href={editRoute}
      variant="outlined"
      startIcon={<IconEdit />}
    >
      Editar
    </Button>
  );
}

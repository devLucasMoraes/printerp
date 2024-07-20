import { Button } from "@mui/material";
import { IconEraser } from "@tabler/icons-react";

export function DeleteButton({
  handleDelete,
  name = "Apagar",
  startIcon = false,
}: {
  handleDelete: () => void;
  name?: string;
  startIcon?: boolean;
}) {
  return (
    <Button
      color="error"
      variant="contained"
      startIcon={<IconEraser />}
      onClick={handleDelete}
    >
      {name}
    </Button>
  );
}

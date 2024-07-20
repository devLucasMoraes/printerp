import { IconButton } from "@mui/material";
import { IconEraser } from "@tabler/icons-react";

export function DeleteButtonActions({
  handleAction,
}: {
  handleAction?: () => void;
}) {
  return (
    <IconButton color="error" onClick={handleAction}>
      <IconEraser />
    </IconButton>
  );
}

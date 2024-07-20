import { IconButton } from "@mui/material";
import { IconEdit } from "@tabler/icons-react";

export function EditButtonActions({
  handleAction,
}: {
  handleAction?: () => void;
}) {
  return (
    <IconButton color="primary" onClick={handleAction}>
      <IconEdit />
    </IconButton>
  );
}

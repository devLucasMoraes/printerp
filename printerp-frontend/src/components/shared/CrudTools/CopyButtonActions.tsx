import { IconButton } from "@mui/material";
import { IconCopy } from "@tabler/icons-react";

export function CopyButtonActions({
  handleAction,
}: {
  handleAction?: () => void;
}) {
  return (
    <IconButton color="primary" onClick={handleAction}>
      <IconCopy />
    </IconButton>
  );
}

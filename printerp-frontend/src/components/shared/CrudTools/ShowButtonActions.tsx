import { IconButton } from "@mui/material";
import { IconEye } from "@tabler/icons-react";

export function ShowButtonActions({
  handleAction,
}: {
  handleAction?: () => void;
}) {
  return (
    <IconButton color="primary" onClick={handleAction}>
      <IconEye />
    </IconButton>
  );
}

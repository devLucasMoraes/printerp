import { IconButton, Tooltip } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";

export function AddButton({
  handleAdd,
  title,
}: {
  handleAdd?: () => void;
  title: string;
}) {
  return (
    <Tooltip title={title}>
      <IconButton color="primary" size="small" onClick={handleAdd}>
        <IconPlus />
      </IconButton>
    </Tooltip>
  );
}

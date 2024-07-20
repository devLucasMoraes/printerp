import { Button, Toolbar, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons-react";

export default function TableToolbar({
  onAdd,
  addItemLabel,
}: {
  onAdd: () => void;
  addItemLabel: string;
}) {
  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
      <Button color="primary" onClick={onAdd} startIcon={<IconPlus />}>
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle">
          {addItemLabel}
        </Typography>
      </Button>
    </Toolbar>
  );
}

import { Button } from "@mui/material";
import { IconRestore } from "@tabler/icons-react";

export function ResetButton({ handleReset }: { handleReset?: () => void }) {
  return (
    <Button
      color="error"
      variant="contained"
      startIcon={<IconRestore />}
      onClick={handleReset}
    >
      Reset
    </Button>
  );
}

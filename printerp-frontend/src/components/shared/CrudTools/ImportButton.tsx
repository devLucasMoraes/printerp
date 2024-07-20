import { Button, Input, Typography } from "@mui/material";
import { IconDownload } from "@tabler/icons-react";

export function ImportButton({
  handleImport,
}: {
  handleImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Button
      color="primary"
      variant="outlined"
      component="label"
      startIcon={<IconDownload />}
    >
      <Typography
        variant="button"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        IMPORTAR XML
      </Typography>

      <Input
        inputProps={{ accept: ".xml" }}
        type="file"
        sx={{ display: "none" }}
        onChange={handleImport}
      />
    </Button>
  );
}

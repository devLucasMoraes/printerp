import { Button, Typography } from "@mui/material";
import { IconFilePlus } from "@tabler/icons-react";
import NextLink from "next/link";

export function CreateButton({
  createRoute,
  title,
}: {
  createRoute: string;
  title: string;
}) {
  return (
    <Button
      component={NextLink}
      href={createRoute}
      variant="contained"
      size="large"
      startIcon={<IconFilePlus />}
    >
      <Typography variant="h6">{title}</Typography>
    </Button>
  );
}

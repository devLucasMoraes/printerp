import { Box, Skeleton, Stack } from "@mui/material";

const Loading = () => {
  return (
    <Stack spacing={2}>
      <Box padding={1}>
        <Skeleton width="20%" />
      </Box>

      <Skeleton variant="rounded" height="75vh" />
    </Stack>
  );
};

export default Loading;

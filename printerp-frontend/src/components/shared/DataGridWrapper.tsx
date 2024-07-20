import { Box, Card, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSlots,
  GridToolbarContainer,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CrudTools } from "./CrudTools";

function CustomToolbar({
  createRoute,
  titleCreateButton,
  title,
}: {
  createRoute?: string;
  titleCreateButton?: string;
  title: string;
}) {
  return (
    <GridToolbarContainer sx={{ p: "10px" }}>
      <Typography variant="h5">{title}</Typography>
      <Box sx={{ flexGrow: 1 }} />
      {createRoute && titleCreateButton && (
        <CrudTools.Root>
          <CrudTools.CreateButton
            createRoute={createRoute}
            title={titleCreateButton}
          />
        </CrudTools.Root>
      )}
    </GridToolbarContainer>
  );
}

export const DataGridWrapper = ({
  columns,
  rows,
  totalRowCount,
  setPaginationModel,
  paginationModel,
  isLoading,
  createRoute,
  titleCreateButton,
  title,
}: {
  title: string;
  createRoute?: string;
  titleCreateButton?: string;
  isLoading: boolean;
  columns: GridColDef[];
  rows?: GridValidRowModel[];
  totalRowCount?: number;
  paginationModel: {
    page: number;
    pageSize: number;
  };
  setPaginationModel: Dispatch<
    SetStateAction<{
      page: number;
      pageSize: number;
    }>
  >;
}) => {
  const [rowCountState, setRowCountState] = useState(totalRowCount || 0);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      totalRowCount !== undefined ? totalRowCount : prevRowCountState
    );
  }, [totalRowCount]);

  return (
    <Box display="grid" component={Card} elevation={9}>
      <DataGrid
        autoHeight
        rows={rows ?? []}
        columns={columns}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        disableRowSelectionOnClick
        rowCount={rowCountState}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        loading={isLoading}
        slots={{
          toolbar: CustomToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          toolbar: { createRoute, titleCreateButton, title },
        }}
      />
    </Box>
  );
};

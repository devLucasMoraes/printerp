import { unidades } from "@/constants";
import { insumoQueries } from "@/queries/InsumoQueries";
import { TInsumo, TRequisicaoEstoque } from "@/schemas";
import { Box, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconCircleMinus } from "@tabler/icons-react";
import * as React from "react";
import {
  FieldArray,
  Path,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { RHFAutocomplete } from "../RHFwithMUI/RHFAutocomplete";
import { RHFTextField } from "../RHFwithMUI/RHFTextField";
import TableToolbar from "./TableToolbar";

type RequisicaoEstoqueItem = FieldArray<TRequisicaoEstoque, "itens">;

interface Column<T> {
  field: keyof T;
  headerName: string;
  minWidth?: number;
  align?: "center";
  renderCell?: (params: { index: number; field: Path<T> }) => React.JSX.Element;
}

export const columns: readonly Column<RequisicaoEstoqueItem>[] = [
  { field: "idItem", headerName: "id", minWidth: 100, align: "center" },
  {
    field: "idInsumo",
    headerName: "Insumo",
    minWidth: 200,
    align: "center",
    renderCell: (params: {
      index: number;
      field: Path<RequisicaoEstoqueItem>;
    }) => (
      <RHFAutocomplete<TRequisicaoEstoque, TInsumo>
        name={`itens.${params.index}.${params.field}`}
        queries={insumoQueries}
      />
    ),
  },
  {
    field: "quantEntregue",
    headerName: "Qtde Entregue",
    minWidth: 170,
    align: "center",
    renderCell: (params: {
      index: number;
      field: Path<RequisicaoEstoqueItem>;
    }) => (
      <RHFTextField<TRequisicaoEstoque>
        name={`itens.${params.index}.${params.field}`}
        fullWidth
        type="number"
      />
    ),
  },
  {
    field: "undConsumo",
    headerName: "Unidade Consumo",
    minWidth: 170,
    align: "center",
    renderCell: (params: {
      index: number;
      field: Path<RequisicaoEstoqueItem>;
    }) => (
      <RHFTextField<TRequisicaoEstoque>
        name={`itens.${params.index}.${params.field}`}
        fullWidth
        select
        options={unidades}
      />
    ),
  },
];

export default function ItensTableWrapper() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { control, formState } = useFormContext<TRequisicaoEstoque>();

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "itens",
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box display="grid" component={Paper} variant="outlined">
      <TableToolbar
        addItemLabel="Adicionar novo item"
        onAdd={() => append({} as RequisicaoEstoqueItem)}
      />
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {fields
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.field];

                      return (
                        <TableCell key={column.field} align={column.align}>
                          {column.renderCell
                            ? column.renderCell({ index, field: column.field })
                            : value}
                        </TableCell>
                      );
                    })}

                    <TableCell>
                      <IconButton
                        color="error"
                        size="medium"
                        onClick={() => remove(index)}
                      >
                        <IconCircleMinus fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={fields.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

import { Environment } from "@/environment";
import { dashboardQueries } from "@/queries/DashboardQueries";
import { insumoQueries } from "@/queries/InsumoQueries";
import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DashboardCard from "../shared/DashboardCard";
import { UnderlineLink } from "../shared/UnderlineLink";

const products = [
  {
    id: "1",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    priority: "Low",
    pbg: "primary.main",
    budget: "3.9",
  },
  {
    id: "2",
    name: "Andrew McDownland",
    post: "Project Manager",
    pname: "Real Homes WP Theme",
    priority: "Medium",
    pbg: "secondary.main",
    budget: "24.5",
  },
  {
    id: "3",
    name: "Christopher Jamil",
    post: "Project Manager",
    pname: "MedicalPro WP Theme",
    priority: "High",
    pbg: "error.main",
    budget: "12.8",
  },
  {
    id: "4",
    name: "Nirav Joshi",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    priority: "Critical",
    pbg: "success.main",
    budget: "2.4",
  },
];

const { INSUMOS } = Environment;

const InsumosAbaixoMinimo = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const { data, isLoading } = useQuery({
    ...dashboardQueries.getAbaixoMinimo(
      paginationModel.page,
      paginationModel.pageSize
    ),
    placeholderData: keepPreviousData,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log("handleChangePage", paginationModel);
    console.log("handleChangePage newPage", newPage);
    setPaginationModel((old) => ({ ...old, page: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("handleChangeRowsPerPage", paginationModel);
    console.log(
      "handleChangeRowsPerPage +event.target.value",
      +event.target.value
    );
    setPaginationModel({ page: 0, pageSize: +event.target.value });
  };

  return (
    <DashboardCard title="Insumos Abaixo do Mínimo">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <TableContainer>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Insumo
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Saldo
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Unid.
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Abaixo do mínimo
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.content.map((insumo) => (
                <TableRow key={insumo.id}>
                  <TableCell>
                    <UnderlineLink
                      queries={insumoQueries}
                      id={insumo.id}
                      linkPath={`${INSUMOS.SHOW_PAGE.replace(
                        "id",
                        String(insumo.id)
                      )}`}
                      nameProperty="descricao"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{insumo.saldo}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {insumo.undEstoque}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: "error.main",
                        color: "#fff",
                      }}
                      size="small"
                      label={insumo.abaixoDoMinimo && "sim"}
                    ></Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 25, 100]}
            component="div"
            count={data?.totalElements ?? 0}
            rowsPerPage={paginationModel.pageSize}
            page={paginationModel.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </DashboardCard>
  );
};

export default InsumosAbaixoMinimo;

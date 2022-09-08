import React from "react";
import { useLazySearchTimesheetsProjectQuery, useSearchallProjectQuery } from "../api/youtrack.api";
import { CircularProgress, Grid, TableContainer, Table, TablePagination ,TableHead, TableRow, TableCell, TableBody, Button} from "@mui/material";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { Link, Navigate, NavLink } from "react-router-dom";

export function Timesheets() {
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
  const { isLoading, isError, data } = useSearchallProjectQuery();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };



  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        {isError && <p>Возникла ошибка</p>}
        {isLoading && <CircularProgress />}
      </Grid>
      {!isLoading && (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead  >
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Summary</TableCell>
                <TableCell align="right">PROJECT NAME</TableCell>
                <TableCell align="right">Timesheets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.slice(page* rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => (
                <TableRow
                  key={project.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{project.id}</TableCell>
                  <TableCell align="right">{project.summary}</TableCell>
                  <TableCell align="right">{project.project.name}</TableCell>
                  <TableCell align="right"><Button ><Link to={`TimesheetsProject/${project.id}`} onClick={(event) => {event.preventDefault(); window.open((`TimesheetsProject/${project.id}`));}}  >Timesheets</Link></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableContainer>
      )}
    </Grid>
  );
}

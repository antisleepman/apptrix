import React, { useEffect, useState } from "react";
import { useLazySearchProjectQuery, useSearchTasksQuery } from "../api/youtrack.api";
import { TextField, CircularProgress, Grid, List, ListItem, ListItemButton, ListItemText, TableContainer,Table,TableHead,TableRow,TableCell,TableBody} from "@mui/material";
import { useDebounce } from "../hooks/debounce";
export function Taskspage() {
  const [search, setSearch] = useState("");
  const [drop,setDrop] = useState(false)
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchTasksQuery(debounced, {
    skip: debounced.length < 3,
  });

const [fetchBaseQuery, { isLoading: projectLoading, data: projects}] =  useLazySearchProjectQuery()

  useEffect(() => {
    setDrop(debounced.length > 3 && data.length > 0)
  }, [debounced, data]);

const clickHandler = (projectname) => {
    fetchBaseQuery(projectname)
    setDrop(false)
}

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
      <Grid item xs={3}>
        <TextField type="text" placeholder="enter summary" value={search} onChange={e=>setSearch(e.target.value)} />
        {drop && 
        <List sx={{ width: '100%', maxWidth: 360}} aria-label="project name" >
            {isLoading && <CircularProgress/>}
            {data?.map(project => (
                <ListItem disablePadding key={project.id}>
                    <ListItemButton onClick={ () => clickHandler(project.project.name)} >
                        <ListItemText primary={project.project.name} />
                    </ListItemButton>
                </ListItem>
            ) )}
        </List>}
      </Grid>
      <Grid>
        {projectLoading && <CircularProgress/> }
        { !projectLoading  && 
            <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Summary</TableCell>
                    <TableCell align="right">PROJECT NAME</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {projects?.map(project => (
                    <TableRow key={project.id}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell   align="right">{project.id}</TableCell>
                        <TableCell align="right">{project.summary}</TableCell>
                        <TableCell align="right">{project.project.name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>  }
      </Grid>
    </Grid>
  );
}

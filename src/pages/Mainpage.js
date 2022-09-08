import React, { useContext, useState } from "react";
import { useSearchUsersQuery } from "../api/youtrack.api";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from "@mui/system";
import {Button, CircularProgress,Grid} from "@mui/material";
import { Carduser } from "../components/Carduser";

export function Mainpage(){
    const {isLoading, isError, data} = useSearchUsersQuery()
    const [carduser, setCardUser] = useState({})
    const [visible, setVisible] = useState(false)
    const handler =  (user) => {
        setCardUser(user)
        setVisible(true)
        console.log(user)
    }
    return(
            <Grid
    container
    spacing={1}
    direction='column'
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
    >
        <Grid item xs={3} >
        {isError && <p>Возникла ошибка</p>}
        {isLoading && <CircularProgress/>}
        </Grid>
        <Grid item  >
            { !isLoading && 
            <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Login</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Подробнее</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data?.map(user => (
                    <TableRow key={user.id}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell   align="right">{user.id}</TableCell>
                        <TableCell align="right">{user.name}</TableCell>
                        <TableCell align="right">{user.login}</TableCell>
                        <TableCell align="right">{user.email}</TableCell>
                        <TableCell align="right"><Button onClick={ () => handler(user)  }>Открыть</Button></TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>  }
        </Grid>
        <Grid item xl='auto'  > 
        {visible && <Carduser user={carduser}/>}
        </Grid> 
        </Grid>
    )
}
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getusers, searchUsers } from '../REDUXTOOLKIT/Operation';
import { useSelector, useDispatch } from 'react-redux';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect } from 'react';
import { useState } from 'react';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Button from '@mui/material/Button';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link, NavLink } from 'react-router-dom';
const columns = [
    { id: 'name', label: 'SN', minWidth: 170 },
    { id: 'code', label: 'First Name', minWidth: 100 },
    {
        id: 'population',
        label: 'Last Name',
        minWidth: 170,
        align: 'right',

    },
    {
        id: 'size',
        label: 'Email',
        minWidth: 170,
        align: 'right',

    },
    {
        id: 'density',
        label: 'Gender',
        minWidth: 170,
        align: 'right',

    },
    {
        id: 'density',
        label: 'Phone Number',
        minWidth: 170,
        align: 'right',

    },
    {
        id: 'density',
        label: 'Birth Day',
        minWidth: 170,
        align: 'right',

    },
    {
        id: 'density',
        label: 'Address',
        minWidth: 170,
        align: 'right',

    },
    {
        id: 'density',
        label: 'Admin',
        minWidth: 170,
        align: 'right',

    },
];
export const UsersPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getusers())
    }, [])
    const { arr, loading } = useSelector((s) => s.usersSlice)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [key, setKey] = useState("")
    //const[loading,setLoading]=useState("")
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const rows = arr

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleSearch = (e) => {
        e.preventDefault()

        dispatch(searchUsers(key))


    }

    return (
        <div className='mt-5 container'>
            <div className="my-4">
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                    onKeyUp={handleSearch}
                >
                    <TextField id="outlined-basic" label="Search With Users " value={key} onChange={(e) => setKey(e.target.value)} type="search" variant="filled"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">< SearchTwoToneIcon /></InputAdornment>,
                        }}

                    />

                </Box>
                <div className="my-5">
                    <NavLink style={{textDecoration:"none"}} as={Link} to="/dashboard/addAdminUser" >
                        <Button variant="contained" className='d-flex justify-content-start bg-dark' endIcon={<PersonOutlineIcon />} >
                            Add User Admin
                        </Button>
                    </NavLink >

                </div>
            </div>
            {loading === true ? (<div className='d-flex justify-content-center mt-5'>
                <span class="loader "></span>
            </div>) : (
                arr.length === 0 ? (
                    <div className='d-flex justify-content-center card shadow-lg vh-100'>
                        <h3 className='mt-5 text-center ' >User Not Found</h3>

                    </div>
                    

                ) : (<Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, idx) => {
                                        return (

                                            <TableRow>
                                                <TableCell key={idx} >
                                                    {idx + 1}
                                                </TableCell>
                                                <TableCell key={idx} >
                                                    {row.fname}
                                                </TableCell>

                                                <TableCell key={idx} align='right' className='ms-5'>
                                                    {row.lname}
                                                </TableCell>
                                                <TableCell key={idx} align='right'>
                                                    {row.email}
                                                </TableCell>
                                                <TableCell key={idx} align='right'>
                                                    {row.gender}
                                                </TableCell>
                                                <TableCell key={idx} align='right'>
                                                    {row.phonenumber}
                                                </TableCell>
                                                <TableCell key={idx} align='right'>
                                                    {row.birthday}
                                                </TableCell>
                                                <TableCell key={idx} align='right'>
                                                    {row.Address}
                                                </TableCell>
                                                <TableCell key={idx} align='right'>
                                                    {row.admin == false ? "No" : "Yes"}
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
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>)

            )}

        </div>
    )
}

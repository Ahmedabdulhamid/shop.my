import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getDetails, search } from '../REDUXTOOLKIT/getAllProducts'
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { delteProduct } from '../REDUXTOOLKIT/getAllProducts';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import InputAdornment from '@mui/material/InputAdornment';
import "../home.css"
export const ProductsDashBoard = () => {
    const [key, setKey] = useState()
    const { loading, products, productSearch } = useSelector((s) => s.productSlice)
    const[check,setCheck]=useState(false)
    useEffect(()=>{
        setCheck(false)
    })
    const dispatch = useDispatch()
    
    const handleSearch = (e) => {
        e.preventDefault()
        dispatch(search(key))
       setCheck(true)
    }
   
    useEffect(()=>{
        dispatch(search(key))
    },[check])
 
    const handleDelte = (e) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    title: "Deleted!",
                    text: "Your product has been deleted.",
                    icon: "success"
                });
                dispatch(delteProduct(e))
                
               setCheck(true)
            }
            else{
                setCheck(false)
            }
        });
    }
    useEffect(() => {
        dispatch(getDetails())
    }, [check])

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/dashboard/addprducts")
    }
    const handleUpdate = (id) => {
        navigate(`/dashboard/updateproduct/${id}`)
    }
   
    return (
        <div className='mt-5 container'>
            <Box
                component="form"
                className='w-100'
                noValidate
                autoComplete="off"

                onKeyUp={handleSearch}
            >

                <TextField id="filled-basic"
                    label="Search With Prducts"
                    variant="filled"
                    className='w-100'
                    type='search'
                    value={key}
                    onChange={(e) => setKey(e.target.value)}

                    InputProps={{
                        startAdornment: <InputAdornment position="start">< SearchTwoToneIcon/></InputAdornment>,
                      }}
                />

            </Box>
            <div className="my-5">
                <Button variant="contained" color="success" className='d-flex justify-content-start' endIcon={<AddIcon />} onClick={handleNavigate}>
                    Add Product
                </Button>
            </div>
            <div className='mt-5'>

                {loading === true ? (
                    <div className='d-flex justify-content-center mt-5'>
                        <span class="loader "></span>
                    </div>

                ) : (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                            <TableHead>

                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right">Category.</TableCell>
                                    <TableCell align="right" headerAlign="center">Price</TableCell>
                                    <TableCell align="right">Image</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    productSearch.length === 0 ? (products.map((row, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell className='d-flex justify-content-end'>{row.category}</TableCell>
                                            <TableCell align="right">{row.price} $</TableCell>
                                            <TableCell align="right"><Stack direction="row" headerAlign="center" className='d-flex justify-content-end'>


                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={row.image}
                                                    sx={{ width: 70, height: 70 }}
                                                />
                                            </Stack></TableCell>
                                            <TableCell align="right">

                                                <Button variant="contained" className='mx-2' color="secondary" endIcon={<EditIcon />} onClick={() => handleUpdate(row.id)}>Edit</Button>
                                                <Button variant="contained" color="error" endIcon={<DeleteIcon />} onClick={() => handleDelte(row.id)}>Delte</Button>

                                            </TableCell>
                                        </TableRow>
                                    ))) : (
                                        productSearch.map((row, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell>{idx + 1}</TableCell>
                                                <TableCell className='d-flex justify-content-end me-0'>{row.category}</TableCell>
                                                <TableCell align="right">{row.price} $</TableCell>
                                                <TableCell align="right"><Stack direction="row" headerAlign="center" className='d-flex justify-content-end'>


                                                    <Avatar
                                                        alt="Remy Sharp"
                                                        src={row.image}
                                                        sx={{ width: 70, height: 70 }}
                                                    />
                                                </Stack></TableCell>
                                                <TableCell align="right">

                                                    <Button variant="contained" className='mx-2' color="secondary" endIcon={<EditIcon />} onClick={() => handleUpdate(row.id)} >Edit</Button>
                                                    <Button variant="contained" color="error" endIcon={<DeleteIcon />} onClick={() => handleDelte(row.id)}>Delte</Button>


                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )

                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                )}


            </div>

        </div>
    )
}

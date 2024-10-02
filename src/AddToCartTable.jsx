import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import img from "./images/shopping_cart.png";
import { decreaseCount, updateCount, deleteFromAddToCart, AddToCart, getAllProductsFromAddToCart } from './REDUXTOOLKIT/getAllProducts';
import "./animation.css"
import { deleteAllProductsFromAddToCart } from './REDUXTOOLKIT/getAllProducts';
import ButtonWrapper from './ButtonWrapper';
import { Link } from 'react-router-dom';
import TableHead from '@mui/material/TableHead';



import {
  PayPalScriptProvider,

} from "@paypal/react-paypal-js";
import NavLink from 'react-bootstrap/esm/NavLink';



const AddToCartTable = () => {

    const dispatch = useDispatch();
    const { cartArray, loading } = useSelector((s) => s.productSlice)
    const Swal = require('sweetalert2')
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));


    useEffect(() => {


        dispatch(getAllProductsFromAddToCart())

    }, [])


    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const handeldelete = (e) => {
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
                    text: "Your productCart has been deleted.",
                    icon: "success"
                });
                dispatch(deleteFromAddToCart({ ...e.data }))

            }
        });
    }
    const handeldeleteAllProducts = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete all products!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    title: "Deleted!",
                    text: "Your productCart has been deleted.",
                    icon: "success"
                });
                dispatch(deleteAllProductsFromAddToCart())
                
            }
        });
        window.scrollTo(0,0)
    }



    const value1 = cartArray.map((e) => {

        return Number(e.data.totalprice)

    }).reduce((x, y) => {
        return x + y
    }, 0);
    console.log();



    return (
        <div className='container'>
            {cartArray.length === 0 ? (
                <div className='mt-5 d-flex justify-content-center container'>
                    <div className='mt-5 text-success'>


                        <h3 className='text-center'> Your Cart Is Empty !</h3>

                        <div>
                            <img src={img} alt="" />
                        </div>


                        <div className="d-flex justify-content-center mt-5" >
                            <NavLink as={Link} to="/"><Button className='text-light ' variant="contained" color="success">Back To Home</Button>
                            </NavLink>
                        </div>



                    </div>


                </div>
            ) : (
                <div>
                    <TableContainer component={Paper} className='navlink3 mt-3'>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table ">

                            <TableHead>
                                <TableRow>
                                    <TableCell>SN</TableCell>
                                    <TableCell align="right">Category</TableCell>
                                    <TableCell align="right">Image</TableCell>
                                    <TableCell align="right">Unit Price</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="right">Total Price</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartArray.map((e, index) => (
                                    <TableRow key={index} className=''>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <StyledTableCell align="right">{e.data.category}</StyledTableCell>
                                        <TableCell align="right">
                                            <Stack direction="row" spacing={2} className='d-flex justify-content-end'>


                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={e.data.image}
                                                    sx={{ width: 70, height: 70 }}
                                                />
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="right">
                                            $ {new Intl.NumberFormat('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(e.data.price)}
                                        </TableCell>
                                        <TableCell align="right">  <div className='d-flex justify-content-end'>
                                            <Button variant='none' onClick={() => dispatch(updateCount({ ...e.data }))} >+</Button>
                                            <Button variant='none' >{e.data.count}</Button>
                                            <Button variant='none' onClick={() => dispatch(decreaseCount({ ...e.data }))} >-</Button>
                                        </div></TableCell>
                                        <TableCell align="right">
                                            $ {new Intl.NumberFormat('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(e.data.totalprice)}

                                        </TableCell>
                                        <TableCell align="right"> <Button variant="contained" onClick={() => handeldelete(e)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                

                            </TableBody>
                        </Table>

                    </TableContainer>
                    <div className='mt-3 d-flex justify-content-between'>
                        <Button variant="contained"   onClick={handeldeleteAllProducts}>
                            Clear
                        </Button>
                        <span  > Total ({cartArray.length}) items :<span className='fw-bold'>$ </span><span className='fw-bold'>{new Intl.NumberFormat('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value1)}</span>  </span>
                    </div>

                    <div className='d-flex justify-content-center'>
                        <div className="d-grid gap-2 mt-1 w-75" >
                            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" ,intent: "capture"}} >
                                <ButtonWrapper showSpinner={false} total={value1} />
                            </PayPalScriptProvider>
                        </div>

                    </div>

                </div>
            )}

        </div>

    );

}

export default AddToCartTable

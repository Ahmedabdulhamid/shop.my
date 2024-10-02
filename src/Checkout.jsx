import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import img from "./payment.png"
import { getAllProductsFromAddToCart } from './REDUXTOOLKIT/getAllProducts';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutUsers } from './REDUXTOOLKIT/Operation';

export const Checkout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.login) {
            dispatch(getAllProductsFromAddToCart(

                JSON.parse(localStorage.login).id
            ))
        }

    }, [localStorage.login])
    const { objMode } = useSelector((s) => s.usersSlice)

    const [mode, setMode] = useState('');
    const [modeL, setModeL] = useState(false);
   

    const handelForm = (e) => {

        e.preventDefault()
        const data = {
           
            mode,

        }
        if (localStorage.login) {
            dispatch(checkoutUsers(data))
        }
        else{
            alert('you must login')
        }
       
    }
    const { cartArray, productDetails } = useSelector((s) => s.productSlice)
    useEffect(()=>{
       window.paypal.Buttons({

            
            createOrder:(data,actions)=>{
                return actions.order.create({
                    purchase_units:[
                        {
                         amount:{
                            value:600.00
                         }   
                        }
                    ]
                })

            },
            onApprove:(data,actions)=>{
                return actions.order.capture().then((details)=>{
                    alert('thank you for paying ' +details.payer.name.given_name);
                    

                })

            }
           
         

        }).render('#paypal-button-container');
    },[])

    return (
        <div className='container  '>
            <div className='row  mt-5 d-flex justify-content-center'>
                <div className=' col-lg-12 col-md-12 col-12'>
                    <Form className='w-100 px-5 py-5  bg-light ' onSubmit={handelForm}>
                        <div className="row w-100">
                           
                        </div>
                        <div id="paypal-button-container"></div>
              
                    </Form>
                </div>
            </div>



        </div >
    )
}

import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import { contact } from './REDUXTOOLKIT/Communication';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useForm } from "react-hook-form"
import "./contact.css"
export const Contact = () => {
    const { arr, loading } = useSelector((s) => s.userContact)
    
   
    const [emailL, setEmailL] = useState(false);
    
    const dispatch = useDispatch()
    const [msg, setMsg] = useState('');
    const [error1, setError] = useState("")
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: "all" });
    useEffect(() => {
        setMsg("")
        setError("")
    }, [])
    const emailRejax = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const onSubmit =(data)=>{
         if (localStorage.login) {
            const data1={...data,user_id:JSON.parse(localStorage.login).data.id}
            if (data.email!==JSON.parse(localStorage.login).data.email) {
               setEmailL(true)
            }
            else{
                console.log(data1);
                setEmailL(false)
                dispatch(contact(data1))
                setMsg("your Message has been Sent Sucessfully")
            
               reset()
            }

         }
         else{
            setError("You Should Login")
        }
       
       
    }
 
    return (
       <div className='container mt-5'>
            <h3># CONTACT US</h3>
            <div className="row d-flex justify-content-center container">
                <div className="col-lg-8 col-md-8 col-12 mt-5 shadow-lg p-3 mb-5 bg-body-tertiary rounded d-flex justify-content-center ">
                   

                        <Box
                            className='py-5'
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: "100%" },
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit(onSubmit)}
                        >

                            <TextField id="standard-basic" label={ "Enter Your Full Name" } 
                             error={Boolean(errors.fullname)}
                            variant="outlined" type="text"  
                            helperText={Boolean(errors.fullname) ? "Required Fullname" : null}
                            {...register("fullname", { required: true })}
                           
                            
                           
                            />
                            <TextField id="standard-basic" label={ "Enter Your E-mail" } variant="outlined" type="email" 

                            error={Boolean(errors.email)||emailL===true}
                            helperText={Boolean(errors.email) ? "Required email" : null ||emailL===true?"Your Email Is Not Found":null}
                            {...register("email", { required: true, pattern: emailRejax })}
                           
                          
                            />
                            <TextField id="standard-basic" label={ "Enter Your Subject" } variant="outlined" type="text" 
                              
                              error={Boolean(errors.subject)}
                            helperText={Boolean(errors.subject) ? "Required Subject" : null}
                            {...register("subject", { required: true })}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label={ "Enter Your Message" }
                                multiline
                                rows={4}
                               
                                error={Boolean(errors.message)}
                                helperText={Boolean(errors.message) ? "Required Mesaage" : null}
                                {...register("message", { required: true })}

                            />

                            <Button variant="dark" type="submit" >
                                Send
                            </Button>
                            {error1 === "" ? ("") : (<Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">{error1}</Alert>

                            </Stack>)}
                            {msg===""?(""):(
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="success">{msg}</Alert>

                            </Stack>
                            )}
                        </Box>


                  
                </div>
            </div>
        </div>
    )
}

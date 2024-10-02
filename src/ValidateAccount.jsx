import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import { useForm } from "react-hook-form"
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { ForgetpasswordRedux } from './REDUXTOOLKIT/Operation';
import { useNavigate } from 'react-router-dom';
import { getusers } from './REDUXTOOLKIT/Operation';
export const ValidateAccount = () => {
        const emailRejax = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const { object, loading, arr } = useSelector((s) => s.usersSlice)
        console.log(arr);
        
        const [msg,setMsg]=useState("")
        const navigate=useNavigate("")
        useEffect(()=>{
         setMsg("")     
        },[])
        const dispatch=useDispatch();
        const {
            control,
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({ mode: "all" });
        useEffect(() => {
            dispatch(getusers())
    
        }, [])
        
        const onSubmit = (data) => {
           
            let check = arr.some((e) => {
                console.log(e);
                return e.email == data.email
                
                
            })
            console.log(check);
            
            if (check) {
                dispatch(ForgetpasswordRedux(data.email))
                if (object.message==="your email is not valide") {
                    setMsg("your email is not valide")
                 }
                 else{
                    setMsg("Message has been sent.....")
                    localStorage.validation = JSON.stringify(object)
                    setTimeout(() => {
                     navigate(`/verificationcode/${data.email}`)
        
                    }, 1000)
                 }
                
            }
            else{
                setMsg("Your Email Not Found Please Sign Up");
            }
            
            
           

            
        }
        
        
    return (
        <div className='mt-5 container d-flex justify-content-center'>
            
            <Card className='mt-5 py-5 col-lg-6 col-md-6 col-sm-12 shadow-lg p-3 mb-5 bg-body-tertiary rounded'>

                <Card.Body>
                    <Card.Title className='my-3'>Enter Your Email</Card.Title>
                    <Card.Text className={msg==="Your Email Not Found Please Sign Up"?"my-3 text-danger":"my-3 text-success"}>{msg}</Card.Text>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextField id="outlined-basic"type='email' label="email" variant="outlined"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">< EmailIcon/></InputAdornment>,
                          }}
                          error={Boolean(errors.email)}
                          helperText={Boolean(errors.email) ? "Required email" : null}
                          {...register("email", { required: true, pattern: emailRejax })}
                        
                        />
                      <Button type="submit" variant="contained">Send</Button>
                    </Box>
                </Card.Body>
            </Card>

        </div>
    )
}

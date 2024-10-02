import React, { useEffect, useState } from 'react'

import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import Card from 'react-bootstrap/Card';
import { ForgetpasswordRedux } from './REDUXTOOLKIT/Operation';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { getusers } from './REDUXTOOLKIT/Operation';
import { useForm } from "react-hook-form"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './forget.css'
export const Forgetpassword = () => {
    const [email, setEmail] = useState('');
    const [emailL, setEmailL] = useState(false);
    const [msg, setMsg] = useState('');
    const dispatch = useDispatch()
    const { object, loading, arr } = useSelector((s) => s.usersSlice)
    const navigate = useNavigate()
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: "all" });
    useEffect(() => {
        setMsg('')
    }, [])
    const emailRejax = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    useEffect(() => {
        dispatch(getusers())

    }, [])
    console.log(Math.floor(1000+Math.random()*900000));
    const onSubmit = (data) => {



        setMsg(object.message)
        let check = arr.some((e) => {
            return e.email === data.email
        })
        if (check) {
            dispatch(ForgetpasswordRedux(data.email))

          localStorage.validation = JSON.stringify(object)
           

            setMsg("Message has been sent.....")
            setTimeout(() => {
                navigate(`/validation/${data.email}`)
            }, 1000);
        }
        else {
            setMsg("Your Email Not Found Please Sign Up")
        }


    }
    return (
        <div className='mt-5 container d-flex justify-content-center'>

            <Card className='mt-5 py-5 col-lg-6 col-md-6 col-sm-12 shadow-lg p-3 mb-5 bg-body-tertiary rounded'>

                <Card.Body>
                    <Card.Title className='my-3'>Enter Your Email</Card.Title>
                    <Card.Text className={msg === "Your Email Not Found Please Sign Up" ? "my-3 text-danger" : "my-3 text-success"}>{msg} </Card.Text>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextField id="outlined-basic" type='email' label="email" variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">< EmailIcon /></InputAdornment>,
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

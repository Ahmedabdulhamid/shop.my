import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import { updatePasswordRedux } from './REDUXTOOLKIT/Operation';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form"
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
export const UpdatePassword = () => {
    const [password, setPassword] = useState('')
    const [coPassword, setCoPaasword] = useState('')
    const [passwordL, setPasswordL] = useState(false)
    const [coPasswordL, setCoPaaswordL] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: "all" });
    const onSubmit = (data) => {
        const data1 = {data, id };
           console.log(data1);
           
        if (data.password !== data.coPassword) {
            setCoPaaswordL(true)
            
        }
        else {
            console.log(data1);
            setCoPaaswordL(false)
           dispatch(updatePasswordRedux(data1))

            navigate('/login')
            reset()
        }





    }

    return (
        <div className='mt-5 container d-flex justify-content-center'>

            <Card className='mt-5 py-5 col-lg-6 col-md-6 col-sm-12 shadow-lg p-3 mb-5 bg-body-tertiary rounded'>

                <Card.Body>
                    <Card.Title className='my-3'>Update Your Password</Card.Title>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextField id="outlined-basic" type={showPassword ? 'text' : 'password'}

                            label="Password" variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">< HttpsOutlinedIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}

                            error={Boolean(errors.password)}
                            helperText={Boolean(errors.password) ? "Required Password and should contains in 8 characters" : null}
                            {...register("password", { required: true, minLength: 8 })}

                        />
                        <TextField id="outlined-basic" type={showPassword ? 'text' : 'password'}

                            label="Confirm Password" variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">< HttpsOutlinedIcon /></InputAdornment>,
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}

                            error={Boolean(errors.coPassword)||coPasswordL===true}
                            helperText={Boolean(errors.coPassword) ? "Required Field and should contains in 8 characters" : null||coPasswordL===true?"Must be like Password":null}
                            {...register("coPassword", { required: true, minLength: 8 })}

                        />
                        <Button type="submit" variant="contained">Send</Button>
                    </Box>
                </Card.Body>
            </Card>

        </div>
    )
}

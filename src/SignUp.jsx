import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from 'react-bootstrap/Card';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { MuiTelInput } from 'mui-tel-input'
import { useForm } from "react-hook-form"
import Button from '@mui/material/Button';
import { createusers } from './REDUXTOOLKIT/Operation';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
export const SignUp = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [value, setValue] = React.useState('20')
    const { loading, arr } = useSelector((s) => s.usersSlice)
    const [msg, setMsg] = useState("")
    const[passwordL,setPassL]=useState(false);
    useEffect(() => {
        setMsg("")
    })


    const handleChange = (newValue) => {
        setValue(newValue)
    }
    const dispatch = useDispatch()
    const Navigate=useNavigate()
    const emailRejax = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phoneRejax = "^[+]{1}(?:[0-9\\-\\(\\)\\/" + "\\.]\\s?){6,15}[0-9]{1}$"
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: "all" });

    const onSubmit = (data) => {
        console.log(data.Gender);
         console.log(data.password.length);
         
        
       
            dispatch(createusers(data))
           
          
           
           
            var check = arr.some((e) => {
                return e.email === data.email
            })
            if (check) {
                Swal.fire({
                    title: "Your Email Already Exist",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
            }
            else {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You Signed Up Successfully......",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                  
                    Navigate("/login")
                }, 3000);
                
            }
        
        
        
       


    }

    const [birthdate, setBirthdate] = useState("");

    return (
        <div className='mt-5 container'>
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-md-12 col-sm-12 ">

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '75%' },

                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Card style={{ width: '100%' }} className='shadow-sm p-3 mb-5 bg-body-tertiary rounded'>


                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 ">
                                    <Card className="width-100 bg-none" style={{ border: "none" }}>
                                        <TextField id="outlined-basic"
                                            type='text'
                                            error={Boolean(errors.firstName)}
                                            helperText={Boolean(errors.firstName) ? "Required First Name" : null}
                                            {...register("firstName", { required: true })}

                                            label="First Name" variant="outlined" className='my-3 mx-3' />
                                        <TextField id="outlined-basic" type='email' label="Email" variant="outlined" className='my-3 mx-3'

                                            error={Boolean(errors.email)}
                                            helperText={Boolean(errors.email) ? "Required email" : null}
                                            {...register("email", { required: true, pattern: emailRejax })}


                                        />
                                        <TextField id="outlined-basic" type={showPassword ? 'text' : 'password'} label="Password" variant="outlined" className='my-3 mx-3'

                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>,
                                            }}
                                            error={Boolean(errors.password)}
                                            helperText={Boolean(errors.password) ? "Required password And Should Have in 8 characters" : null}
                                            {...register("password", { required: true ,minLength: 8})}




                                        />
                                        <FormControl className=' mx-3'>
                                            <FormLabel id="demo-row-radio-buttons-group-label"

                                                className={Boolean(errors.Gender) ? "text-danger" : "text-dark"}
                                            >{Boolean(errors.Gender) ? "Required Gender" : "Gender"}</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"


                                            >
                                                <FormControlLabel value="female" error={Boolean(errors.Gender)} {...register("Gender", { required: true })} control={<Radio />} label="Female"
                                                />
                                                <FormControlLabel value="male"
                                                    error={Boolean(errors.Gender)}
                                                    {...register("Gender", { required: true })}
                                                    helperText={Boolean(errors.Gender) ? "Required Gender" : null}
                                                    control={<Radio />} label="Male" />

                                            </RadioGroup>
                                        </FormControl>


                                    </Card>





                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 ">
                                    <Card className="width-100 bg-none" style={{ border: "none" }}>
                                        <TextField id="outlined-basicbirthdate"
                                            error={Boolean(errors.LastName)}
                                            helperText={Boolean(errors.LastName) ? "Required Last Name" : null}
                                            {...register("LastName", { required: true })}

                                            label="Last Name" variant="outlined" className='my-3 mx-3' />
                                        <TextField id="outlined-basic"
                                            error={Boolean(errors.Address)}
                                            helperText={Boolean(errors.Address) ? "Required Address" : null}
                                            {...register("Address", { required: true })}

                                            type='text' label="Address" variant="outlined" className='my-3 mx-3' />

                                        <TextField id="outlined-basic"
                                            error={Boolean(errors.BirthDate)}
                                            helperText={Boolean(errors.BirthDate) ? "Required BirthDate" : null}
                                            {...register("BirthDate", { required: true })}

                                            type='Date' inputProps={{ require: true }} className='my-3 mx-3' />

                                    </Card>
                                </div>
                            </div>
                            <MuiTelInput value={value} error={Boolean(errors.PhoneNumber)}
                                helperText={Boolean(errors.PhoneNumber) ? "Required Phone Number" : null}
                                {...register("PhoneNumber", { required: true, pattern: /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/ })}
                                defaultCountry={'eg'} inputProps={{
                                    require: true
                                }} onChange={handleChange} label="Phone Number" className='my-3 mx-3 ' />
                            <div className='py-3 mx-2'>
                                <Button type='submit' variant='contained'>Submit</Button>
                            </div>

                        </Card>

                    </Box>

                </div>
            </div>
        </div>
    )
}

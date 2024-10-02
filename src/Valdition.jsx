import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./home.css"
import OTPInput, { ResendOTP } from "otp-input-react";
import { useEffect } from 'react';
export const Valdition = () => {
    const dispatch = useDispatch()
    const { object, loading, arr } = useSelector((s) => s.usersSlice)
    const [otp, setOtp] = useState('');

    const { id } = useParams()
    const [textL, setTextL] = useState(false)
    console.log(id);
    console.log(object);
    console.log(localStorage.getItem("validation"));
 

    const navigate = useNavigate()

    const handleForm = (e) => {
        e.preventDefault()
        if (otp == object.code) {
            navigate(`/updateYourPssword/${id}`)

        }
        else {
            setTextL(true)

        }



    }

    return (
        <div className='mt-5 container '>
            <div className="row d-flex justify-content-center">

                <div className="col=lg-6 col-md-6 col-sm-12   ">
                    <Card className='w-100'>

                        <Card.Body className='w-100'>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity={"success"}>Message has been sent to your Gemail</Alert>
                            </Stack>


                            <Card.Text>
                                <Form className='w-100 py-3' onSubmit={handleForm} >

                                    <Form.Group className="mb-3  " controlId="formBasicEmail">
                                        <Form.Label className={textL === false ? "text-dark" : 'text-danger'}> {textL == true ? "Invalid verfication code" : "verfication code"}</Form.Label>
                                        <br />
                                        <div className='d-flex justify-content-center'>
                                        <OTPInput value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType="number" disabled={false} />
                                        </div>


                                    </Form.Group>
                                    <div className="d-grid gap-2">
                                        <Button className='text-light' variant='success' type='submit'>
                                            Send
                                        </Button>


                                    </div>
                                </Form>

                            </Card.Text>

                        </Card.Body>
                    </Card>
                </div>
            </div>

        </div>
    )
}

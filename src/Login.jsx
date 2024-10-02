import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import { getAllProductsFromAddToCart } from './REDUXTOOLKIT/getAllProducts';
import { Link } from 'react-router-dom';

import { login } from './REDUXTOOLKIT/Operation';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';

import { useNavigate } from 'react-router-dom';
import "./login.css"

const Login = () => {



    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [emailL, setEmailL] = useState(false);
    const [passwordL, setPassL] = useState(true);
    const [error, setError] = useState(false)
    const { loading, objlogin} = useSelector((s) => s.usersSlice)
    const[link,setLink]=useState(false);
    useEffect(()=>{
        setLink(false)
    },[])
    const [msg, setMsg] = useState('')
    const data = {
        email,
        password
    }
   

    useEffect(() => {
        setMsg('')
    }, [])
    useEffect(() => {
        dispatch(login(data))
    }, [objlogin])

    const handleClick = (e) => {

        e.preventDefault()
        window.scrollTo(0, 0);
        dispatch(login(data))
        setMsg(objlogin.message)
        
        if (objlogin.message === 'login successfully...') {
           localStorage.login = JSON.stringify(objlogin)
            setTimeout(() => {
                navigate('/')

            }, 1000)
            dispatch(getAllProductsFromAddToCart(JSON.parse(localStorage.login).data.id))
        }
        if (objlogin.message==="You Need To active Your Email First") {
            setLink(true)
        }

    }
    
    return (
        <div className='container d-flex justify-content-center vh-100 mt-5'>

            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-lg-12 col-md-12 col-12">
                    <Card className='w-100 shadow p-3 mb-5 bg-body-tertiary rounded"'>
                        <Card.Title className={msg === "login successfully..." ? "text-success" : "text-danger"}>{msg}</Card.Title>
                        {link===false?"":(
                            <div>
                                <NavLink className='text-dark' as={Link} to="/account">Activate Your Account Now </NavLink>
                            </div>
                        )}

                        <Card.Body className='w-100'>
                            <Form className='w-100' onSubmit={handleClick}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email </Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" className='w-100' value={email} onChange={(e) => (setEmail(e.target.value))} />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" className='w-100' value={password} onChange={(e) => (setPass(e.target.value))} />
                                </Form.Group>
                                <div className='d-flex justify-conent-end my-3'>
                                    <NavLink className='text-dark' as={Link} to="/forgetpassword">Forget Your Password ?</NavLink>
                                </div>
                                <div className="d-grid gap-2">

                                    <Button className='text-light' style={{ backgroundColor: "black" }} type='submit'>
                                        Login
                                    </Button>


                                </div>

                                <div className='my-3 d-flex justify-conent-center'>
                                    <NavLink className='text-dark' as={Link} to="/register">Don’t Have Account ?</NavLink>


                                </div>
                                {error == true ? (<Alert variant="filled" severity="error">
                                    login is failed
                                </Alert>) : ('')}


                            </Form>
                        </Card.Body>
                    </Card>
                </div>

            </div>


        </div >
    )
}
export default Login    
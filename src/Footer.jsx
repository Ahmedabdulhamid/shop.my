import React, { useEffect, useState } from 'react'
import img from "./payment.png"
import NavLink from 'react-bootstrap/esm/NavLink'
import { Link } from 'react-router-dom'
import "./footer.css"
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
const Footer = () => {
    const navigate = useNavigate()
 
    const handleClick=()=>{
        localStorage.clear()
        navigate('/login')
      }
      let time =new Date().toLocaleTimeString();
     
      const [currentTime,setCurrentTime]=useState(time)
     const updateTime=()=>{
        let time =new Date().toLocaleTimeString();
        setCurrentTime(time)
     }
       setInterval(()=>{
     updateTime()
       },1000)
       
     
       
      
   
    return (
        <div className='mt-5'>
            
            <div style={{ backgroundColor: "#273036" }}className='d-flex justify-content-center' >
                <div className="container ">
                    <div className="row  d-flex justify-content-center ">
                        <div className="col-lg-4 col-md-6 my-3 ">
                            <h4 className='text-light'>Shop With Us</h4>
                            <div className='py-3'>
                                <NavLink className='text-light py-2 '  as={Link} to={localStorage.login?"/profile":"/login"} >Your Account</NavLink>
                                <NavLink className='text-light py-2 '  as={Link} to="/addedproducts" >Your Cart Page</NavLink>

                                <NavLink className='text-light py-2 '  as={Link} to={localStorage.login?"/purchases":"/login"} >Your Orders</NavLink>
                            </div>


                        </div>
                        <div className="col-lg-4 col-md-6 my-3 ">
                            <h4 className='text-light'>More Form Tenzo </h4>
                            <div className='py-3'>
                                <NavLink className='text-light py-2 '  as={Link} to="/register" >Sign Up</NavLink>
                               
                                {localStorage.getItem("login")?(<NavLink className='text-light ' onClick={handleClick}>Sign out</NavLink>):(<NavLink className='text-light'as={Link}  to={'/login'}>Sign in</NavLink>)}
                                <NavLink className='text-light py-2 '  as={Link} to="/contact" >Contact Us</NavLink>
                            </div>

                        </div>
                        <div className="col-lg-4 col-md-6 my-3 ">
                            <h4 className='text-light'>Follow Us</h4>
                            <div className='mt-5'> 
                                <span className='mx-2'><a href="https://www.facebook.com/?locale=ar_AR"><FaFacebook className='fs-5 text-light'/></a></span>
                                <span className='mx-2'><a href="https://www.instagram.com/"><FaInstagram className='fs-5 text-light'/></a></span>
                                <span className='mx-2'><a href="https://twitter.com/?lang=en"><FaTwitter className='fs-5 text-light'/></a></span>
                                <span className='mx-2'><a href="https://www.youtube.com/"><FaYoutube className='fs-5 text-light'/></a></span>
                            </div>
                            
                        </div>
                    </div>
                    <div className='py-4 d-flex justify-content-center '>
                        <h4 className=' text-center xlcz py-3'  >{currentTime}</h4>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Footer

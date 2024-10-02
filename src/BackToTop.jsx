import React from 'react'
import Button from '@mui/material/Button';
import "./top.css"
import $ from "jquery";
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import { useEffect } from 'react';
const BackToTop = () => {
    const top=()=>{
        window.scrollTo(0,-50)
    }
    useEffect(()=>{
       $(document).ready(function () {
        $(".btn-s").fadeOut() 
       })
      $(window).scroll(function () {
        if ($(window).scrollTop()<90) {
            $(".btn-s").fadeOut(500)     
        }
        else{
            $(".btn-s").fadeIn(500)
        }
        
      })
    })
    return (
        <div className='mt-5 container d-flex justify-content-end position-relative'>
           <Button variant='contained'><ArrowCircleUpOutlinedIcon className='pb-3 mt-1 text-danger btn-s'  onClick={top} /></Button> 
        </div>
    )
}

export default BackToTop

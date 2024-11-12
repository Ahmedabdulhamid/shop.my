import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getproductsDetails, AddToCart, getAllProductsFromAddToCart } from './REDUXTOOLKIT/getAllProducts';
import { useDispatch, useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./style.css"
import { FaCartPlus } from "react-icons/fa6";
import Cookies from "universal-cookie";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetails, loading, cartArray } = useSelector((s) => s.productSlice)


  useEffect(() => {
    dispatch(getproductsDetails(id))

  }, [])


  const sweetalert2 = () => {

    const data = {
      ...productDetails,


    }
    dispatch(AddToCart(data))
    //dispatch(getAllProductsFromAddToCart(JSON.parse(localStorage.login).data.id))

    let check = cartArray.some((e) => {
      return e.data.id === productDetails.id

    })
    // alert(msg)
    if (check) {

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Product  already exist",
        showConfirmButton: false,
        timer: 1500
      });
    }
    else {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Product has been added successfuly",
        showConfirmButton: false,
        timer: 1500
      });
    }



  }



  return (

    <div className='container mt-5'>
      {loading ? (<div className='d-flex justify-content-center mt-5'>
        <span class="loader"></span>
      </div>) : (<div className="row mt-5">

        <div className="col-lg-6 col-md-6 mt-5">
          <LazyLoadImage

            className='w-50'
            src={productDetails.image} />
        </div>
        <div className="col-lg-6 col-md-6 mt-5 text-dark">
          <p> description : {productDetails.description}</p>
          <p> category : {productDetails.category}</p>
          <p>rate :{productDetails.rate}</p>
          <StarRatings
            rating={productDetails.rate
            }
            starDimension="20px"
            starSpacing="1px"
            starRatedColor="orange"
          />
          <p>price : {productDetails.discountprice} $</p>



          <div className='my-2'>
            <Button variant="none" style={{ backgroundColor: "orange", color: "white" }} onClick={sweetalert2} >Add To Cart  <FaCartPlus className='mx-1' /> </Button>




          </div>
        </div>
      </div>
      )}



    </div>
  )
}

export default Details



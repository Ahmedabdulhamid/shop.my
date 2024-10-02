import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2'
import { addOrder } from "./REDUXTOOLKIT/Communication";
import {

  PayPalButtons,
} from "@paypal/react-paypal-js";
import { getAllProductsFromAddToCart } from './REDUXTOOLKIT/getAllProducts';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function ButtonWrapper({ total }) {
  const dispatch = useDispatch();
  const style = { "layout": "vertical" };
  const { cartArray, loading } = useSelector((s) => s.productSlice)
  const [msg, setMsg] = useState("")
  useEffect(() => {
    dispatch(getAllProductsFromAddToCart())
  }, [cartArray.length])
  useEffect(() => {
    setMsg("")
  }, [])
  const createOrder = (data, actions, error) => {
    if (localStorage.login) {
      return actions.order.create({
        intent: "CAPTURE",
        purchase_units: [
          {

            amount: {

              value: total
            }
          }
        ]
      })
    }
    else {
      setMsg("You Should Login First..")
    }

    window.scrollTo(0, 0);



  }


  const onApprove = (data, actions) => {
    window.scrollTo(0, 0);

    if (localStorage.login) {
      for (let i = 0; i < cartArray.length; i++) {
        var userDate = {
          phonenumber: JSON.parse(localStorage.login).data.phoneNumber,
          fname: JSON.parse(localStorage.login).data.fname,
          lname: JSON.parse(localStorage.login).data.lname,
          user_id: JSON.parse(localStorage.login).data.id,
          product_name: cartArray[i].data.titel,
          product_quantity: cartArray[i].data.count,
          product_image: cartArray[i].data.image,
          total_price: cartArray[i].data.totalprice,
          Address: JSON.parse(localStorage.login).data.Address


        }

        dispatch(addOrder(userDate))

      }

      return actions.order.capture().then((details) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `thank you for paying  ${details.payer.name.given_name}`,
          showConfirmButton: false,
          timer: 1500
        });


      })

    }
    else {
      setMsg("You Should Login First..")
    }



  }

  const onError = (err) => {
    console.log(err);


  }

  return (

    <div>

      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'

        }}

        forceReRender={[style]}
        fundingSource={undefined}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
      {msg === "" ? "" : (
        <div className="row">
          <div className="col-12">
            <Stack className="w-100">

              <Alert variant="filled" severity="error">
                {msg}
              </Alert>
            </Stack>
          </div>
        </div>

      )}

    </div>


  );


}

export default ButtonWrapper
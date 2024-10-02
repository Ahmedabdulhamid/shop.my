import React, { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { addProducts, getDetails } from '../REDUXTOOLKIT/getAllProducts';
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '../REDUXTOOLKIT/getAllProducts';
import Form from 'react-bootstrap/Form';
import { getproductsDetails } from '../REDUXTOOLKIT/getAllProducts';
import "./addproduct.css"
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
const UpdateProducts = () => {
  const { id } = useParams()
  const [product, setProducts] = useState({})
  const dispatch = useDispatch()
  const handleFunc = async () => {
    try {
      const response = await fetch(`http://localhost/products/index.php?id=${id}`)
      const result = await response.json();

      setProducts(result.data)
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleFunc()

  }, [])

  console.log(id);
  const [titleL, SetTitleL] = useState(false)
  const [categoryL, SetCategoryL] = useState(false)
  const [stockL, SetStockL] = useState(false)
  const [countL, SetCountL] = useState(false)
  const [rateL, SetRateL] = useState(false)
  const [discountprecentageL, SetDiscL] = useState(false)
  const [descriptionL, SetDisL] = useState(false)
  const [priceL, SetPriceL] = useState(false)

  const ti = useRef()
  const des = useRef();
  const cat = useRef();
  const pri = useRef();
  const disc = useRef();
  const st = useRef();
  const ra = useRef();
  const co = useRef();
 
  const handleUpdate = (e) => {

    e.preventDefault()
    window.scrollTo(0, 0);
    const titel = ti.current.value;

    const category = cat.current.value
    const stock = Number(st.current.value)
    const discountprecentage = Number(disc.current.value)
    const description = des.current.value
    const count = Number(co.current.value)
    const rate = Number(ra.current.value)
    const price = Number(pri.current.value)

    if (titel === "" && category === "" && stock && count === "" && rate === "" && discountprecentage === "" && description === "" && price === "") {
      SetTitleL(true)
      SetCategoryL(true)
      SetStockL(true)
      SetCountL(true)
      SetRateL(true)
      SetDisL(true)
      SetDiscL(true)
      SetPriceL(true)

    }
    else if (titel==="") {
      SetTitleL(true)
    }
    
    else if (category === "") {
      SetTitleL(false)
      SetCategoryL(true)
    }
    else if (stock === 0) {
      SetTitleL(false)
      SetCategoryL(false)
      SetStockL(true)
    }
    else if (count === 0) {
      SetTitleL(false)
      SetCategoryL(false)
      SetStockL(false)
      SetCountL(true)
    }
    else if (rate === 0) {
      SetTitleL(false)
      SetCategoryL(false)
      SetStockL(false)
      SetCountL(false)
      SetRateL(true)
    }
   
    else if (description === "") {
      SetTitleL(false)
      SetCategoryL(false)
      SetStockL(false)
      SetCountL(false)
      SetRateL(false)
      SetDiscL(false)
      SetDisL(true)
    }
    else if (price === 0) {
      SetTitleL(false)
      SetCategoryL(false)
      SetStockL(false)
      SetCountL(false)
      SetRateL(false)
      SetDiscL(false)
      SetDisL(false)
      SetPriceL(true)
    }
    else {
      SetTitleL(false)
      SetCategoryL(false)
      SetStockL(false)
      SetCountL(false)
      SetRateL(false)
      SetDiscL(false)
      SetDisL(false)
      SetPriceL(false)
      
      const object = { id: Number(id), titel, category, stock, discountprecentage, description, rate, price, count }
      dispatch(updateProducts(object))
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Product has been updated",
        showConfirmButton: false,
        timer: 1500
      });
    }

  }
  return (
    <div className='container mt-5'>

      <Form
        component="form"
        className='w-100 '
        noValidate
        autoComplete="off"
        onSubmit={handleUpdate}

        
      >
        <TextField id="outlined-basic" label={titleL===false?"Update Your Product Title":"Invalid Product Title"} variant="filled" className='w-100 my-3 text-dark'
          inputRef={ti}
          value={product.titel}

          focused={true} color={titleL===true?"error":"success"}
          onChange={(e) => setProducts(e.target.value)}



        />
        
        <TextField id="outlined-basic" label={categoryL===false?"Update Your Product Category":"Invalid Product Category"} variant="filled" className='w-100 my-3'


          value={product.category}
          focused={true} color={categoryL===false?"success":"error"}
          onChange={(e) => setProducts(e.target.value)}
          inputRef={cat}
        />
        <TextField id="outlined-basic" label={stockL===false?"Update Your Product Stock":"Invalid Product Stock "} variant="filled" type="number" className='w-100 my-3'
          value={product.stock}
          focused={true} color={stockL===false?"success":"error"}
          onChange={(e) => setProducts(e.target.value)}
          inputRef={st}



        />
        <TextField id="outlined-basic" label={countL===false?"Update Your Product Quantity":"Invalid Product Quantity"} variant="filled" type="number" className='w-100 my-3'
          value={product.count}
          focused={true} color={countL===false?"success":"error"}
          onChange={(e) => setProducts(e.target.value)}

          inputRef={co}
        />

        <TextField id="outlined-basic" label={rateL===false?"Update Your Product Rate":"Invalid  Product Rate"} variant="filled" type="number" className='w-100 my-3'
          value={product.rate}
          focused={true} color={rateL===true?"error":"success"}
          onChange={(e) => setProducts(e.target.value)}

          inputRef={ra}

        />
        <TextField id="outlined-basic" label="Update Your Product DiscountPrcentage" variant="filled" type="number" className='w-100 my-3'
          value={product.
            discountprecentage}
          focused={true} color='success'
          onChange={(e) => setProducts(e.target.value)}

          inputRef={disc}
        />
       
        <TextField i id="outlined-multiline-static" multiline
          rows={4} label={descriptionL===false?" Update Your Product Description":"Invalid Product Description"} variant="filled" type="text" className='w-100 my-3'
          value={product.
            description}
          focused={true} color={descriptionL===true?"error":"success"}
          onChange={(e) => setProducts(e.target.value)}
          inputRef={des}
        />
      
        <TextField id="outlined-basic" label={priceL===true?"Invalid Products Price":"  Update Your Products Price"} type="number" variant="filled" className='w-100 my-3'
          value={product.
            price}
          focused={true} color={priceL===true?"error":"success"}
          onChange={(e) => setProducts(e.target.value)}

          inputRef={pri}
        />



        <div className="d-flex justify-content-center">
          <Button type="submit" color="primary" endIcon={<EditOutlinedIcon />} variant="contained" className="w-50  mt-5"  >Update</Button>

        </div>


      </Form>
      <div>


      </div>

    </div>
  )
}

export default UpdateProducts

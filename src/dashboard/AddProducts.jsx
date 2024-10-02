import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import SendIcon from '@mui/icons-material/Send';
import { addProducts } from '../REDUXTOOLKIT/getAllProducts';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { getallcategories } from '../REDUXTOOLKIT/getAllProducts';
import "./addproduct.css"
const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export const AddProducts = () => {
    const [title, SetTitle] = useState("")
    const [category, SetCategory] = useState("")
    const [stock, SetStock] = useState("")
    const [count, SetCount] = useState("")
    const [rate, SetRate] = useState("")
    const [discountprecentage, SetDisc] = useState("")
    const [description, SetDis] = useState("")
    const [price, SetPrice] = useState("")
    const [image, SetImage] = useState(null)
    const [titleL, SetTitleL] = useState(false)
    const [categoryL, SetCategoryL] = useState(false)
    const [stockL, SetStockL] = useState(false)
    const [countL, SetCountL] = useState(false)
    const [rateL, SetRateL] = useState(false)
    const [discountprecentageL, SetDiscL] = useState(false)
    const [descriptionL, SetDisL] = useState(false)
    const [priceL, SetPriceL] = useState(false)
    const [imageL, SetImageL] = useState(false)

    const dispatch = useDispatch()

    const handleForm = async (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        if (title === "" && category === "" && stock && count === "" && rate === "" && discountprecentage === "" && description === "" && price === "") {
            SetTitleL(true)
            SetCategoryL(true)
            SetStockL(true)
            SetCountL(true)
            SetRateL(true)
            SetDisL(true)
            SetDiscL(true)
            SetPriceL(true)
            SetImageL(true)
        }
        else if (title === "") {
            SetTitleL(true)
        }
        else if (category === "") {
            SetTitleL(false)
            SetCategoryL(true)
        }
        else if (stock === "") {
            SetTitleL(false)
            SetCategoryL(false)
            SetStockL(true)
        }
        else if (count === "") {
            SetTitleL(false)
            SetCategoryL(false)
            SetStockL(false)
            SetCountL(true)
        }
        else if (rate === "") {
            SetTitleL(false)
            SetCategoryL(false)
            SetStockL(false)
            SetCountL(false)
            SetRateL(true)
        }
        else if (discountprecentage === "") {
            SetTitleL(false)
            SetCategoryL(false)
            SetStockL(false)
            SetCountL(false)
            SetRateL(false)
            SetDiscL(true)
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
        else if (price === "") {
            SetTitleL(false)
            SetCategoryL(false)
            SetStockL(false)
            SetCountL(false)
            SetRateL(false)
            SetDiscL(false)
            SetDisL(false)
            SetPriceL(true)
        }
        else if (image === null) {
            SetTitleL(false)
            SetCategoryL(false)
            SetStockL(false)
            SetCountL(false)
            SetRateL(false)
            SetDiscL(false)
            SetDisL(false)
            SetPriceL(false)
            SetImageL(true)
        }
        else {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('image', image); // Ensure 'image' is a File object
            formData.append('category', category);
            formData.append('stock', stock);
            formData.append('count', count);
            formData.append('rate', rate);
            formData.append('discountprecentage', discountprecentage);
            formData.append('description', description);
            formData.append('price', price);

            // Check if formData has been populated correctly
            for (const pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            SetTitleL(false)
            SetCategoryL(false)
            SetStockL(false)
            SetCountL(false)
            SetRateL(false)
            SetDiscL(false)
            SetDisL(false)
            SetPriceL(false)
            SetImageL(false)
            dispatch(addProducts(formData));
            SetTitle("")
            SetCategory("")
            SetStock("")
            SetDis("")
            SetDisc("")
            SetImage(null)
            SetRate("")
            SetPrice("")
            SetCount("")
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Product has been Added",
                showConfirmButton: false,
                timer: 1500
              });
        }


    };


    return (
        <div className='container mt-5'>

            <Form
                component="form"
                className='w-100 '
                noValidate
                autoComplete="off"
                onSubmit={handleForm}
                encType='multipart/form-data'

            >
                <TextField id="outlined-basic" label={titleL === false ? "Title" : "Please Enter Your Product Title..."} variant="filled" className='w-100 my-3' value={title} onChange={(e) => SetTitle(e.target.value)}
                    color={titleL === false ? "primary" : "error"}
                    InputLabelProps={{ className: titleL === true && "textfieldlabel" }}
                />
                <TextField id="outlined-basic" label={categoryL === false ? "Category" : "Please Enter Your Product Category..."} variant="filled" className='w-100 my-3' value={category} onChange={(e) => SetCategory(e.target.value)}

                    color={categoryL === false ? "primary" : "error"}
                    InputLabelProps={{ className: categoryL === true && "textfieldlabel" }}


                />
                <TextField id="outlined-basic" label={stockL === false ? "Stock" : "Please Enter Your Product Stock..."} variant="filled" type="number" className='w-100 my-3' value={stock} onChange={(e) => SetStock(e.target.value)}
                    color={stockL === false ? "primary" : "error"}
                    InputLabelProps={{ className: stockL === true && "textfieldlabel" }}

                />
                <TextField id="outlined-basic" label={countL === false ? "Quantity" : "Please Enter Your Product Quantity..."} variant="filled" type="number" className='w-100 my-3' value={count} onChange={(e) => SetCount(e.target.value)}

                    color={countL === false ? "primary" : "error"}
                    InputLabelProps={{ className: countL === true && "textfieldlabel" }}


                />
                <TextField id="outlined-basic" label={rateL === false ? "Rate" : "Please Enter Your Product Rate..."} variant="filled" type="number" className='w-100 my-3' value={rate} onChange={(e) => SetRate(e.target.value)}
                    color={rateL === false ? "primary" : "error"}
                    InputLabelProps={{ className: rateL === true && "textfieldlabel" }}

                />
                <TextField id="outlined-basic" label={discountprecentageL === false ? "Discountprecentage" : "Please Enter Your Product Discountprecentage..."} variant="filled" type="number" className='w-100 my-3' value={discountprecentage} onChange={(e) => SetDisc(e.target.value)}

                    color={discountprecentageL === false ? "primary" : "error"}
                    InputLabelProps={{ className: discountprecentageL === true && "textfieldlabel" }}
                />
                <TextField i id="outlined-multiline-static" multiline
                    rows={4} label={descriptionL === false ? "Description" : "Please Enter Your Product Descriptione..."} variant="filled" type="text" className='w-100 my-3' value={description} onChange={(e) => SetDis(e.target.value)}
                    color={descriptionL === false ? "primary" : "error"}
                    InputLabelProps={{ className: descriptionL === true && "textfieldlabel" }}
                />
                <TextField id="outlined-basic" label={priceL === false ? "Price" : "Please Enter Your Product Price..."} type="number" variant="filled" className='w-100 my-3' value={price} onChange={(e) => SetPrice(e.target.value)}
                    color={priceL === false ? "primary" : "error"}
                                  InputLabelProps={{ className: priceL === true && "textfieldlabel" }}
                />
                <div className={imageL===true?"d-flex justify-content-center aligin-items-center uploaderr my-5     ":"d-flex justify-content-center aligin-items-center upload my-5     "} >
                    <Button

                        component="label"




                        startIcon={< CloudUploadOutlinedIcon className='text-dark fs-1' />}

                    >
                        Upload Image

                        <VisuallyHiddenInput type="file" id="file" name="image" onChange={(e) => SetImage(e.target.files[0])} />
                    </Button>
                </div>

                {imageL === true ? (
                    <p className='text-danger'>Error Upload Image</p>
                ) : ('')}
                <div className="d-flex justify-content-center">
                    <Button type="submit" color="success" endIcon={<SendIcon />} variant="contained" className="w-50  mt-5"  >  Submit</Button>

                </div>


            </Form>
            <div>


            </div>

        </div>
    )
}

import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import "./searchcomponent.css";
import { red } from '@mui/material/colors';
import OutlinedInput from '@mui/material/OutlinedInput';
export const SearchComponent = () => {
    return (
        
        <div className='container d-flex justify-content-start '>
            
            <div className="col-lg-8 col-md-8 col-sm-12">
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '100%' },

                }}
                noValidate
                autoComplete="off"
                className='mt-5    '

            >

                <TextField  className='shadow-lgshadow-lg p-3 mb-5 bg-body-tertiary rounded input' name="" id=""placeholder='Search with Products' InputProps={{
                        startAdornment: <InputAdornment position="start">< SearchIcon/></InputAdornment>,
                      }}  
                      sx={{

                        ".MuiOutlinedInput-root":{
                           input:{
                             color:"gray",
                             fontFamily:"monospace"
                           },
                           fieldset:{
                             border:"1px solid gray !important"
                           }
                        }
                     }} />
            </Box>
            </div>
           
        </div>
    )
}
/*
<Form onSubmit={handelSearch} >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label className='text-light'>search </Form.Label>
                      <Form.Control
                        className='input'
                        type="text"
                        placeholder="search with products"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>



                  </Form>*/
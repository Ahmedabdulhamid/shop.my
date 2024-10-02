import {configureStore}from "@reduxjs/toolkit";
import { productSlice } from "./getAllProducts";
import { usersSlice } from "./Operation";
import { userContact } from "./Communication";
export const store=configureStore({
    reducer:{
       productSlice,
       usersSlice,
       userContact
    }
})
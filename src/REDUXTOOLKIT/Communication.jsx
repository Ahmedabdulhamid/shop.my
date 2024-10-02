import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const contact = createAsyncThunk('contact', async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi
    console.log(id);
    try {
        const response = await fetch('https://ahmedabdulhamidm-001-site1.atempurl.com/contact.php', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullname: id.fullname,
                email: id.email,
                subject: id.subject,
                message: id.message,
                user_id: id.user_id
            })
        })
        const data = await response.json()
        return data

    }


    catch (error) {
        return rejectWithValue(error)

    }

})
export const addOrder = createAsyncThunk('addOrder', async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi
    console.log(id);
    try {
        const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/orders.php`, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phonenumbers: id.phonenumber,
                fname: id.fname,
                lname: id.lname,
                user_id: id.user_id,
                product_name:id.product_name,
                product_quantity:id.product_quantity,
                product_image:id.product_image,
              total_price:id.total_price,
              Address:id.Address
                
                



            })
        })
        const data = await response.json()
        return data

    }


    catch (error) {
        return rejectWithValue(error)

    }

})
export const getOrders = createAsyncThunk('getOrders', async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi
    console.log(id);
    try {
        const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/getOrders.php`)
        const data = await response.json()
        return data

    }


    catch (error) {
        return rejectWithValue(error)

    }

})
export const getOrderforuser = createAsyncThunk('getOrderforuser', async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi
    console.log(id);
    try {
        const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/getorderforuser.php?user_id=${JSON.parse(localStorage.login).data.id}`)
        const data = await response.json()
        return data

    }


    catch (error) {
        return rejectWithValue(error)

    }

})

const createUserSlice = createSlice({


    name: "create user",
    initialState: {
        loading: false,
        arr: [],
        orders: [],
        orderForUser:[]
       

    },
    extraReducers: (builder) => {

        builder.addCase(contact.pending, (state, action) => {
            state.loading = true


        })
        builder.addCase(contact.fulfilled, (state, action) => {
            state.loading = false
            console.log(action);



        })
        builder.addCase(contact.rejected, (state, action) => {

            state.arr = []
        })
        builder.addCase(addOrder.pending, (state, action) => {
            state.loading = true
            console.log(action);

        })
        builder.addCase(addOrder.fulfilled, (state, action) => {
            state.loading = false
            console.log(action);



        })
        builder.addCase(addOrder.rejected, (state, action) => {

            state.arr = []
        })

        builder.addCase(getOrders.pending, (state, action) => {
            state.loading = true
            

        })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload;
          
           
         


        })
        builder.addCase(getOrders.rejected, (state, action) => {
            state.loading = false
            console.log(action);

            state.arr = []
        })
        builder.addCase(getOrderforuser.pending, (state, action) => {
            state.loading = true
            console.log(action);

        })
        builder.addCase(getOrderforuser.fulfilled, (state, action) => {
            state.loading = false
            state.orderForUser=action.payload
            
           
         


        })
        builder.addCase(getOrderforuser.rejected, (state, action) => {
            state.loading = false

            state.arr = []
        })


    }
})
export const userContact = createUserSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
export const getusers = createAsyncThunk(' getusers', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi
  try {
    const response = await fetch('https://ahmedabdulhamidm-001-site1.atempurl.com/getusers.php', {


    })
    const data = await response.json()
    return data

  }
  catch (error) {
    return rejectWithValue(error)

  }

})

export const createusers = createAsyncThunk(' createusers', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi
  console.log(id);
  try {
    const response = await fetch('https://ahmedabdulhamidm-001-site1.atempurl.com/createuser.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fname: id.firstName,
        lname: id.LastName,
        email: id.email,
        password: id.password,
        gender: id.Gender,
        phonenumber: id.PhoneNumber,
        birthday: id.BirthDate,
        Address: id.Address


      })
    })
    const data = await response.json()
    return data

  }
  catch (error) {
    return rejectWithValue(error)

  }

})
export const createAdminUsers = createAsyncThunk(' createAdminUsers', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi
  console.log(id);
  try {
    const response = await fetch('https://ahmedabdulhamidm-001-site1.atempurl.com/createAdminUser.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fname: id.firstName,
        lname: id.LastName,
        email: id.email,
        password: id.password,
        gender: id.Gender,
        phonenumber: id.PhoneNumber,
        birthday: id.BirthDate,
        Address: id.Address



      })
    })
    const data = await response.json()
    return data

  }
  catch (error) {
    return rejectWithValue(error)

  }

})
export const login = createAsyncThunk(' login', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi
  try {
    const response = await fetch('https://ahmedabdulhamidm-001-site1.atempurl.com/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        email: id.email,
        password: id.password,
        // expiresInMins: 60, // optional
      })
    })
    const data = await response.json()
    return data

  }
  catch (error) {
    return rejectWithValue(error)

  }

})
export const logout = createAsyncThunk(' logout', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi
  try {
    const response = await fetch('https://ahmedabdulhamidm-001-site1.atempurl.com/logout.php')
    const data = await response.json()
    return data

  }
  catch (error) {
    return rejectWithValue(error)

  }

})
export const ForgetpasswordRedux = createAsyncThunk('ForgetpasswordRedux', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi
  try {
    const response = await fetch('https://ahmedabdulhamidm-001-site1.atempurl.com/forgetpassword.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        email: id,

      })
    })
    const data = await response.json()
    return data

  }
  catch (error) {
    return rejectWithValue(error)

  }

})
export const updatePasswordRedux = createAsyncThunk(' updatePasswordRedux ', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi
  console.log(id);
  try {
    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/updatePassword.php? email="${id.id}"`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: id.data.password
      })
    }
    )

    const data = await response.json()
    return data

  }
  catch (error) {
    return rejectWithValue(error)

  }

})
export const activateGemail = createAsyncThunk(' activateGemail ', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi
  console.log(id.password);
  try {
    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/activateAccount.php?email=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
       active:true
      })
    }
    )

    const data = await response.json()
    return data

  }
  catch (error) {
    return rejectWithValue(error)

  }

})
export const checkoutUsers = createAsyncThunk('checkoutUsers ', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi
  console.log(id.password);
  try {
    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/cheackout.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentmode: id.mode
      })
    }
    )

    const data = await response.json()
    return data

  }
  catch (error) {
    return rejectWithValue(error)

  }

})
export const searchUsers = createAsyncThunk('searchUsers ', async (key, thunkApi) => {
  const { rejectWithValue } = thunkApi

  try {
    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/searchusers.php?key=${key}`)

    const data = await response.json()
    return data

  }
  catch (error) {
    return rejectWithValue(error)

  }

})
export const getUser = createAsyncThunk('getUser ', async (key, thunkApi) => {
  const { rejectWithValue } = thunkApi

  try {
    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/getuser.php?id=${JSON.parse(localStorage.login).data.id}`)

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
    objlogin: {},
    msg: '',
    pass: "",
    object: {},
    objMode: {},
    objfacebook: {},
    objgoogle: {},
    isLogin: false,
    userInfo:{}


  },
  extraReducers: (builder) => {
    builder.addCase(getusers.pending, (state, action) => {
      state.loading = true


    })
    builder.addCase(getusers.fulfilled, (state, action) => {
      state.loading = false
      console.log(action);
      
      state.arr = action.payload



    })
    builder.addCase(getusers.rejected, (state, action) => {


    })
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true
   

    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false
     state.userInfo=action.payload[0];
      
     



    })
    builder.addCase(getUser.rejected, (state, action) => {
        console.log(action);
        

    })
    builder.addCase(searchUsers.pending, (state, action) => {

      state.loading = true




    })
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.arr = action.payload



    })
    builder.addCase(searchUsers.rejected, (state, action) => {


    })
    builder.addCase(createusers.pending, (state, action) => {
      state.loading = true


    })
    builder.addCase(createusers.fulfilled, (state, action) => {
      state.loading = false
      state.arr = action.payload




    })
    builder.addCase(createusers.rejected, (state, action) => {


    })
    builder.addCase(createAdminUsers.pending, (state, action) => {
      state.loading = true


    })
    builder.addCase(createAdminUsers.fulfilled, (state, action) => {
      state.loading = false
      state.arr = action.payload

      console.log(action);



    })
    builder.addCase(createAdminUsers.rejected, (state, action) => {


    })
    builder.addCase(login.pending, (state, action) => {
      state.loading = true

    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false

      state.objlogin = action.payload
      state.isLogin = true






    })
    builder.addCase(login.rejected, (state, action) => {
      console.log(action);

    })
    builder.addCase(logout.pending, (state, action) => {
      state.loading = true

    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false
      state.isLogin = false
      console.log(action);
      //state.isLogin=false





    })
    builder.addCase(logout.rejected, (state, action) => {
      console.log(action);
      console.log(action);
    })
    builder.addCase(ForgetpasswordRedux.pending, (state, action) => {
      state.loading = true
      console.log(action);

    })
    builder.addCase(ForgetpasswordRedux.fulfilled, (state, action) => {
      state.loading = false

      console.log(action);
      state.object = action.payload







    })
    builder.addCase(ForgetpasswordRedux.rejected, (state, action) => {
      console.log(action);

    })
    builder.addCase(updatePasswordRedux.pending, (state, action) => {
      state.loading = true
      console.log(action);

    })
    builder.addCase(updatePasswordRedux.fulfilled, (state, action) => {
      state.loading = false
      console.log(action);
    })
    builder.addCase(updatePasswordRedux.rejected, (state, action) => {
      console.log(action);

    })
    builder.addCase(checkoutUsers.pending, (state, action) => {
      state.loading = true
      console.log(action);

    })
    builder.addCase(checkoutUsers.fulfilled, (state, action) => {
      state.loading = false
      console.log(action);
    })
    builder.addCase(checkoutUsers.rejected, (state, action) => {
      console.log(action);

    })
    builder.addCase(activateGemail.pending, (state, action) => {
      state.loading = true
      console.log(action);

    })
    builder.addCase(activateGemail.fulfilled, (state, action) => {
      state.loading = false
      console.log(action);
    })
    builder.addCase(activateGemail.rejected, (state, action) => {
      console.log(action);

    })
  


  }
})
export const usersSlice = createUserSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  Cookies from 'universal-cookie';
const sessionId=new Cookies();
sessionId.get("PHPSESSID")
console.log(sessionId.cookies.PHPSESSID);
export const getDetails = createAsyncThunk('getDetails', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi
  
  try {
    const response = await fetch('https://ahmedabdulhamidm-001-site1.atempurl.com/getproducts.php');
    const result = await response.json();
    return result
  } catch (error) {
    return rejectWithValue(error)
  }
})
export const delteProduct = createAsyncThunk('delteProduct', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi
  console.log(id);
  try {
    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/deleteProducts.php?id=${id}`);
    const result = await response.json();
    return result
  } catch (error) {
    return rejectWithValue(error)
  }
})


export const addProducts = createAsyncThunk('addProducts', async (formData, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await fetch('https://ahmedabdulhamidm-001-site1.atempurl.com/addProducts.php', {
      method: 'POST',
      // headers: { 'Content-Type': "application/json" },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const updateProducts = createAsyncThunk('updateProducts ', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/update.php?id=${id.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({
        titel: id.titel,
        category: id.category,
        stock: id.stock,
        count:id.count,
        rate: id.rate,
        discountprecentage: id.discountprecentage,
        description: id.description,
        price: id.price,



      }),
    });


    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const getproductsDetails = createAsyncThunk('getproductsDetails', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi

  try {
    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/index.php?id=${id}`);
    const result = await response.json();
    return result
  } catch (error) {
    return rejectWithValue(error)
  }
})
export const search = createAsyncThunk('search', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi

  try {
    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/search.php?search=${id}
    `);
    const result = await response.json();
    return result
  } catch (error) {
    return rejectWithValue(error)
  }
})
export const getallcategories = createAsyncThunk('getallcategories', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi

  try {
    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/categories.php`)
    const data = await response.json()
    return data
  }
  catch (error) {
    return rejectWithValue(error)

  }

})
export const getproductsByCategory = createAsyncThunk('etproductsByCategory', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi

  try {
    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/category.php?category=${id}`)
    const data = await response.json()
    return data
  }
  catch (error) {
    return rejectWithValue(error)

  }

})
export const AddToCart = createAsyncThunk('AddToCart', async (id, thunkApi) => {
  const sessionId=new Cookies();
  sessionId.get("PHPSESSID")
 console.log(sessionId.cookies.PHPSESSID);

  const { rejectWithValue } = thunkApi;

  try {


    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/AddToCart.php?id=${id.id} && session_id=${sessionId.cookies.PHPSESSID}`, {

      method: 'POST',
     // headers: { 'Session-ID':sessionId.get("PHPSESSID")},
      body: JSON.stringify({
          titel:id.titel,
          image:id.image,
          category:id.category,
          stock:id.stock,
          discountprecentage:id.discountprecentage,
          description:id.description,
          price:id.price,
          totalprice:id.price ,
          
      })

    })
   
    const data = await response.json();
    return data;

   
  } catch (error) {
    return rejectWithValue(error)
  }
})
export const updateCount = createAsyncThunk('updateCount', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  const sessionId=new Cookies();
  sessionId.get("PHPSESSID")
 console.log(sessionId.cookies.PHPSESSID);
  try {


    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/Updatecount.php?id=${id.id} && session_id=${sessionId.cookies.PHPSESSID} `)
    const data = await response.json();
    return data;

  } catch (error) {
    return rejectWithValue(error)
  }
})
export const decreaseCount = createAsyncThunk('decreaseCount', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  const sessionId=new Cookies();
  sessionId.get("PHPSESSID")
 console.log(sessionId.cookies.PHPSESSID);
  try {


    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/decreaseCount.php?id=${id.id} && session_id=${sessionId.cookies.PHPSESSID} `)
    const data = await response.json();
    return data;

  } catch (error) {
    return rejectWithValue(error)
  }
})
export const getproductfromaddtocart = createAsyncThunk('getproductfromaddtocart', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  console.log(id);
  try {


    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/getproduct.php?id="${id.image}"&& user_id=${id.user_id}`)
    const data = await response.json();
    return data;

  } catch (error) {
    return rejectWithValue(error)
  }
})
export const deleteFromAddToCart = createAsyncThunk('deleteFromAddToCart', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  console.log(id);
  try {


    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/deleteproductfromaddtocart.php? id= ${id.id} && session_id=${sessionId.cookies.PHPSESSID}`)
    const data = await response.json();
    return data;

  } catch (error) {
    return rejectWithValue(error)
  }
})
export const getAllProductsFromAddToCart = createAsyncThunk('getAllProductsFromAddToCart', async (id, thunkApi) => {
  const sessionId=new Cookies();
  sessionId.get("PHPSESSID")
  
  const { rejectWithValue } = thunkApi;

  try {


    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/getproductsfromaddtocart.php?session_id=${sessionId.cookies.PHPSESSID}`)
    const data = await response.json();
    return data;


  } catch (error) {
    return rejectWithValue(error)
  }
})
export const deleteAllProductsFromAddToCart = createAsyncThunk('deleteAllProductsFromAddToCart ', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi

  try {
    const response = await fetch(`https://ahmedabdulhamidm-001-site1.atempurl.com/clear.php?session_id=${sessionId.cookies.PHPSESSID}`)
    const data = await response.json()
    return data
  }
  catch (error) {
    return rejectWithValue(error)

  }

})
const slice = createSlice({
  name: 'asdf',
  initialState: {
    products: [],
    loading: false,
    productDetails: {},
    productSearch: [],
    cartArray: [],
    addobj: {},
    addState: false,
    message: '',
    arrCategory: [],
    productsCategory: [],
    cookie:""



  },


  extraReducers: (builder) => {

    builder.addCase(getDetails.pending, (state, action) => {
      state.loading = true
      state.products = []
    })
    builder.addCase(getDetails.fulfilled, (state, action) => {
      state.loading = false
      state.products = action.payload

    })
    builder.addCase(getDetails.rejected, (state, action) => {
      console.log(action);
      state.products = []
    })
    builder.addCase(updateProducts.pending, (state, action) => {
      state.loading = true
      state.products = []
      console.log(action);
    })
    builder.addCase(updateProducts.fulfilled, (state, action) => {
      state.loading = false
      console.log(action);

    })
    builder.addCase(updateProducts.rejected, (state, action) => {
      console.log(action);

    })
    builder.addCase(delteProduct.pending, (state, action) => {

    })
    builder.addCase(delteProduct.fulfilled, (state, action) => {
      state.products = action.payload
      state.productSearch = action.payload
    })
    builder.addCase(delteProduct.rejected, (state, action) => {
      state.arr = []
    })
    builder.addCase(addProducts.pending, (state, action) => {
      console.log(action);
    })
    builder.addCase(addProducts.fulfilled, (state, action) => {
      console.log(action);
    })
    builder.addCase(addProducts.rejected, (state, action) => {
      console.log(action);
    })
    builder.addCase(getproductsDetails.pending, (state, action) => {
      state.loading = true

    })
    builder.addCase(getproductsDetails.fulfilled, (state, action) => {
      state.loading = false
      state.productDetails = action.payload.data
      state.count = action.payload.data.count

    })
    builder.addCase(getproductsDetails.rejected, (state, action) => {

      state.productDetails = []
    })
    builder.addCase(search.pending, (state, action) => {
      state.loading = true

    })
    builder.addCase(search.fulfilled, (state, action) => {
      state.loading = false
      state.productSearch = action.payload
      console.log(action);
    })
    builder.addCase(search.rejected, (state, action) => {

      state.productDetails = []
    })
    builder.addCase(getallcategories.pending, (state, action) => {
      state.loading = true

    })
    builder.addCase(getallcategories.fulfilled, (state, action) => {
      state.loading = false
      state.arrCategory = action.payload
    })
    builder.addCase(getallcategories.rejected, (state, action) => {

      console.log(action);
    })
    builder.addCase(getproductsByCategory.pending, (state, action) => {
      state.loading = true

    })
    builder.addCase(getproductsByCategory.fulfilled, (state, action) => {
      state.loading = false
      state.productsCategory = action.payload
    })
    builder.addCase(getproductsByCategory.rejected, (state, action) => {


    })

    builder.addCase(AddToCart.pending, (state, action) => {
      state.loading = true

    })
    builder.addCase(AddToCart.fulfilled, (state, action) => {
      state.loading = false
      console.log(action);
      state.cartArray = action.payload

      console.log(state.cartArray);

    })
    builder.addCase(AddToCart.rejected, (state, action) => {

      state.cartArray = []
    })
    builder.addCase(updateCount.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(updateCount.fulfilled, (state, action) => {
      state.loading = false
      state.cartArray = action.payload
      console.log(action);
    })
    builder.addCase(updateCount.rejected, (state, action) => {
      state.loading = false
    })
    builder.addCase(decreaseCount.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(decreaseCount.fulfilled, (state, action) => {
      state.loading = false
      console.log(action);
      state.cartArray = action.payload


    })
    builder.addCase(decreaseCount.rejected, (state, action) => {

      state.loading = false
    })
    builder.addCase(deleteFromAddToCart.pending, (state, action) => {
      state.loading = true
      console.log(action);
    })
    builder.addCase(deleteFromAddToCart.fulfilled, (state, action) => {
      state.loading = false

      state.cartArray = action.payload
      window.scrollTo(0, 0);
    })
    builder.addCase(deleteFromAddToCart.rejected, (state, action) => {
      console.log(action);
      state.cartArray = []

    })
    builder.addCase(getAllProductsFromAddToCart.pending, (state, action) => {
      state.loading = true


    })
    builder.addCase(getAllProductsFromAddToCart.fulfilled, (state, action) => {

      state.loading = false
      state.cartArray = action.payload
      console.log(action);
    })
    builder.addCase(getAllProductsFromAddToCart.rejected, (state, action) => {
      state.cartArray = []


    })
    builder.addCase(deleteAllProductsFromAddToCart.pending, (state, action) => {
      state.loading = true
      console.log(action);

    })
    builder.addCase(deleteAllProductsFromAddToCart.fulfilled, (state, action) => {
      state.loading = false
      state.cartArray = action.payload


    })
    builder.addCase(deleteAllProductsFromAddToCart.rejected, (state, action) => {
      state.cartArray = []


    })
  }

})
export const { increment, decrement } = slice.actions
export const productSlice = slice.reducer

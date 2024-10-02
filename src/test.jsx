
/*
details.jsx



  if (localStorage.login) {
      const data = {
        ...productDetails,
        user_id: JSON.parse(localStorage.login).data.id,

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
    else {
      Swal.fire("You Have To Login First");
    }

in AddToCartTable 
 useEffect(() => {

        if (localStorage.login) {
            dispatch(getAllProductsFromAddToCart(JSON.parse(localStorage.login).data.id))
        }
    }, localStorage.login ? [JSON.parse(localStorage.login).data.id] : [])









import React, { useState } from 'react'
import Details from './Details';
import Header from './Header';
import { Route, Routes } from 'react-router-dom';
import Search from './Search';
import Home from './Home';
import AddToCartTable from './AddToCartTable';
import BackToTop from './BackToTop';
import Footer from './Footer';
import useScrollToTop from './ScrollToTop';
import Login from './Login';
import { SignUp } from './SignUp';
import { Forgetpassword } from './Forgetpassword';
import { Valdition } from './Valdition';
import { UpdatePassword } from './UpdatePassword';
import { ProductCategory } from './ProductCategory';
import { Contact } from './Contact';
import { AddProducts } from './dashboard/AddProducts';
import { ProductsDashBoard } from './dashboard/ProductsDashBoard';
import UpdateProducts from './dashboard/UpdateProducts';
import { Navigate } from 'react-router-dom';
import { GetOrders } from './dashboard/GetOrders';
import { PurchasesPage } from './PurchasesPage';
import { UsersPage } from './dashboard/UsersPage';
import { CreateAdmin } from './dashboard/CreateAdmin';
import { ValidateAccount } from './ValidateAccount';
import { EmailCode } from './EmailCode';
import { Profile } from './Profile';
import { Dashboard } from './dashboard/Dashboard';

const App = () => {

  useScrollToTop()
  return (
    <div >


      <Header />

      <BackToTop />

      {
        !localStorage.login ? (
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/details/:id' element={<Details />} />
            <Route path='/search/:name' element={<Search />} />
            <Route path='/addedproducts' element={<AddToCartTable />} />
            <Route path= '/login' element={ <Login />} />
            <Route path="*" element={<Navigate replace to="/" />} />
            <Route path='/register' element={<SignUp />} />
          
            
            <Route path='/category/:id' element={<ProductCategory />} />
            <Route path='/contact' element={<Contact />} />
           
            <Route path='/updateYourPssword/:id' element={<UpdatePassword />} />
            <Route path='/forgetpassword' element={<Forgetpassword />} />
            <Route path='/validation/:id' element={<Valdition />} />
            <Route path="/account"element={<ValidateAccount/>} />
            <Route path="/verificationcode/:id"element={<EmailCode />} />
          </Routes>

        ) : (

          <Routes>
            <Route path="*" element={<Navigate replace to="/" />} />
            <Route path={localStorage.login ? "/purchases" : "/login"} element={localStorage.login ? <PurchasesPage /> : <Login />} />
            <Route path={"/profile"} element={<Profile />} />
            
            <Route path={JSON.parse(localStorage.login).data.admin == true ? "/dashboard/products" : "/"} element={JSON.parse(localStorage.login).data.admin == true ? <ProductsDashBoard /> : <Home />} />
            <Route path={JSON.parse(localStorage.login).data.admin == true ? "/dashboard/addprducts" : "/"} element={JSON.parse(localStorage.login).data.admin == true ? <AddProducts /> : <Home />} />
            <Route path={JSON.parse(localStorage.login).data.admin == true ? "/dashboard/updateproduct/:id" : "/"} element={JSON.parse(localStorage.login).data.admin == true ? <UpdateProducts /> : <Home />} />
            <Route path={JSON.parse(localStorage.login).data.admin == true ? "/dashboard/ordersPage" : "/"} element={JSON.parse(localStorage.login).data.admin == true ? < GetOrders /> : <Navigate replace to="/" />} />
            <Route path={JSON.parse(localStorage.login).data.admin == true ? "/dashboard/usersPage" : "/"} element={JSON.parse(localStorage.login).data.admin == true ? <  UsersPage /> : <Home />} />
            <Route path={JSON.parse(localStorage.login).data.admin == true ? "/dashboard/addAdminUser" : "/"} element={JSON.parse(localStorage.login).data.admin == true ? <CreateAdmin /> : <Home />} />
            <Route path={JSON.parse(localStorage.login).data.admin == true ? "/dashboard/home" : "/"} element={JSON.parse(localStorage.login).data.admin == true ? <Dashboard /> : <Home />} />

            <Route path='/' element={<Home />} />
            <Route path='/details/:id' element={<Details />} />
            
            <Route path='/search/:name' element={<Search />} />
            <Route path='/addedproducts' element={<AddToCartTable />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/category/:id' element={<ProductCategory />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>

        )
      }

      <Footer />


    </div>)
}

export default App

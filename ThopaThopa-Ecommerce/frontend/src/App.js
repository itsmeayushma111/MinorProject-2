// import logo from './logo.svg';
// import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Assets
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
// Website
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import AllProducts from './components/AllProducts';
import ProductDetail from './components/ProductDetail';
import Categories from './components/Categories';
import CategoryProducts from './components/CategoryProducts';
import TagProducts from './components/TagProducts';
import Checkout from './components/Checkout';
import ConfirmOrder from './components/ConfirmOrder';
import OrderSuccess from './components/OrderSuccess';
import OrderFailure from './components/OrderFailure';
// Customer Panel
import Register from './components/Customer/Register';
import Login from './components/Customer/Login';
import CustomerLogout from './components/Customer/CustomerLogout';
import Dashboard from './components/Customer/Dashboard';
import Orders from './components/Customer/Orders';
import Profile from './components/Customer/Profile';
import AddReview from './components/Customer/AddReview';
// Seller Panel
import  SellerRegister from './components/Seller/SellerRegister';
import SellerLogin from './components/Seller/SellerLogin';
import SellerLogout from './components/Seller/SellerLogout';
import SellerDashboard from './components/Seller/SellerDashboard';
import SellerProducts from './components/Seller/SellerProducts';
import VendorOrders from './components/Seller/VendorOrders';
import Customers from './components/Seller/Customers';
import CustomerOrders from './components/Seller/CustomerOrders';
import AddProduct from './components/Seller/AddProduct';
import UpdateProduct from './components/Seller/UpdateProduct';
import VendorProfile from './components/Seller/VendorProfile';

import { CartContext } from './Context';
import {useState} from 'react';
const checkCart=localStorage.getItem('cartData');

function App() {
  const [cartData,setCartData]=useState(JSON.parse(checkCart));
  return (
    <CartContext.Provider value={{cartData,setCartData}}>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/products' element={<AllProducts/>} />
          <Route path='/categories' element={<Categories/>} />
          <Route path='/category/:category_slug/:category_id' element={<CategoryProducts/>} />
          <Route path='/products/:tag' element={<TagProducts/>} />
          <Route path='/product/:product_slug/:product_id' element={<ProductDetail/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/confirm-order' element={<ConfirmOrder/>} />
          <Route path='/order/success' element={<OrderSuccess/>} />
          <Route path='/order/failure' element={<OrderFailure/>} />
          {/* Customer Routes */}
          <Route path='/customer/register' element={<Register/>} />
          <Route path='/customer/login' element={<Login/>} />
          <Route path='/customer/logout' element={<CustomerLogout/>} />
          <Route path='/customer/dashboard' element={<Dashboard/>} />
          <Route path='/customer/orders' element={<Orders/>} />
          <Route path='/customer/profile' element={<Profile/>} />
          <Route path='/customer/add-review/:product_id' element={<AddReview/>} />
          {/* Seller Routes */}
          <Route path='/seller/register' element={<SellerRegister/>} />
          <Route path='/seller/login' element={<SellerLogin/>} />
          <Route path='/seller/logout' element={<SellerLogout/>} />
          <Route path='/seller/dashboard' element={<SellerDashboard/>} />
          <Route path='/seller/products' element={<SellerProducts/>} />
          <Route path='/seller/orders' element={<VendorOrders/>} />
          <Route path='/seller/customers' element={<Customers/>} />
          <Route path='/seller/customer/:customer_id/orderitems/' element={<CustomerOrders/>} />
          <Route path='/seller/add-product' element={<AddProduct/>} />
          <Route path='/seller/update-product/:product_id' element={<UpdateProduct/>} />
          <Route path='/seller/profile' element={<VendorProfile/>} />
        </Routes>
        <Footer/>
    </CartContext.Provider >
  );
}

export default App;





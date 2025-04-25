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
        </Routes>
        <Footer/>
    </CartContext.Provider >
  );
}

export default App;





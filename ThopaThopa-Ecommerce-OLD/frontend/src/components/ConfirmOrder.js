import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../Context';
import { CartContext } from '../Context';

import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api';
function ConfirmOrder(){
    const [ConfirmOrder,SetConfirmOrder]=useState(false);
    const [orderId,SetorderId]=useState('');
    const [PayMethod,SetPayMethod]=useState('');
    const userContext=useContext(UserContext);
    const {cartData,setCartData}=useContext(CartContext);
    if(userContext.login==null){
        window.location.href="/customer/login"
    }else{
        if(ConfirmOrder==false){
            addOrderInTable();
        }
        
    }

    function addOrderInTable(){


        const customerId=(localStorage.getItem("customer_id"));
        const formData=new FormData();
        formData.append('customer',customerId);

        //submit dta
        axios.post(baseUrl+'/orders/',formData)
        .then(function (response){
            console.log(response.data.id);
            var orderId=response.data.id;
            SetorderId(orderId);
            orderItems(orderId);
            SetConfirmOrder(true);
        })
        .catch(function (error){
            console.log(error);
        });
    }

    function orderItems(orderId){
        var previousCart=localStorage.getItem('cartData');
        var cartJson=JSON.parse(previousCart);

        if(cartJson!=null){
            cartJson.map((cart,index)=>{
                const formData=new FormData();
                formData.append('order',orderId);
                formData.append('product',cart.product.id);
                formData.append('qty',1);
                formData.append('price',cart.product.price);
                //submit dta
                axios.post(baseUrl+'/orderitems/',formData)
                .then(function (response){
                    //remove cart local storage baata
                    cartJson.splice(index,1);
                    localStorage.setItem('cartData',JSON.stringify(cartJson));
                    setCartData(cartJson);
                })
                .catch(function (error){
                    console.log(error);
                });
            });
        }
    }

    function changePaymentMethod(payMethod){
        SetPayMethod(payMethod);
    }
    function PayNowButton(){
        if(PayMethod!=''){
            changePaymentMethod(PayMethod);
        }else{
            alert('Select Payment Method!!');
        }
    }
    return(
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-6 offset-3'>
                    <div className='card py-3 text-center'>
                    <h5><i className="fa fa-check-circle text-success"></i>Your Order has been confirmed</h5>
                    <p>ORDER ID:{orderId}</p>
                    </div>
                    <div className='card p-3 mt-4'>
                        <form>
                            <div className='form-group'>
                                <label>
                                    <input type="radio" onChange={()=>changePaymentMethod('esewa')} name='payMethod'/> Esewa
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>
                                    <input type="radio" onChange={()=>changePaymentMethod('cod')} name='payMethod'/> Cash On Delivery
                                </label>
                            </div>
                            <button type='button' onClick={PayNowButton} className='btn btn-sm btn-success mt-3'>Next</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ConfirmOrder;
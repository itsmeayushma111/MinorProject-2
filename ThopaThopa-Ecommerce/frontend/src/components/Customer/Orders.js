//Packages
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
//Assets
import logo from '../../logo.svg';
import Sidebar from './Sidebar'
function Orders(){
    const baseUrl = 'http://127.0.0.1:8000/api/'; 
    const customerId=localStorage.getItem('customer_id');
    const [OrderItems,setOrderItems]=useState([]);
    useEffect(() => {
        fetchData(baseUrl+'customer/'+customerId+'/orderitems');
    }, []);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setOrderItems(data.results);
        });
    }


    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar/>
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='row'>
                        <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {
                                    OrderItems.map((item,index)=>{
                                        return <tr>
                                            <td>{index+1}</td>
                                            <td>
                                                <Link to={`product/${item.product.slug}/${item.product.id}`}>
                                                <img src={item.product.image} className="img-thumbnail" width="80" alt="..." />
                                                </Link>
                                                <p><Link to={`product/${item.product.slug}/${item.product.id}`}>{item.product.title}</Link></p>
                                            </td>
                                            <td>Rs. {item.product.price}</td>
                                            <td>
                                                <span>
                                                    {
                                                        item.order.order_status==true && <i className='fa fa-check-circle text-success'></i>
                                                    }
                                                    {
                                                        !item.order.order_status && <i className='fa fa-spinner fa-spin text-dark'></i>
                                                    }
                                                </span>
                                            </td>
                                            <td>
                                                {
                                                    item.order.order_status==true && <Link className="btn btn-primary btn-sm" to={`/customer/add-review/${item.product.id}`}>Add Review</Link>
                                                }
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;
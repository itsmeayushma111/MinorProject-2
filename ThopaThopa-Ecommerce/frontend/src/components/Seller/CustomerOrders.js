//Packages
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//Assets
import SellerSidebar from './SellerSidebar'
const baseUrl = 'http://127.0.0.1:8000/api/';
function CustomerOrders(){
    const {customer_id}=useParams();
    const vendor_id=localStorage.getItem('vendor_id');
    const [OrderItems,setOrderItems]=useState([]);

    useEffect(() => {
        fetchData(`${baseUrl}vendor/${vendor_id}/customer/${customer_id}/orderitems/`);
    },[]);
        
    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setOrderItems(data.results);
        })
    }

    function changeOrderStatus(order_id,status){
        fetch(baseUrl+'order-modify/'+order_id+'/',{
            method:"PATCH",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({order_status:status})
        })
        .then(function(response){
            if(response.status===200){
                fetchData(`${baseUrl}vendor/${vendor_id}/customer/${customer_id}/orderitems/`);
            }
        });
    }

    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <SellerSidebar/>
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='row'>
                        <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <th>#</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                {
                                    OrderItems.map((item,index)=>
                                    <tr>
                                    <td>{index+1}</td>
                                    <td>
                                        <Link>
                                        <img src={item.product.image} className="img-thumbnail" width="80" alt="..." />
                                        </Link>
                                        <p><Link>{item.product.title}</Link></p>
                                    </td>
                                    <td>Rs. {item.product.price}</td>
                                    <td>
                                        {
                                            item.order.order_status && <span className='text-success'><i className='fa fa-check-circle'></i> Completed</span>
                                        }
                                        {
                                            !item.order.order_status && <span className='text-warning'><i className='fa fa-spinner'></i> Pending</span>
                                        }
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                                <button className="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Change Status
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                     {
                                                        !item.order.order_status && <a className="dropdown-item" onClick={()=>changeOrderStatus(item.order.id,true)} href="#"> Complete</a>
                                                     }
                                                     {
                                                        item.order.order_status && <a className="dropdown-item" onClick={()=>changeOrderStatus(item.order.id,false)} href="#"> Pending</a>
                                                     }
                                                    </li>
                                                </ul>
                                        </div>
                                    </td>
                                </tr>)
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

export default CustomerOrders;
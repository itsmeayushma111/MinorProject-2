import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SellerSidebar from './SellerSidebar'
const baseUrl = 'http://127.0.0.1:8000/api/';
function Customers(){
    const vendor_id=localStorage.getItem('vendor_id');
        const [CustomerList,setCustomerList]=useState([]);
    
        useEffect(() => {
            fetchData(baseUrl+'vendor/'+vendor_id+'/customers/');
        },[vendor_id]);

        function fetchData(baseurl){
            fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setCustomerList(data.results);
            })
        }

        function showConfirm(customer_id){
            var _confirm = window.confirm('⚠️ Are you sure you want to delete all orders from this customer *for this vendor*? This action cannot be undone.');
            if(_confirm){
                fetch(baseUrl+'delete-customer-orders/'+customer_id+'/?vendor_id='+vendor_id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        vendor_id: vendor_id
                    })
                })
                .then((response) => response.json())
                .then((data) => {
                    if(data.bool === true){
                        // Reload customer orders or data
                        fetchData(baseUrl+'vendor/'+vendor_id+'/customers/');
                    } else {
                        alert(data.message || "No orders found to delete.");
                    }
                });
            }
        }
        
        console.log(CustomerList);
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
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    CustomerList.map((item,index)=>
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>
                                            {item.user.username}
                                        </td>
                                        <td>{item.user.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>
                                            <Link to={`/seller/customer/${item.id}/orderitems/`} className='btn btn-primary btn-sm '>Orders</Link>
                                            <button onClick={()=>showConfirm(item.id)} className='btn btn-danger btn-sm ms-1'>Remove from list</button>
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

export default Customers;
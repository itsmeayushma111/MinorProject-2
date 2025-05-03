//Assets
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SellerSidebar from './SellerSidebar'
const baseUrl = 'http://127.0.0.1:8000/api/';
function SellerDashboard(props){
    const[VendorData,setVendorData]=useState({
        'totalProducts': 0,
        'totalOrders' : 0,
        'totalCustomers': 0,
    });
    const vendor_id=localStorage.getItem('vendor_id');
    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setVendorData(data);
        })
    }

    fetchData(baseUrl+'vendor/'+vendor_id+'/dashboard/');
    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <SellerSidebar/>
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='row'>
                        <div className='col-md-4 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Products</h4>
                                    <h4><Link to='/seller/products'>{VendorData.totalProducts}</Link></h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Orders</h4>
                                    <h4><Link to='/seller/orders'>{VendorData.totalOrders}</Link></h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Customers</h4>
                                    <h4><Link to='/seller/customers'>{VendorData.totalCustomers}</Link></h4>
                                </div>
                            </div>
                        </div>
                        {/* <div className='col-md-4 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Addresses</h4>
                                    <h4><a href='#'>5</a></h4>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerDashboard;
//Packages
import { Link } from 'react-router-dom';
//Assets
import logo from '../../logo.svg';
import Sidebar from './Sidebar'
function Orders(){
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
                                <th>#</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <Link>
                                        <img src={logo} className="img-thumbnail" width="80" alt="..." />
                                        </Link>
                                        <Link>
                                        <p>Necklace</p>
                                        </Link>
                                    </td>
                                    <td>Rs. 250</td>
                                    <td><span className='text-success'>Payment Completed</span></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>
                                        <Link>
                                        <img src={logo} className="img-thumbnail" width="80" alt="..." />
                                        </Link>
                                        <Link>
                                        <p>Necklace</p>
                                        </Link>
                                    </td>
                                    <td>Rs. 250</td>
                                    <td><span className='text-warning'>Payment Pending</span></td>
                                    <td><button className='btn btn-primary btn-sm'>Make Paymemt</button></td>
                                </tr>
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
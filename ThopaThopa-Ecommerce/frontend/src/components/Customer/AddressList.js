import Sidebar from './Sidebar'
import { useEffect, useState } from 'react';
import axios from 'axios';

function AddressList(){
    var customer_id=localStorage.getItem('customer_id');
    const baseUrl = 'http://127.0.0.1:8000/api/'; 
    const [successMsg, setSuccessMsg] = useState('');


    const [AddressList,setAddressList]=useState([]);
    useEffect(() => {
        fetchData(`${baseUrl}customer/${customer_id}/address-list/`);

    },[]);
    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setAddressList(data.results);
                
            });
    }
    function DefualtAddressHandler(address_id){
            axios.post(`${baseUrl}mark-default-address/${address_id}/`)
            .then(function (response){
                if(response.data.bool===true){
                    window.location.reload();
                } else {
                    alert("Failed to mark address as default");
                }
                console.log(response.data);
            })
            .catch(function(error){
                console.log(error);
                alert("Something went wrong while setting default address");
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
                    <div className='col-12'>
                    {successMsg && (
                        <div className="alert alert-success" role="alert">
                            {successMsg}
                        </div>
                    )}
                        <Link to="/customer/add-address" className='btn btn-outline-success mb-4 float-end'>
                        <i className='fa fa-plus-circle text-success mb-2'></i>Add address</Link>
                    </div>
                    <div className='row'>
                        {
                            AddressList.map((address,index)=>{
                                return  <div className='col-4 mb-4'>
                                <div className='card'>
                                        <div className='card-body text-muted'>
                                            <h6>
                                                {
                                                address.default_address ==true && <span><i className='fa fa-check-circle text-success mb-2'></i><br/></span>
                                                }
                                                {
                                                !address.default_address && <span onClick={()=>DefualtAddressHandler(address.id)} role='button'><i className='far fa-check-circle text-secondary mb-2'></i><br/></span>
                                                }
                                                <Link to={`/customer/update-address/${address.id}`}>{address.address}</Link>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            })  
                        }     
                </div>
            </div>
        </div> 
    </div>
    </div>
    
    );
}

export default AddressList;
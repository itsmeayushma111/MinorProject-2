import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useParams } from "react-router-dom"; 

function UpdateAddress() {
    const baseUrl = 'http://127.0.0.1:8000/api/'; 
    const { address_id } = useParams();
    var customer_id=localStorage.getItem('customer_id');
    const [ErrorMsg,setErrorMsg]=useState('');
    const [SuccessMsg,setSuccessMsg]=useState('');
    const [AddressFormData,setAddressFormData]=useState(
        {
            'address':'',
            'customer':customer_id
        }
    );

    useEffect(() => {
        fetchData(baseUrl+'address/'+address_id);
    },[]);
    function fetchData(baseurl) { 
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setAddressFormData({
                    'address':data.address,
                    'customer': data.customer,
                });
                
            });
    }

    const inputHandler = (event) =>{
        setAddressFormData({
            ...AddressFormData,
            [event.target.name]:event.target.value

        });
    };


    const submitHandler = async (event) => {
        event.preventDefault();  // Prevents page reload
    
        const formData = {
            address: AddressFormData.address,
            customer: AddressFormData.customer,
        };
    
        //submit data
        axios.put(baseUrl+'address/'+address_id+'/',formData)
        .then(function (response){
            if(response.status!=200){
                setErrorMsg('Data not saved');
                setSuccessMsg('');
            }else{
                setErrorMsg('');
                setSuccessMsg('Data saved');
            }
        })
        .catch(function(error){
            console.log(error);
        });
    };

    const disableBtn=(AddressFormData.address=='');
return (
    <div className="container mt-4">
        <div className="row">
            <div className="col-md-3 col-12 mb-2">
                <Sidebar />
            </div>
            <div className="col-md-9 col-12 mb-2">
                <div className="card">
                    <h4 className="card-header">Update Address</h4>
                    <div className="card-body">
                        {ErrorMsg && <p className='alert alert-danger'>{ErrorMsg}</p>}
                        {SuccessMsg && <p className='alert alert-success'>{SuccessMsg}</p>}
                        <form onSubmit={submitHandler}>
                            <div className="mb-3">
                                <label for="address" className="form-label">Address</label>
                                <textarea className="form-control" onChange={inputHandler} value={AddressFormData.address} name='address' id="address" ></textarea>
                            </div>
                            <button type="submit" disabled={disableBtn} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}


export default UpdateAddress;
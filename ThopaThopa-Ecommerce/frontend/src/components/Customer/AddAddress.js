import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

function AddAddress() {
    const baseUrl = 'http://127.0.0.1:8000/api/'; 
    var customer_id=localStorage.getItem('customer_id');
    const [ErrorMsg,setErrorMsg]=useState('');
    const [SuccessMsg,setSuccessMsg]=useState('');
    const [AddressFormData,setAddressFormData]=useState(
        {
            'address':'',
            'customer':customer_id
        }
    );

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
        axios.post(baseUrl+'address/',formData)
        .then(function (response){
            if(response.status!=201){
                setErrorMsg('Data not saved');
                setSuccessMsg('');
            }else{
                setErrorMsg('');
                setSuccessMsg('Data saved');
                setAddressFormData({
                    address:''
                })
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
                    <h4 className="card-header">Add Address</h4>
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


export default AddAddress;
import axios  from "axios";
import { useState } from "react";
function SellerRegister(props){

        const baseUrl='http://127.0.0.1:8000/api/';  // Update if needed
        const [formError, setFormError] = useState(false);
        const [errorMsg, setErrorMsg] = useState('');
        const [successMsg, setsuccessMsg] = useState('');
    
        const [registerFormData, setRegisterFormData] = useState({
            "first_name": '',
            "last_name":'',
            'username':'',
            "email":'',
            "mobile": '',
            "address": '',
            "password": '',
        });
        const inputHandler = (event) => {
            setRegisterFormData({
                ...registerFormData,
                [event.target.name]: event.target.value
            });
        };
        const submitHandler = async (event) => {
            event.preventDefault();  // Prevents page reload
        
            const formData = {
                first_name: registerFormData.first_name,
                last_name: registerFormData.last_name,
                username: registerFormData.username,
                email: registerFormData.email,
                mobile: registerFormData.mobile,
                address: registerFormData.address,
                password: registerFormData.password,
            };
        
            try {
                const response = await axios.post(baseUrl + "vendor/register/", formData, {
                    headers: {
                        "Content-Type": "application/json"  // Ensure JSON request
                    }
                });
        
        
                if (response.data.bool === true){
                    console.log(response.data);
                    setRegisterFormData({
                        "first_name": '',
                        "last_name":'',
                        'username':'',
                        "email":'',
                        "mobile": '',
                        "address": '',
                        "password": '',
                    });
                    setFormError(false);
                    setsuccessMsg(response.data.msg);

    
                } else {
                    setFormError(true);
                    setErrorMsg(response.data.msg); 
                }
            } catch (error) {
                console.error("Reg Error:", error);
                setFormError(true);
            }
        };    
        const buttonEnable = registerFormData.first_name !== '' && registerFormData.last_name !== ''&&  registerFormData.username !== '' && registerFormData.email !== '' && registerFormData.mobile !== '' && registerFormData.address !== '' && registerFormData.password !== '';
    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-8 col-12 offset-2'>
                    <div className='card'>
                        <h4 className='card-header'>Register</h4>
                        <div className='card-body'>
                        <p className="text-muted"><strong>Note:</strong> All fields are required</p>
                            {successMsg && <p className="text-success">{successMsg}</p> } 
                            <form>
                               <div className="mb-3">
                                    <label for="firstName" className="form-label">First Name</label>
                                    <input type="text" onChange={inputHandler} value={registerFormData.first_name} name="first_name" className="form-control" id="firstName"/>
                                </div>
                                <div className="mb-3">
                                    <label for="lastName" className="form-label">Last Name</label>
                                    <input type="text" onChange={inputHandler} value={registerFormData.last_name} name="last_name" className="form-control" id="lastName"/>
                                </div>
                                <div className="mb-3">
                                    <label for="username" className="form-label">Username</label>
                                    <input type="text" onChange={inputHandler} value={registerFormData.username} name="username" className="form-control" id="username"/>
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email address</label>
                                    <input type="email" onChange={inputHandler} value={registerFormData.email} name="email" className="form-control" id="email"/>
                                </div>
                                <div className="mb-3">
                                    <label for="mobile" className="form-label">Mobile</label>
                                    <input type="number" onChange={inputHandler} value={registerFormData.mobile} name="mobile" className="form-control" id="mobile"/>
                                </div>
                                <div className="mb-3">
                                    <label for="address" className="form-label">Address</label>
                                    <textarea onChange={inputHandler} value={registerFormData.password} name="address" className="form-control" id="address"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="pwd" className="form-label">Password</label>
                                    <input type="password" onChange={inputHandler} value={registerFormData.password} name="password" className="form-control" id="pwd"/>
                                </div>
                                <button type="button" disabled={!buttonEnable} onClick={submitHandler} className="btn btn-primary">Submit</button>
                                </form>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    );
}

export default SellerRegister;
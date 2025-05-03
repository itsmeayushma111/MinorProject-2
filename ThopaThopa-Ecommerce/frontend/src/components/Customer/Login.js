import axios from "axios";
import { useState } from "react";

function Login(props){

    const baseUrl='http://127.0.0.1:8000/api/';  // Update if needed
    const [formError, setFormError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [loginFormData, setLoginFormData] = useState({
        "username": '',
        "password": ''
    });

    const inputHandler = (event) => {
        setLoginFormData({
            ...loginFormData,
            [event.target.name]: event.target.value
        });
    };

    const submitHandler = async (event) => {
        event.preventDefault();  // Prevents page reload
    
        const formData = {
            username: loginFormData.username,
            password: loginFormData.password
        };
    
        try {
            const response = await axios.post(baseUrl + "customer/login/", formData, {
                headers: {
                    "Content-Type": "application/json"  // Ensure JSON request
                }
            });
    
            console.log("Login Response:", response.data); // Debugging
    
            if (response.data.bool === true){
                console.log(response.data);
                localStorage.setItem("customer_id", response.data.id);
                localStorage.setItem("customer_login", "true");
                localStorage.setItem("customer_username", response.data.user);
                setFormError(false);
                setErrorMsg("");
    
                alert("Login Successful! Welcome, " + response.data.user);
            } else {
                setFormError(true);
                setErrorMsg(response.data.msg); 
            }
        } catch (error) {
            console.error("Login Error:", error);
            setFormError(true);
            setErrorMsg("Invalid username/password!!");
        }
    };    

    const checkCustomer=(localStorage.getItem("customer_login"));
    if(checkCustomer){
        window.location.href='/customer/dashboard'
     }

    const buttonEnable = loginFormData.username !== '' && loginFormData.password !== '';

    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-8 col-12 offset-2'>
                    <div className='card'>
                        <h4 className='card-header'>Login</h4>
                        <div className='card-body'>
                            {formError &&
                                <p className="text-danger">{errorMsg}</p>
                            }
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" name="username" value={loginFormData.username} onChange={inputHandler} className="form-control" id="username"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pwd" className="form-label">Password</label>
                                    <input type="password" name="password" value={loginFormData.password} onChange={inputHandler} className="form-control" id="pwd"/>
                                </div>
                                <button type="submit" disabled={!buttonEnable} className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>    
                </div>
            </div>
        </div> 
    );
}

export default Login;
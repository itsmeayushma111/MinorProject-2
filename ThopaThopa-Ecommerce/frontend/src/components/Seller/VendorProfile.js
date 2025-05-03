// Packages
import { useState, useEffect } from 'react';
import axios from 'axios';
import SellerSidebar from './SellerSidebar';

function VendorProfile() {
    const baseUrl = 'http://127.0.0.1:8000/api/';  // Update if needed

    const [ProfileData, setProfileData] = useState({
        'user_id': '',
        'first_name': '',
        'last_name': '',
        'username': '',
        'email': '',
        'mobile': '',
        'p_image': '', 
    });

    const vendor_id=localStorage.getItem('vendor_id');
    console.log(vendor_id);

    useEffect(() => {
        fetchData(baseUrl+'vendor/'+vendor_id);
    },[]);

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setProfileData({
                    'user_id': data.user.id,
                    'first_name': data.user.first_name,
                    'last_name': data.user.last_name,
                    'username': data.user.username,
                    'email': data.user.email,
                    'mobile': data.mobile,
                    'address': data.address,
                    'p_image': data.profile_img,
                });
                
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });
    }

    const [previewImage, setPreviewImage] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    const inputHandler = (event) => {
        setProfileData({
            ...ProfileData,
            [event.target.name]: event.target.value
        });
    };

    const handleFileChange = (event) => {
        setProfileData({
            ...ProfileData,
            [event.target.name]: event.target.files[0]
        });
    };

    const submitHandler = async (event) => {
        const formData=new FormData();
        formData.append('user',ProfileData.user_id);
        formData.append('mobile',ProfileData.mobile);
        formData.append('address',ProfileData.address);
        formData.append('profile_image',ProfileData.p_image);
        
        //submit data
        axios.put(baseUrl+'vendor/'+vendor_id+'/',formData,{
            headers: {
                'content-type':'multipart/form-data'
            }
        })
        .then(function (response){
            console.log(response);  
        })
        .catch(function (error) {
            console.log(error);
        })

        //submit data
        const formUserData=new FormData();
        formUserData.append('first_name',ProfileData.first_name);
        formUserData.append('last_name',ProfileData.last_name);
        formUserData.append('username',ProfileData.username);
        formUserData.append('address',ProfileData.address);
        formUserData.append('email',ProfileData.email);

        axios.put(baseUrl+'user/'+ProfileData.user_id+'/',formUserData,)
        .then(function (response){
            console.log(response);  
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-2">
                    <SellerSidebar />
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <h3 className='mb-3'>Welcome <span className='text-primary'>{ProfileData.username}</span></h3>
                    <div className="card">
                        <h4 className="card-header">Update Profile</h4>
                        <div className="card-body">
                            {successMsg && <p className="text-success">{successMsg}</p>}
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="first_name" className="form-label">First Name</label>
                                    <input type="text" name="first_name" value={ProfileData.first_name} onChange={inputHandler} className="form-control" id="first_name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="last_name" className="form-label">Last Name</label>
                                    <input type="text" name="last_name" value={ProfileData.last_name} onChange={inputHandler} className="form-control" id="last_name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" name="username" value={ProfileData.username} onChange={inputHandler} className="form-control" id="username" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name="email" value={ProfileData.email} onChange={inputHandler} className="form-control" id="email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobile" className="form-label">Mobile</label>
                                    <input type="number" name="mobile" value={ProfileData.mobile} onChange={inputHandler} className="form-control" id="mobile" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <textarea name="address" value={ProfileData.address} onChange={inputHandler} className="form-control" id="address" ></textarea>
                                </div>
                                <div className="mb-3">
                                {ProfileData.p_image && (
                                    <p>
                                        <img src={ProfileData.p_image} alt="Profile" width="100" className="mb-2 rounded" />
                                    </p>
                                    )}

                                    <label htmlFor="profileImg" className="form-label">Profile Image</label>
                                    <input type="file" name="p_image" onChange={handleFileChange} className="form-control" id="profileImg" />
                                </div>
                                <button type="button" onClick={submitHandler} className="btn btn-primary">Submit</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorProfile;
import { useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useParams } from "react-router-dom"; 
const baseUrl = 'http://127.0.0.1:8000/api/'; 
function AddReview(){
    const {product_id}= useParams();
    var customer_id=localStorage.getItem('customer_id');
    const [ErrorMsg,setErrorMsg]=useState('');
    const [SuccessMsg,setSuccessMsg]=useState('');

    const [ReviewFormData,setReviewFormData]=useState({
      'reviews':'',
      'rating':1,
    });

    const disableBtn=(ReviewFormData.reviews.trim()=='');

    const inputHandler = (event) => {
      setReviewFormData({
          ...ReviewFormData,
          [event.target.name]:event.target.value
      });
    };
     const submitHandler = async (event) => {
      const formData=new FormData();
      formData.append('reviews',ReviewFormData.reviews);
      formData.append('rating',ReviewFormData.rating);
      formData.append('customer',customer_id);
      formData.append('product',product_id);

      //submit data
      axios.post(baseUrl+'productrating/',formData,)
      .then(function (response){
          if(response.status!=201){
              setErrorMsg('Data not Saved');
              setSuccessMsg('');
          }else{
              setErrorMsg('');
              setSuccessMsg('Data Saved');
              setReviewFormData({
                'reviews':'',
                'rating':'',
              });
            }
              
          })
      
  };
    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar/>
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='card'>
                        <h4 className='card-header'>Add Review</h4>
                        <div className='card-body'>
                        {ErrorMsg && <p className="text-danger">{ErrorMsg}</p> }
                        {SuccessMsg && <p className="text-success">{SuccessMsg}</p> }
                        <div className='mb-3'>
                          <label for="reviews" className="form-label">Review</label>
                          <textarea className="form-control" onChange={inputHandler} value={ReviewFormData.reviews} name='reviews' id="reviews" ></textarea>
                          <div className='mb-3'>
                            <label for="rating" className="form-label">Rating</label>
                            <select className="form-control" name='rating' onChange={inputHandler}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>
                          <button type="submit" disabled={disableBtn} onClick={submitHandler} className="btn btn-primary">Submit</button>
                        </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddReview;
// Packages
import { useState, useEffect } from 'react';
import axios from 'axios';
import SellerSidebar from './SellerSidebar';

function AddProduct() {
    const vendor_id=localStorage.getItem('vendor_id');
    const [ErrorMsg,setErrorMsg]=useState('');
    const [SuccessMsg,setSuccessMsg]=useState('');

    const [CategoryData,setCategoryData]=useState([]);
    const baseUrl = 'http://127.0.0.1:8000/api/';

    const [ProductData, setProductData] = useState({
        'vendor':'',
        'category': '',
        'title': '',
        'slug': '',
        'detail': '',
        'price': '',
        'tags': '',
        'image': '',
    });

    const [ImgUploadErrorMsg,setImgUploadErrorMsg]=useState('');
    const [ImgUploadSuccessMsg,setImgUploadSuccessMsg]=useState('');
    const [ProductImgs,setProductImgs]=useState([]);

    const submitHandler = async (event) => {
        const formData=new FormData();
        formData.append('vendor',ProductData.vendor);
        formData.append('category',ProductData.category);
        formData.append('title',ProductData.title);
        formData.append('slug',ProductData.slug);
        formData.append('detail',ProductData.detail);
        formData.append('price',ProductData.price);
        formData.append('tags',ProductData.tags);
        formData.append('image',ProductData.image);
        //submit data
        axios.post(baseUrl+'products/',formData,{
            headers: {
                'content-type':'multipart/form-data'
            }
        })
        .then(function (response){
            if(response.status==201){
                setProductData({
                    'vendor':'',
                    'category': '',
                    'title': '',
                    'slug': '',
                    'detail': '',
                    'price': '',
                    'tags': '',
                    'image': '',
                });
                setErrorMsg('');
                setSuccessMsg(response.statusText);

                for(let i=0; i<ProductImgs.length; i++){
                    const ImageFormData=new FormData();
                    ImageFormData.append('product',response.data.id);
                    ImageFormData.append('image',ProductImgs[i]);
                    // submit multiple images
                    axios.post(baseUrl+'product-imgs/',ImageFormData,{
                        headers: {
                            'content-type':'multipart/form-data'
                        }
                    })
                    .then(function (response){
                        console.log(response);
                    })
                    .catch(function (error){
                        console.log(error);
                    });

                    // End upload images
                }
                setProductImgs('');
            }else{
                setErrorMsg(response.statusText);
                setSuccessMsg('');
            }
        })
        .catch(function (error){
            console.log(error);
        });
    };

    useEffect(() => {
        setProductData({
            ...ProductData,
            'vendor':vendor_id
        });
        fetchData(baseUrl+'categories/');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setCategoryData(data.results);
        })
    }

    const inputHandler = (event) => {
        setProductData({
            ...ProductData,
            [event.target.name]:event.target.value
        });
    };

    const fileHandler = (event) => {
        setProductData({
            ...ProductData,
            [event.target.name]:event.target.files[0]
        });
    };

    const multipleFilesHandler = (event) => {
        var files=event.target.files;
        if(files.length>0){
            setProductImgs(files);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-2">
                    <SellerSidebar />
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <div className="card">
                        <h4 className="card-header">Add Product</h4>
                        <div className="card-body">
                        {SuccessMsg && <p className="text-success">{SuccessMsg}</p> } 
                        {ErrorMsg && <p className="text-danger">{ErrorMsg}</p> }
                            <form onSubmit={submitHandler}>
                               <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select className='form-control' name='category' onChange={inputHandler}>
                                        {
                                            CategoryData.map((item, index)=><option value={item.id}>{item.title}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" name="title" value={ProductData.title} onChange={inputHandler} className="form-control" id="title" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="slug" className="form-label">Slug</label>
                                    <input type="text" name="slug" value={ProductData.slug} onChange={inputHandler} className="form-control" id="slug" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" name="price" value={ProductData.price} onChange={inputHandler} className="form-control" id="price" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="detail" className="form-label">Detail</label>
                                    <textarea name="detail" value={ProductData.detail} onChange={inputHandler} className="form-control" rows="8" id="detail" ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tags" className="form-label">Tags</label>
                                    <textarea name="tags" value={ProductData.tags} onChange={inputHandler} className="form-control" rows="8" id="tags" ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ProductImg" className="form-label">Featured Image</label>
                                    <input type="file" name="image" onChange={fileHandler} className="form-control" id="ProductImg" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Product_Imgs" className="form-label">Product Images</label>
                                    <input type="file" multiple name="product_imgs" onChange={multipleFilesHandler} className="form-control" id="Product_Imgs" />
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

export default AddProduct;
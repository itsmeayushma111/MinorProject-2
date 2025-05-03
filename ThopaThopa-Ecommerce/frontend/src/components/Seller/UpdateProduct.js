import { useState, useEffect } from 'react';
import axios from 'axios';
import SellerSidebar from './SellerSidebar';
import { useParams } from "react-router-dom";

function UpdateProduct() {
    const {product_id} = useParams();
    const vendor_id=localStorage.getItem('vendor_id');

    const [IsImageDeleted,setIsImageDeleted]=useState(false);

    const [IsFeaturedImageSelected,setIsFeaturedImageSelected]=useState(false);
    const [IsMultipleProductImageSelected,setIsMultipleProductImageSelected]=useState(false);

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
        'product_imgs': '',
    });

    const [ProductImgs,setProductImgs]=useState([]);

    const submitHandler = async (event) => {
        event.preventDefault(); // This was the main missing piece
        
        const formData=new FormData();
        // Append all fields except image first
        formData.append('vendor', ProductData.vendor);
        formData.append('category', ProductData.category);
        formData.append('title', ProductData.title);
        formData.append('slug', ProductData.slug);
        formData.append('detail', ProductData.detail);
        formData.append('price', ProductData.price);
        formData.append('tags', ProductData.tags);

        // Only append image if a new one was selected
        if(IsFeaturedImageSelected && ProductData.image){
            formData.append('image', ProductData.image);
        }

        try {
            const response = await axios.patch(baseUrl+'product/'+product_id+'/', formData, {
                headers: {
                    'content-type':'multipart/form-data'
                }
            });

            if(response.status===200){
                setErrorMsg('');
                setSuccessMsg('Product updated successfully!');
                
                // Refresh the product data
                fetchProductData(baseUrl+'product/'+product_id);

                setProductData({
                    ...response.data,
                    // Preserve existing images if not changed
                    product_imgs: ProductData.product_imgs 
                });

                if(IsMultipleProductImageSelected && ProductImgs.length>0){
                    for(let i=0; i<ProductImgs.length; i++){
                        const ImageFormData=new FormData();
                        ImageFormData.append('product',response.data.id);
                        ImageFormData.append('image',ProductImgs[i]);
                        
                        await axios.post(baseUrl+'product-imgs/?from_update=1',ImageFormData,{
                            headers: {
                                'content-type':'multipart/form-data'
                            }
                        });
                    }
                    fetchProductData(baseUrl+'product/'+product_id);
                }
            }
        } catch (error) {
            console.error('Update error:', error.response?.data);
            setErrorMsg(error.response?.data?.message || 'Failed to update product');
        }
    };

    useEffect(() => {
        setProductData({
            ...ProductData,
            'vendor':vendor_id
        });
        fetchData(baseUrl+'categories/');
        fetchProductData(baseUrl+'product/'+product_id);
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setCategoryData(data.results);
        })
    }

    function deleteImage(image_id) {
        axios.delete(baseUrl+'product-img/'+image_id+'/')
        .then(function(response) {
            if(response.status === 204) {
                // Uttikherai image delete vako dekhaaucha
                setProductData(prev => ({
                    ...prev,
                    product_imgs: prev.product_imgs.filter(img => img.id !== image_id)
                }));
                setSuccessMsg('Image deleted successfully!');
            }
        })
        .catch(function(error) {
            console.log(error);
            setErrorMsg('Failed to delete image');
        });
    }
    function fetchProductData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProductData({
                'vendor': data.vendor,
                'category': data.category,
                'title': data.title,
                'slug': data.slug,
                'detail': data.detail,
                'price': data.price,
                'tags': data.tags,
                'image': data.image,
                'product_imgs': data.product_imgs,
            });
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

        if(event.target.name == 'image'){
            setIsFeaturedImageSelected(true);
        }
    };

    const multipleFilesHandler = (event) => {
        var files=event.target.files;
        if(files.length>0){
            setIsMultipleProductImageSelected(true);
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
                        <h4 className="card-header">Update Product</h4>
                        <div className="card-body">
                        {SuccessMsg && <p className="text-success">{SuccessMsg}</p> } 
                        {ErrorMsg && <p className="text-danger">{ErrorMsg}</p> }
                            <form onSubmit={submitHandler}> {/* Changed to onSubmit */}
                               <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select className='form-control' name='category' onChange={inputHandler}>
                                        {
                                            CategoryData.map((item, index)=><option selected={item.id==ProductData.category} value={item.id}>{item.title}</option>)
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
                                    {
                                        ProductData.image && <img src={ProductData.image} className='img rounded border mt-2' width="200"/>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="product_Imgs" className="form-label">Product Images</label>
                                    <input type="file" multiple name="product_imgs" onChange={multipleFilesHandler} className="form-control mb-3" id="product_Imgs" />
                                    <div className="d-flex flex-wrap">
                                        {ProductData.product_imgs && ProductData.product_imgs.map((img, index) => (
                                            <div key={img.id} className="position-relative me-3 mb-3" style={{ width: '200px' }}>
                                                <img 
                                                    src={img.image} 
                                                    className="img-fluid rounded border" 
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                />
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteImage(img.id);
                                                    }}
                                                    className="btn btn-danger position-absolute top-0 end-0 m-1 p-1"
                                                    style={{ width: '30px', height: '30px' }}
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button> {/* Changed to type="submit" */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles ={
    'deleteBtn':{
        'position':'absolute'
    }
}
export default UpdateProduct;
//Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
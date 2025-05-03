import { Link } from 'react-router-dom';
import Testimonial from './Testimonial';
import logo from '../logo.svg';

import SingleProduct from './SingleProduct';
import { useState, useEffect } from 'react';
function Home(){
    const baseUrl='http://127.0.0.1:8000/api/';
    const [Products,setProducts]=useState([])
    const [ReviewList,setReviewList]=useState([]);
    useEffect(() => {
        fetchData(baseUrl+'products/?fetch_limit=4');
        fetchTestimonialData(baseUrl+'productrating/');
        },[]);
    
    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProducts(data.results);
        });
    }
    function fetchTestimonialData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setReviewList(data.results);
                
            });
    }
        
    
    return(
    // Main Content
    <main className="container">
        <div className="container mt-5">
            <h1>Welcome to ThopaThopa</h1>
            <p>Supporting local dreams, one small business at a time! 💛</p>
        </div>

        {/* Latest Products Section */}
        <div className="container mt-5">
            <h3 className="text-center mb-4">Latest Products <Link to="/products" className='float-end btn btn-light m-2'>View All Products <i className="fa-solid fa-arrow-right-long"></i></Link></h3>
            <div className="row mt-4">
                    {
                        Products.map((product)=><SingleProduct product={product}/>)
                    }
            </div>
        </div>
        {/* End Latest Products */}

        {/* Popular Categories Section */}
        <div className="container mt-5">
            <h3 className="text-center mb-4">Popular Categories <a href='#' className='float-end btn btn-light m-2'>View All Categories <i className="fa-solid fa-arrow-right-long"></i></a></h3>
            <div className="row mb-4">
            {/* Category Box */}
            <div className="col-12 col-md-3 mb-4">
                <div className="card shadow">
                <img src={logo} className="card-img-top" alt="Category" />
                <div className="card-body">
                    <h4 className="card-title">Category Title</h4>
                </div>
                <div className='card-footer'>
                    <p>Products Sold: 120</p>
                </div>
                </div>
            </div>
            {/* Category Box End */}
            {/* Category Box */}
            <div className="col-12 col-md-3 mb-4">
                <div className="card shadow">
                <img src={logo} className="card-img-top" alt="Category" />
                <div className="card-body">
                    <h4 className="card-title">Category Title</h4>
                </div>
                <div className='card-footer'>
                    <p>Products Sold: 120</p>
                </div>
                </div>
            </div>
            {/* Category Box End */}
            {/* Category Box */}
            <div className="col-12 col-md-3 mb-4">
                <div className="card shadow">
                <img src={logo} className="card-img-top" alt="Category" />
                <div className="card-body">
                    <h4 className="card-title">Category Title</h4>
                </div>
                <div className='card-footer'>
                    <p>Products Sold: 120</p>
                </div>
                </div>
            </div>
            {/* Category Box End */}
            {/* Category Box */}
            <div className="col-12 col-md-3 mb-4">
                <div className="card shadow">
                <img src={logo} className="card-img-top" alt="Category" />
                <div className="card-body">
                    <h4 className="card-title">Category Title</h4>
                </div>
                <div className='card-footer'>
                    <p>Products Sold: 120</p>
                </div>
                </div>
            </div>
            {/* Category Box End */}
            </div>
        </div>
        {/* End Popular Categories */}

        {/* Popular Products Section */}
        <div className="container mt-5">
            <h3 className="text-center mb-4">Popular Products <a href='#' className='float-end btn btn-light m-2'>View All Products <i className="fa-solid fa-arrow-right-long"></i></a></h3>
            <div className="row mt-4">
            {/* Product Box */}
            <div className="col-12 col-md-3 mb-4">
                <div className="card shadow">
                <img src={logo} className="card-img-top" alt="Popular Product" />
                <div className="card-body">
                    <h4 className="card-title">Product Title</h4>
                    <h5 className='card-title text-muted'>Rs. 700</h5>
                </div>
                <div className='card-footer'>
                    <button title='Add to Cart' className='btn btn-success btn-sm'><i className="fa-solid fa-cart-shopping"></i></button>
                    <button title='Add to Wishlist' className='btn btn-danger btn-sm ms-1'><i className="fa fa-heart"></i></button>
                </div>
                </div>
            </div>
            {/* Product Box End */}
            {/* Product Box */}
            <div className="col-12 col-md-3 mb-4">
                <div className="card shadow">
                <img src={logo} className="card-img-top" alt="Popular Product" />
                <div className="card-body">
                    <h4 className="card-title">Product Title</h4>
                    <h5 className='card-title text-muted'>Rs. 700</h5>
                </div>
                <div className='card-footer'>
                    <button title='Add to Cart' className='btn btn-success btn-sm'><i className="fa-solid fa-cart-shopping"></i></button>
                    <button title='Add to Wishlist' className='btn btn-danger btn-sm ms-1'><i className="fa fa-heart"></i></button>
                </div>
                </div>
            </div>
            {/* Product Box End */}
            {/* Product Box */}
            <div className="col-12 col-md-3 mb-4">
                <div className="card shadow">
                <img src={logo} className="card-img-top" alt="Popular Product" />
                <div className="card-body">
                    <h4 className="card-title">Product Title</h4>
                    <h5 className='card-title text-muted'>Rs. 700</h5>
                </div>
                <div className='card-footer'>
                    <button title='Add to Cart' className='btn btn-success btn-sm'><i className="fa-solid fa-cart-shopping"></i></button>
                    <button title='Add to Wishlist' className='btn btn-danger btn-sm ms-1'><i className="fa fa-heart"></i></button>
                </div>
                </div>
            </div>
            {/* Product Box End */}
            {/* Product Box */}
            <div className="col-12 col-md-3 mb-4">
                <div className="card shadow">
                <img src={logo} className="card-img-top" alt="Popular Product" />
                <div className="card-body">
                    <h4 className="card-title">Product Title</h4>
                    <h5 className='card-title text-muted'>Rs. 700</h5>
                </div>
                <div className='card-footer'>
                    <button title='Add to Cart' className='btn btn-success btn-sm'><i className="fa-solid fa-cart-shopping"></i></button>
                    <button title='Add to Wishlist' className='btn btn-danger btn-sm ms-1'><i className="fa fa-heart"></i></button>
                </div>
                </div>
            </div>
            {/* Product Box End */}
            </div>
        </div>
        {/* End Popular Products */}

        {/* Popular Sellers Section */}
        <div className="container mt-5">
            <h3 className="text-center mb-4">Popular Sellers <a href='#' className='float-end btn btn-light m-2'>View All Sellers <i className="fa-solid fa-arrow-right-long"></i></a></h3>
            <div className="row mt-4">
            {/* Seller Box */}
            <div className="col-12 col-md-3 mb-4">
                <div className="card shadow">
                <img src={logo} className="card-img-top" alt="Popular Seller" />
                <div className="card-body">
                    <h4 className="card-title">Seller Name</h4>
                </div>
                <div className='card-footer'>
                    {/* Products in Footer to access specific seller's products */}
                    Products: <a href='#'>Product1</a>,<a href='#'>Product2</a>
                </div>
                </div>
            </div>
            {/* Seller Box End */}
            {/* Seller Box */}
            <div className="col-12 col-md-3 mb-4">
                <div className="card shadow">
                <img src={logo} className="card-img-top" alt="Popular Seller" />
                <div className="card-body">
                    <h4 className="card-title">Seller Name</h4>
                </div>
                <div className='card-footer'>
                    {/* Products in Footer to access specific seller's products */}
                    Products: <a href='#'>Product1</a>,<a href='#'>Product2</a>
                </div>
                </div>
            </div>
            {/* Seller Box End */}
            {/* Seller Box */}
            <div className="col-12 col-md-3 mb-4">
                <div className="card shadow">
                <img src={logo} className="card-img-top" alt="Popular Seller" />
                <div className="card-body">
                    <h4 className="card-title">Seller Name</h4>
                </div>
                <div className='card-footer'>
                    {/* Products in Footer to access specific seller's products */}
                    Products: <a href='#'>Product1</a>,<a href='#'>Product2</a>
                </div>
                </div>
            </div>
            {/* Seller Box End */}
            {/* Seller Box */}
            <div className="col-12 col-md-3 mb-4">
                <div className="card shadow">
                <img src={logo} className="card-img-top" alt="Popular Seller" />
                <div className="card-body">
                    <h4 className="card-title">Seller Name</h4>
                </div>
                <div className='card-footer'>
                    {/* Products in Footer to access specific seller's products */}
                    Products: <a href='#'>Product1</a>,<a href='#'>Product2</a>
                </div>
                </div>
            </div>
            {/* Seller Box End */}
            </div>
        </div>
        {/* End Popular Sellers */}
        {/* Rating and Reviews */}
        <div id="carouselExampleIndicators" className="carousel slide my-4 border p-5" data-bs-ride="carousel" style={{ backgroundColor: '#A2D9F7' }}>
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                {
                    ReviewList.map((item,index)=> <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} class="active" aria-current="true" aria-label={index}></button>)
                }
            </div>
            <div className="carousel-inner">
                {
                    ReviewList.map((item,index)=> <Testimonial index={index} item={item}/>)
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
            </button>
        </div>
        {/* End Rating and Reviews */}
        </main>
    );
}

export default Home;
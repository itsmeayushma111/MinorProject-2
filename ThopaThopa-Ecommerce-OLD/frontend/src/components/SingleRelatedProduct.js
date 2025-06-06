//Packages
import { Link } from 'react-router-dom';
//Assets
import logo from '../logo.svg';
function SingleRelatedProduct(props){
     // Check if props.product exists
     if (!props.product) {
        return <div>Loading...</div>; // Show loading message if product data is not available
    }
    const productUrl = `/product/${props.product.slug}/${props.product.id}`;
    return(
        // Product Box
        <div className="">
            <div className="card shadow border rounded">
            <Link to={productUrl}>
                <img src={props.product.image} className="card-img-top p-2 rounded" alt="Product" style={{ height: '220px', objectFit: 'cover' }} />
            </Link>
            <div className="card-body text-center">
                <h5 className="card-title font-weight-bold">
                <Link to={productUrl}>
                   {props.product.title}
                </Link>
                </h5>
                <h5 className='card-title text-muted'>Price: Rs. {props.product.price}</h5>
            </div>
            <div className='card-footer'>
                <button title='Add to Cart' className='btn btn-success btn-sm'><i className="fa-solid fa-cart-shopping"></i></button>
                <button title='Add to Wishlist' className='btn btn-danger btn-sm ms-1'><i className="fa fa-heart"></i></button>
            </div>
            </div>
        </div>
        // Product Box End 
    );
}

export default SingleRelatedProduct;
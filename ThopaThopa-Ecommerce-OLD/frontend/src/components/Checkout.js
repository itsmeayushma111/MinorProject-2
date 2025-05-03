import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { useContext, useState } from 'react';
import { CartContext } from '../Context';

function Checkout(props) {
    const { cartData, setCartData } = useContext(CartContext);
    const safeCartData = cartData || []; // fallback for null cartData
    const [cartButtonClickStatus, setcartButtonClickStatus] = useState(false);
    const [productData, setproductData] = useState([]);

    const cartItems = safeCartData.length;

    let sum = 0;
    safeCartData.forEach((item) => {
        sum += parseFloat(item.product.price);
    });

    const cartRemoveButtonHandler = (product_id) => {
        let previousCart = localStorage.getItem('cartData');
        let cartJson = JSON.parse(previousCart) || [];

        cartJson = cartJson.filter(cart => cart && cart.product.id !== product_id);

        localStorage.setItem('cartData', JSON.stringify(cartJson));
        setcartButtonClickStatus(false);
        setCartData(cartJson);
    };

    return (
        <div className='container mt-4'>
            <h3 className="text-center mb-4">All Items ({cartItems})</h3>
            {cartItems !== 0 &&
                <div className='row'>
                    <div className='col-md-8 col-12'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {safeCartData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Link>
                                                    <img src={item.product.image} className="img-thumbnail" width="80" alt={item.product.title} />
                                                </Link>
                                                <p>
                                                    <Link>
                                                        {item.product.title}
                                                    </Link>
                                                </p>
                                            </td>
                                            <td>Rs. {item.product.price}</td>
                                            <td>
                                                <button
                                                    title='Remove from Cart'
                                                    type='button'
                                                    onClick={() => cartRemoveButtonHandler(item.product.id)}
                                                    className='btn btn-warning'
                                                >
                                                    <i className="fa-solid fa-cart-shopping"></i> Remove from Cart
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th>Total</th>
                                        <th>Rs. {sum}</th>
                                    </tr>
                                    <tr>
                                        <td colSpan='3' align='center'>
                                            <Link to="/categories" className='btn btn-secondary'>Continue Shopping</Link>
                                            <Link to="/confirm-order" className='btn btn-success ms-1'>Proceed to Payment</Link>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            }
            {cartItems === 0 &&
                <Link to="/categories" className='btn btn-success'>Home</Link>
            }
        </div>
    );
}

export default Checkout;

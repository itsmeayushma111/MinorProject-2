import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import SingleRelatedProduct from './SingleRelatedProduct';
import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { UserContext, CartContext } from '../Context';

function ProductDetail() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [productData, setProductData] = useState([]);
    const [productImgs, setProductImgs] = useState([]);
    const [productTags, setProductTags] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { product_slug, product_id } = useParams();
    const [cartButtonClickStatus, setCartButtonClickStatus] = useState(false);
    const { cartData, setCartData } = useContext(CartContext);

    useEffect(() => {
        fetchData(`${baseUrl}/product/${product_id}`);
        fetchRelatedData(`${baseUrl}/related-products/${product_id}`);
        checkProductInCart(product_id); // Check if product is already in cart
    }, [product_id]);

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                console.log("API Response:", data);
                console.log("Product Images:", data.product_imgs);
                setProductData(data);
                setProductImgs(data.product_imgs || []);
                setProductTags(data.tag_list);
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });
    }

    function fetchRelatedData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                console.log("Related Products API Response:", data);
                setRelatedProducts(data.results);
            })
            .catch((error) => {
                console.error("Error fetching related products:", error);
            });
    }

    function checkProductInCart(product_id) {
        const cart = JSON.parse(localStorage.getItem('cartData')) || [];
        const isProductInCart = cart.some(cartItem => cartItem.product.id === product_id);
        setCartButtonClickStatus(isProductInCart); // Update button status based on cart presence
    }

    function chunkArray(array, chunkSize) {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }

    // Chunks of 4 related products
    const groupedRelatedProducts = chunkArray(relatedProducts, 4);

    const cartAddButtonHandler = () => {
        let previousCart = localStorage.getItem('cartData');
        let cartJson = JSON.parse(previousCart) || [];
        const newCartItem = {
            product: {
                id: productData.id,
                title: productData.title,
                price: productData.price,
                image: productData.image,
            },
            user: {
                id: 1
            }
        };

        cartJson.push(newCartItem);
        localStorage.setItem('cartData', JSON.stringify(cartJson));
        setCartData(cartJson);
        setCartButtonClickStatus(true);
    };

    const cartRemoveButtonHandler = () => {
        let previousCart = localStorage.getItem('cartData');
        let cartJson = JSON.parse(previousCart) || [];
        cartJson = cartJson.filter(cartItem => cartItem.product.id !== productData.id); // Remove product
        localStorage.setItem('cartData', JSON.stringify(cartJson));
        setCartData(cartJson);
        setCartButtonClickStatus(false);
    };

    const tagsLinks = productTags.map((tag, index) => (
        <Link key={index} className='badge bg-secondary text-white me-1' to={`/products/${tag.trim()}`}>
            {tag.trim()}
        </Link>
    ));

    return (
        <section className="container mt-4">
            <div className="row">
                <div className="col-4">
                    <div id="productThumbnailSlider" className="carousel carousel-dark slide carousel-fade" data-bs-ride="true">
                        <div className="carousel-indicators">
                            {productImgs.map((img, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    data-bs-target="#productThumbnailSlider"
                                    data-bs-slide-to={index}
                                    className={index === 0 ? 'active' : ''}
                                    aria-current={index === 0}
                                    aria-label={`Slide ${index + 1}`}
                                ></button>
                            ))}
                        </div>
                        <div className="carousel-inner">
                            {productImgs.map((img, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <img src={img.image} className="img-thumbnail mb-5" alt={index} />
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#productThumbnailSlider" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#productThumbnailSlider" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-8">
                    <h1>{productData.title}</h1>
                    <p>{productData.detail}</p>
                    <h5 className='card-title'>Price: Rs. {productData.price}</h5>
                    <p className='mt-3'>
                        {!cartButtonClickStatus &&
                            <button title='Add to Cart' type='button' onClick={cartAddButtonHandler} className='btn btn-success'>
                                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                            </button>
                        }
                        {cartButtonClickStatus &&
                            <button title='Remove from Cart' type='button' onClick={cartRemoveButtonHandler} className='btn btn-warning'>
                                <i className="fa-solid fa-cart-shopping"></i> Remove from Cart
                            </button>
                        }
                        <button title='Buy Now' className='btn btn-warning ms-1'>
                            <i className="fa-solid fa-bag-shopping"></i> Buy Now
                        </button>
                        <button title='Add to Wishlist' className='btn btn-danger ms-1'>
                            <i className="fa fa-heart"></i> Wishlist
                        </button>
                    </p>
                    <hr />
                    <div className='producttags mt-4'>
                        <h5>Tags</h5>
                        <p>{tagsLinks}</p>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <h3 className="mt-5 mb-3 text-center">Related Products</h3>
            <div id="relatedProductsSlider" className="carousel carousel-dark slide bg-light" data-bs-ride="true">
                <div className="carousel-indicators">
                    {groupedRelatedProducts.map((group, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#relatedProductsSlider"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0 ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner ms-3">
                    {groupedRelatedProducts.map((group, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <div className="row row-cols-1 row-cols-md-4 g-3">
                                {group.map((product) => (
                                    <div className="col" key={product.id}>
                                        <SingleRelatedProduct product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* End Related Products */}
        </section>
    );
}

export default ProductDetail;

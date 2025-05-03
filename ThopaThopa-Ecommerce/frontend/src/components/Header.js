import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext, CartContext } from '../Context';

function Header(props) {
  const userContext = useContext(UserContext);
  const { cartData, setcartData } = useContext(CartContext);

  // Read vendor login info correctly
  const checkVendor = localStorage.getItem("vendor_login") === "true";  // Force boolean

  // Cart items length
  const cartItems = cartData ? cartData.length : 0;

  return (
    <div className="container pb-5">
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#5DADE2', zIndex: 1000 }}>
        <div className="container">
          <Link className="navbar-brand text-white" to="/">ThopaThopa</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/categories">Categories</Link>
              </li>

              {/* My Account dropdown for customers */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  My Account
                </a>
                <ul className="dropdown-menu">
                  {!userContext.login && (
                    <>
                      <li><Link className="dropdown-item" to="/customer/register">Register</Link></li>
                      <li><Link className="dropdown-item" to="/customer/login">Login</Link></li>
                    </>
                  )}
                  {userContext.login && (
                    <>
                      <li><Link className="dropdown-item" to="/customer/dashboard">Dashboard</Link></li>
                      <li><Link className="dropdown-item" to="/customer/logout">Logout</Link></li>
                    </>
                  )}
                </ul>
              </li>

              {/* Vendor Panel dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Vendor Panel
                </a>
                <ul className="dropdown-menu">
                  {!checkVendor && (
                    <>
                      <li><Link className="dropdown-item" to="/seller/register">Register</Link></li>
                      <li><Link className="dropdown-item" to="/seller/login">Login</Link></li>
                    </>
                  )}
                  {checkVendor && (
                    <>
                      <li><Link className="dropdown-item" to="/seller/dashboard">Dashboard</Link></li>
                      <li><Link className="dropdown-item" to="/seller/logout">Logout</Link></li>
                    </>
                  )}
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/checkout">New Orders ({cartItems})</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/checkout">My Cart ({cartItems})</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
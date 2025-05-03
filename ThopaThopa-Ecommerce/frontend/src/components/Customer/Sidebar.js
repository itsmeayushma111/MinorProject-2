import { Link } from 'react-router-dom';
function Sidebar(){
    return(
        <div className="list-group">
            <Link to="/customer/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
            <Link to="/customer/orders"  className="list-group-item list-group-item-action">Orders</Link>
            <a href="#" className="list-group-item list-group-item-action">Wishlist</a>
            <Link to="/customer/profile"  className="list-group-item list-group-item-action">Profile</Link>
            {/* <a href="#" className="list-group-item list-group-item-action">Adresses</a> */}
            <a href="#" className="list-group-item list-group-item-action text-danger">Logout</a>
            </div>
    );
}

export default Sidebar;
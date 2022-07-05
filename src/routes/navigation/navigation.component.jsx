import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import './navigation.styles.scss';

const Navigation = () =>{
    return(
        <Fragment>
        <div className="navigation">
            <Link to="/" className="logo-container"><CrwnLogo /></Link>
            <div className="nav-links-container">
                <Link to="/shop" className="nav-link">Shop</Link>
                <Link to="/auth" className="nav-link">SignIn</Link>
            </div>
        </div>
        <Outlet />
        </Fragment>
    )
}

export default Navigation;
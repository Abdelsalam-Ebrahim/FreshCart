import React from 'react';
// import NavbarCss from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../Images/freshcart-logo.svg";
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContextProvider';
import { CartContext } from '../Context/CartContext';

export default function Navbar() {

    const { numOfCartItems } = useContext(CartContext);

    const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    function clearToken() {
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("cartOwner");

        navigate("/login");
    }

    return <>
        
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
            <div className="container-fluid">
                {/* Logo */}
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Fresh Cart" />
                </Link>

                {/* Responsive */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Links */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    { token ? 
                        //  Links beside the logo
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/products">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/categories">Categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/brands">Brands</Link>
                            </li>
                            <li className="nav-item position-relative">
                                <Link className="nav-link" to="/cart">Cart</Link>
                                <span className="position-absolute start-100 translate-middle badge rounded-pill bg-danger" style={ {top: "5px"} }>
                                    {numOfCartItems ? numOfCartItems : ""} 
                                </span>
                            </li>

                        </ul> : ''
                    }

                    {/* Login - Register - Signout */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        {/* i Tags (Facebook - twitter) */}
                        <li className="nav-item me-3">
                            <ul className='list-unstyled d-flex '>
                                <li>
                                    <Link to="https://github.com/Abdelsalam-Ebrahim">
                                        <i className="ms-3 cursor-pointer fa-brands fa-github"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="https://www.linkedin.com/in/abdelsalamebrahim/">
                                        <i className='ms-3 cursor-pointer fa-brands fa-linkedin'></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="https://www.instagram.com/abdelsalam_ebrahim_/?next=%2F">
                                        <i className='ms-3 cursor-pointer fa-brands fa-instagram'></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="https://www.facebook.com/abdelsalam.ebrahim.56?mibextid=LQQJ4d">
                                        <i className='ms-3 cursor-pointer fa-brands fa-facebook'></i>                                  
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        { token ?
                            // Signout and Profile
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link cursor-pointer" to="/profile">Profile</Link>
                                </li>

                                <li className="nav-item">
                                    <span onClick={ clearToken } className="nav-link cursor-pointer">SignOut</span>
                                </li>
                            </>
                            : 
                            <>
                                {/* Login */}
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                </li>

                                {/* Register */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        }
                    </ul>
                    
                </div>
            </div>
        </nav>

    </>
}

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "./Search";
import Products from "./Products";


const Navbar = () => {
    const state = useSelector((state) => state.handleCart);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Function to handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
        console.log("Search Query:", query); // Debugging
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to=""> ℋ𝒶𝓃𝒹𝒾𝒸𝓇𝒶𝒻𝓉𝓈 🪢</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    
                    {/* Search Component */}
                    <Search onSearch={handleSearch} />
                    
                    <div className="buttons text-center">
    <NavLink to="/login" className="btn btn-custon login"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
    <NavLink to="/register" className="btn btn-custon register"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
    <NavLink to="/cart" className="btn btn-custon cart"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})</NavLink>
    <NavLink to="/Profile" className="btn btn-custon profile"><i className="fa fa-user mr-1"></i> Profile</NavLink>
</div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
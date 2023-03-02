import React from "react";
import CartWidget from "./CartWidget";
import './style.css'
import { Link } from "react-router-dom";
const Navbar = () => {
return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={'/'}>koopstore</Link>
        <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
        <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <Link to={'/product'}>Productos</Link>
            </li>
            <li class="nav-item">
            <Link to={'/contact'}>Contacto</Link>
            </li>
            <CartWidget/>
        </ul>
        </div>
    </nav>
    </>
);
};

export default Navbar;

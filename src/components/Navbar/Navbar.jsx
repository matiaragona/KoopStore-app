import React, { useContext, useState } from "react";
import CartWidget from "./CartWidget";
import './style.css'
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import ModalShow from "../ModalShow/ModalShow";



const Navbar = () => {
    const { cart, getTotal, getTotalQuantity, clearCart } = useContext(CartContext)

    const [isOpen, setIsOpen] = useState(false)

    const {removeFromCart, incrementQuantity, decrementQuantity} = useContext(CartContext)

    const handleMouseEnter = () => {
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        setIsOpen(false)
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
    const handleShow = () => setShow(true);

    
    
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
            <div className="cart-dropdown-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
                <li>
                    
                    <CartWidget/>
                    {cart.length > 0 && (
                <span
                className="badge badge-pill badge-danger ml-1"
                style={{
                    backgroundColor: "black",
                    borderRadius: "50%",
                    padding: "4px 8px",
                    color: "white",
                }}>
                {getTotalQuantity()}
                </span>
            )}
        
        <div className="cart-container">
        
        {isOpen && (
<div className="cart-dropdown row">
    <ul>
    {cart.map(item => (
        <li key={item.id} className="cart-item">
        <div className="product-info">
            <img src={item.imageId} alt={item.title} className="product-image" />
            <div className="product-details">
            <span className="product-title">{item.title}</span>
            <span className="product-price">${item.price}</span>
            </div>
        </div>
        <button onClick={() => removeFromCart(item.id)} className="remove-button">x</button>
        </li>
    ))}
    </ul>
    <div className="cart-total">
    <span className="total-products"><u>Productos Totales:</u>{getTotalQuantity()}</span>
    <span className="total-price"><u>Total a Pagar:</u> ${getTotal()}</span>
    <button onClick={() => clearCart()} className='colorBoton clear-cart'>Vaciar</button>
    <button className="colorBoton" onClick={handleShow}>Pagar</button>
    </div>
</div>
)}

</div>
            
                </li>
            </div>
        </ul>
        </div>
    </nav>
    <ModalShow show={show} handleClose={handleClose}/>
    </>
);
};

export default Navbar;

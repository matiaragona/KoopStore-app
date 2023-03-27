import React, { useState, createContext } from "react";

// Definimos un CartContext y lo exportamos en la misma linea. No es necesario inicializar en blanco las funciones, pero es una buena práctica hacerlo para que los consumidores del contexto puedan conocer las funciones que están disponibles y cómo se deben llamar

export const CartContext = createContext({
  cart: [],
  clearCart: () => {},
  isInCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  getTotalQuantity: () => {},
  getTotal: () => {}
});

const CartProvider = (props) => {

  const [cart, setCart] = useState([]);

  const clearCart = () => {
    setCart([]);
  }

  const isInCart = (id) => {
    return cart.find((item) => item.id === id) ? true : false;
  }

  const addToCart = (item, quantity) => {
    if (isInCart(item.id)) {
      setCart(cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + quantity };
        }
        return cartItem;
      }));
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };
  
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id)
    setCart(newCart);
  };

  const getTotalQuantity = () => {
    let cant = 0
    cart.forEach((e) => cant += e.quantity)
    return cant
  };

  const getTotal = () => {
    let total = 0
    cart.forEach((e) => total += (e.quantity*e.price))
    return total        
  };

  return (
  
    <CartContext.Provider value={{ cart, clearCart, addToCart, removeFromCart, getTotalQuantity, getTotal }}>
      {props.children}
    </CartContext.Provider>
  );

  
};

export default CartProvider;
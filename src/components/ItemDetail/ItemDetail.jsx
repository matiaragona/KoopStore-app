import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc ,getDoc, getFirestore } from 'firebase/firestore';
import { CartContext } from '../../Context/CartContext';

import './ItemDetails.css';


const ItemsDetails = () => {
  const { itemId } = useParams();
  const [item, setItems] = useState(null);

  const { addToCart, removeFromCart } = useContext(CartContext)
  useEffect(() => {
    const db = getFirestore();
    const buzoRef = doc(db, 'items', itemId);

    getDoc(buzoRef).then((doc) => {
      if (doc.exists()) {
        setItems({ id: doc.id, ...doc.data() });
      } else {
        console.log('No se encontró el producto');
      }
    });
  }, [itemId]);

  
    return (
      <div className="product-details">
        {item ? (
          <>
            <div className="product-details__image-container">
              <img src={item.imageId} className="product-details__image" alt={item.title} />
            </div>
            <div className="product-details__info">
              <h2 className="product-details__title">{item.title}</h2>
              <p className="product-details__price">${item.price}</p>
              <div className="product-details__buttons">
                <button className="product-details__add-to-cart-button" onClick={() => addToCart(item, 1)}>
                  Agregar al carrito
                </button>
                <Link to={'/product'}><button className="product-details__back-to-products-button">Volver a los demás productos</button></Link>
              </div>
            </div>
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    );
  };


export default ItemsDetails;
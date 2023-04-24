import React, { useState, useEffect, useContext } from 'react';
import './product.css'
import 'bootstrap/dist/css/bootstrap.css';

import {doc, getDocs, getFirestore, collection} from 'firebase/firestore'
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
const ProductView = () => {

  const [items, setItems] = useState();
  
  const { addToCart, removeFromCart } = useContext(CartContext)

  useEffect(() => {
    
    const db = getFirestore()
  
    const buzoRef = collection (db, 'items')

    getDocs(buzoRef).then((snapshot) => {
      
      if(snapshot.docs.length === 0){
        console.log("no hay resultados")
      }
      
      setItems(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
    })
  }, []);

  return (
    <div className="container">
      <h2 className='text-center'>Productos</h2>
      {items ? (
        <div className="row">
          {items.map(item => (
            <div className="col-md-4" key={item.id}>
              <div className='card'>
                <img src={item.imageId} className='imgProductos' alt={item.title} />
                <h3>{item.title}</h3>
                          <Link to={`/item/${item.id}?docId=${item.id}`} className='miBoton'>
                                        Ver detalles
                          </Link>
                <button className='colorBoton' onClick={() => addToCart(item, 1)}>Agregar al carrito</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5">
            <div className='spinner-border' role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

      )}
    </div>
  );
};

export default ProductView;

import React, { useState, useEffect, useContext } from 'react';
import './product.css'
import 'bootstrap/dist/css/bootstrap.css';



import {doc, getDocs, getFirestore, collection} from 'firebase/firestore'
import { CartContext } from '../../Context/CartContext';
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
      <div className="row">
        {items && items.map(item => (
          <div className="col-md-4" key={item.id}>
            <div className='card'>
              <img src={item.imageId} className='imgProductos' alt={items.title} />
              <h3>{item.title}</h3>
              <p>${item.price}</p>
              <button className='colorBoton' onClick={() => addToCart(item, 1)}>Agregar al carrito</button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductView;

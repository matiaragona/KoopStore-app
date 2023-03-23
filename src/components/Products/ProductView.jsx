import React, { useState, useEffect } from 'react';
import './product.css'
import 'bootstrap/dist/css/bootstrap.css';


import {doc, getDocs, getFirestore, collection} from 'firebase/firestore'
const ProductView = () => {
  const [items, setItems] = useState();

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
              <button className='colorBoton'>Agregar al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductView;

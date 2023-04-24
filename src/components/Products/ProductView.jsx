import React, { useState, useEffect, useContext } from 'react';
import './product.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import {doc, getDocs, getFirestore, collection, query, where} from 'firebase/firestore'
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

const ProductView = () => {

  const [items, setItems] = useState();
  const [category, setCategory] = useState('all'); 
  
  const { addToCart, removeFromCart } = useContext(CartContext)

  useEffect(() => {
    
    const db = getFirestore()
    const buzoRef = collection(db, 'items')
    let buzoQuery = buzoRef; 

    if (category !== 'all') {
      buzoQuery = query(buzoRef, where('category', '==', category));
    }

    getDocs(buzoQuery).then((snapshot) => {
      
      if(snapshot.docs.length === 0){
        console.log("no hay resultados")
      }
      
      setItems(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
    })
  }, [category]); 

  console.log(items)

  return (
    <>
    <div className="container">
      <h2 className='text-center'>Productos</h2>
      <div className="row mb-3 ">
        <div className="col text-center">
          <button className={`btn  me-2 ${category === 'all' ? 'active' : ''}`} onClick={() => setCategory('all')}>Todos</button>
          <button className={`btn  me-2 ${category === 'Puma' ? 'active' : ''}`} onClick={() => setCategory('Puma')}>Puma</button>
          <button className={`btn  me-2 ${category === 'Adidas' ? 'active' : ''}`} onClick={() => setCategory('Adidas')}>Adidas</button>
          <button className={`btn  ${category === 'Lacoste' ? 'active' : ''}`} onClick={() => setCategory('Lacoste')}>Lacoste</button>
          <button className={`btn  ${category === 'H&M' ? 'active' : ''}`} onClick={() => setCategory('H&M')}>H&M</button>

        </div>
      </div>
      {items ? (
        <div className="row">
          {items.map(item => (
            <div className="col-md-4" key={item.id}>
              <div className='card'>
                <img src={item.imageId} className='imgProductos' alt={item.title} />
                <h3>{item.title}</h3>
                <Link to={`/item/${item.id}`} className='miBoton'>
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
    </>
  );
};

export default ProductView;

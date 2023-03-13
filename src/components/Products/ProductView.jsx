import React, { useState, useEffect } from 'react';
import './product.css'

const ProductView = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/Products.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container">
      <h2 className='text-center'>Productos</h2>
      <div className="row">
        {data && data.map(producto => (
          <div className="col-md-4" key={producto.id}>
            <div className='card'>
              <img src={producto.img} className='imgProductos' alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>${producto.precio}</p>
              <button className='colorBoton'>Agregar al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductView;

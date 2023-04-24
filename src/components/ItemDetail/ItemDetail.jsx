import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc ,getDoc, getFirestore } from 'firebase/firestore';

const ItemsDetails = () => {
  const { id } = useParams();
  const [item, setItems] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    const buzoRef = doc(db, 'items', id);

    buzoRef.getDoc().then((doc) => {
      if (doc.exists()) {
        setItems({ id: doc.id, ...doc.data() });
      } else {
        console.log('No se encontró el producto');
      }
    });
  }, [id]);

  return (
    <div>
      {item ? (
        <div>
          <h2>{item.title}</h2>
          <p>{item.price}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ItemsDetails;

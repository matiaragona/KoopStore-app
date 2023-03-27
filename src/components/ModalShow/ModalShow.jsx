import { getFirestore, collection, addDoc } from 'firebase/firestore';
import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CartContext } from '../../Context/CartContext';


const ModalShow = ({show, handleClose}) => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [tarjeta, setTarjeta] = useState('');
    const { cart } = useContext(CartContext);

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleCorreoChange = (event) => {
        setCorreo(event.target.value);
    };

    const handleTarjetaChange = (event) => {
        setTarjeta(event.target.value);
    };

    const handlePagarClick = async () => {
        const db = getFirestore();
        const productos = cart.reduce((obj, item) => {
        obj[item.id] = { title: item.title, price: item.price, quantity: item.quantity };
        return obj;
        }, {});
        const total = Object.values(productos).reduce((sum, item) => {
          return sum + item.price * item.quantity;
        }, 0);
        const datosPago = { nombre, correo, tarjeta, productos, total };
        try {
        const docRef = await addDoc(collection(db, 'orders'), datosPago);
        console.log('Documento creado con ID: ', docRef.id);
        } catch (error) {
        console.error('Error al crear el documento: ', error);
        }
        handleClose();
    };
    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Formulario de pago</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre completo"
                    autoFocus
                    value={nombre}
                    onChange={handleNombreChange}
                />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="correo"
                >
                <Form.Label>Correo electronico</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus
                    value={correo}
                    onChange={handleCorreoChange}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="tarjeta">
                <Form.Label>Numero de tarjeta</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Numero de tarjeta"
                    maxLength={16}
                    autoFocus
                    value={tarjeta}
                    onChange={handleTarjetaChange}
                />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button className='colorBoton' onClick={handleClose}>
                Close
            </Button>
            <Button className='colorBoton' onClick={handlePagarClick}>
                Pagar
            </Button>
        </Modal.Footer>
    </Modal>
    )

    
    }


export default ModalShow;

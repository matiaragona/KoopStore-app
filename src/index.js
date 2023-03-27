import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import Landing from './components/Landing'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ContactView from './components/Contact/ContactView';
import ProductView from './components/Products/ProductView';
import BuzosDetail from './components/buzoDetail/BuzosDetail';
import { initializeApp } from "firebase/app";
import CartProvider from './Context/CartContext';

const firebaseConfig = {
  apiKey: "AIzaSyAHFVy7PbBcgJR8pO7eleZkmKE3-c7j5Jo",
  authDomain: "koopstore-app.firebaseapp.com",
  projectId: "koopstore-app",
  storageBucket: "koopstore-app.appspot.com",
  messagingSenderId: "960981549746",
  appId: "1:960981549746:web:50cf3bffe4d10d5b23ffab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  
  <CartProvider>
    
    <BrowserRouter>

      <Navbar/>
    
    
        <Routes>
    
            <Route exact path="/" element={<Landing/>}/>
            <Route exact path="/Contact" element={<ContactView/>}/>
            <Route exact path="/product" element={<ProductView/>}/>
            <Route exact path="/buzo:id" element={<BuzosDetail/>}/>
    
        </Routes>
    
    </BrowserRouter>

  </CartProvider>  
    

    
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

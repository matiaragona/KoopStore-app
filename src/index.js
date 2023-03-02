import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import Landing from './components/Landing'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ContactView from './components/Contact/ContactView';
import ProductView from './components/Products/ProductView';
import BuzosDetail from './components/buzoDetail/BuzosDetail';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
    <Navbar/>
    
    
    <Routes>
    
    <Route exact path="/" element={<Landing/>}/>
    <Route exact path="/Contact" element={<ContactView/>}/>
    <Route exact path="/product" element={<ProductView/>}/>
    <Route exact path="/buzo:id" element={<BuzosDetail/>}/>
    
    </Routes>
    
    </BrowserRouter>

    

    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

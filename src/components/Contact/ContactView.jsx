
import React from 'react'
import './Contact.css'
const ContactView = () => {
    return (

    <form>

      <label htmlFor="text">Nombre completo</label>
      <input type="text" placeholder='Nombre completo'/>

      <label htmlFor="email">Correo electronico</label>
      <input type="email" placeholder='Correo electronico'/>

      <label htmlFor="text">Consulta</label>
      <textarea name="consulta"></textarea>
      
      <button type='submit' className='colorBoton'>Enviar</button>
    </form>

    )
}

export default ContactView
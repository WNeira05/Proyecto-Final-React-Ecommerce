import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const Contactos = ({ cart, borrarProducto }) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} />
      <main className="contact-container">
        {/*Formulario es solo visual*/}
        <h1>Contacto</h1>
        <p>¿Tenés alguna consulta? Completá el formulario y te responderemos a la brevedad.</p>

        <form className="contact-form">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" placeholder="Tu nombre completo" required />

          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" name="email" placeholder="ejemplo@correo.com" required />

          <label htmlFor="mensaje">Mensaje</label>
          <textarea id="mensaje" name="mensaje" placeholder="Escribí tu mensaje aquí" rows="5" required></textarea>

          <button type="submit">Enviar mensaje</button>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Contactos

import React from 'react'
import { Link } from 'react-router-dom'
import error404 from '../assets/error-404.jpg' 
import './NotFound.css' 

const NotFound = () => {
  return (
    <div className="notfound-container">
      <img src={error404} alt="Página no encontrada" className="notfound-img" />
      <button className="notfound-button">
        <Link to='/'>Volver al inicio</Link>
      </button>
    </div>
  )
}

export default NotFound


import React, { useState, useContext } from 'react';
import './styleProductos.css';
import { Link } from 'react-router-dom';
import { CartContext } from "../context/CartContext";

const Productos = ({ producto }) => {
  const { cart, handleAddToCart } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);

  // Calcular cuántas unidades ya están en el carrito de este producto
  const enCarrito = cart.find(item => item.id === producto.id);
  const yaEnCarrito = enCarrito ? enCarrito.cantidad : 0;

  // Stock disponible real menos lo que ya se agregó al carrito
  const stockDisponible = producto.stock - yaEnCarrito;

  const sinStock = stockDisponible === 0;
  const cantidadMaxima = cantidad >= stockDisponible;

  const increase = () => {
    if (cantidad < stockDisponible) {
      setCantidad(prev => prev + 1);
    }
  };

  const decrease = () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1);
    }
  };

  const handleAgregar = () => {
    if (cantidad > stockDisponible) {
      alert("No hay suficiente stock disponible.");
      return;
    }

    handleAddToCart({ ...producto, cantidad }); // Usamos directamente el contexto
    setCantidad(1); // Reiniciar después de agregar
  };

  return (
    <section className='card'>
      <div className='imganContainer'>
        <img src={producto.imagen} alt={producto.nombre} className='imagen' />
      </div>

      <h3 className='nombre'>{producto.nombre}</h3>
      <p className='precio'>${producto.precio}</p>
      <p className='stock'>
        {sinStock ? (
          <span style={{ color: 'red' }}>Sin stock</span>
        ) : (
          `Stock disponible: ${stockDisponible}`
        )}
      </p>

      <div className='cantidadContainer'>
        <button className='qtyButton' onClick={decrease} disabled={sinStock}>-</button>
        <span>{cantidad}</span>
        <button className='qtyButton' onClick={increase} disabled={cantidadMaxima || sinStock}>+</button>
      </div>

      <button
        onClick={handleAgregar}
        disabled={sinStock}
        style={{
          backgroundColor: sinStock ? '#ccc' : '#3483fa',
          color: sinStock ? '#666' : '#fff',
          cursor: sinStock ? 'not-allowed' : 'pointer',
          padding: '10px',
          border: 'none',
          borderRadius: '4px',
          marginTop: '10px'
        }}
      >
        {sinStock ? 'No disponible' : 'Agregar al carrito'}
      </button>

      <Link to={`/productos/${producto.id}`}className="verMas">Ver más</Link>
    </section>
  );
};

export default Productos;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styleDetalles.css';

const DetallesProductos = ({ productos }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = productos.find(producto => producto.id == id);

  return (
    <div className="detalle-container">
      <div className="detalle-header">
        <h1>Detalle del producto</h1>
      </div>
      {product ? (
        <div className="detalle-content">
          <div className="detalle-info">
            <p><strong>Nombre:</strong> {product.nombre}</p>
            <p><strong>Precio:</strong> ${product.precio}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
          </div>
          <div className="detalle-image">
            <img src={product.imagen} alt={product.nombre} />
          </div>
        </div>
      ) : (
        <div className="detalle-not-found">
          <p>Producto no encontrado</p>
        </div>
      )}
      <br />
      <button className="boton-volver" onClick={() => navigate('/productos')} style={{ marginTop: '20px' }}>
        Volver a la galería de productos
      </button>
    </div>
  );
};

export default DetallesProductos;


import React, { useContext } from "react";
import "./styleCart.css";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = ({ isOpen, onClose, borrarProducto }) => {
  const {
    cart,
    clearCart,
    confirmarCompra,
    handleDeleteFromCart,
    handleIncreaseQuantity,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const itemsAgrupados = cart.reduce((acc, item) => {
    const existingItemIndex = acc.findIndex((i) => i.id === item.id);
    if (existingItemIndex >= 0) {
      const newAcc = [...acc];
      newAcc[existingItemIndex] = {
        ...acc[existingItemIndex],
        cantidad: (acc[existingItemIndex].cantidad || 0) + (item.cantidad || 1),
      };
      return newAcc;
    }
    return [...acc, { ...item, cantidad: item.cantidad || 1 }];
  }, []);

  const calcularTotal = () => {
    const total = itemsAgrupados.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
    return total.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Carrito de Compras</h2>
        <button onClick={onClose} className="close-button">
          X
        </button>
      </div>
      <div className="cart-content">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <i className="fa-solid fa-cart-shopping empty-icon"></i>
            <p className="empty-message">Tu carrito está vacío</p>
            <button
              className="cta-button"
              onClick={() => {
                onClose();
                navigate("/");
              }}
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div>
            <ul className="cart-items-list">
              {itemsAgrupados.map((item) => {
                const subtotal = item.precio * item.cantidad;
                const subtotalFormateado = subtotal.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                });

                return (
                  <li key={item.id} className="cart-item-detail">
                    <div className="item-info">
                      <h3>{item.nombre}</h3>
                      <p className="item-description">{item.descripcion}</p>
                      <div className="item-details">
                        <div className="quantity-controls">
                          <button onClick={() => handleDeleteFromCart(item)}>
                            -
                          </button>
                          <span>{item.cantidad}</span>
                          <button onClick={() => handleIncreaseQuantity(item)}>
                            +
                          </button>
                        </div>
                        <span>
                          Precio:{" "}
                          {item.precio.toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        <span>Subtotal: {subtotalFormateado}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => borrarProducto(item)}
                      className="delete-button"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="cart-total">
              <h3>Total: {calcularTotal()}</h3>
            </div>

            <div className="cart-actions">
              <button className="clear-cart-button" onClick={clearCart}>
                Vaciar carrito
              </button>
              <button className="confirm-cart-button" onClick={confirmarCompra}>
                Finalizar compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

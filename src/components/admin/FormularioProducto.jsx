import React, { useState } from "react";
import "./FormularioEdicion.css";

function FormularioProducto({ onAgregar }) {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    imagen: "",
    categoria: "",
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!producto.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }
    if (!producto.precio || producto.precio <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor a 0.";
    }
    if (!producto.categoria.trim() || producto.categoria.length < 5) {
      nuevosErrores.categoria =
        "La categoría debe tener al menos 5 caracteres.";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    onAgregar(producto);
    setProducto({
      nombre: "",
      precio: "",
      stock: "",
      imagen: "",
      categoria: "",
    });
  };

  return (
    <form className="form-edicion" onSubmit={handleSubmit}>
      <h2 className="titulo-form">Agregar Producto</h2>

      {["nombre", "precio", "stock", "imagen", "categoria"].map((campo) => (
        <div className="form-group" key={campo}>
          <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
          <input
            type={campo === "precio" || campo === "stock" ? "number" : "text"}
            name={campo}
            value={producto[campo]}
            onChange={handleChange}
            required
            min={campo === "precio" || campo === "stock" ? 0 : undefined}
          />
          {errores[campo] && (
            <p style={{ color: "red", fontSize: "14px" }}>{errores[campo]}</p>
          )}
        </div>
      ))}

      <button type="submit" className="btn-actualizar">
        Agregar Producto
      </button>
    </form>
  );
}

export default FormularioProducto;

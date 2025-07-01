import React, { useState, useEffect } from "react";
import "./FormularioEdicion.css";

function FormularioEdicion({ productoSeleccionado, onActualizar }) {
  const [producto, setProducto] = useState(productoSeleccionado);

  useEffect(() => {
    setProducto(productoSeleccionado);
  }, [productoSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  return (
    <form
      className="form-edicion"
      onSubmit={(e) => {
        e.preventDefault();
        onActualizar(producto);
      }}
    >
      <h2 className="titulo-form">Editar Producto</h2>

      {["id", "nombre", "precio", "stock", "imagen", "categoria"].map(
        (campo) => (
          <div className="form-group" key={campo}>
            <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
            <input
              type={
                campo === "precio" || campo === "stock" || campo === "id"
                  ? "number"
                  : "text"
              }
              name={campo}
              value={producto[campo] || ""}
              onChange={handleChange}
              required={campo !== "id"}
              readOnly={campo === "id"}
              min={campo === "precio" || campo === "stock" ? 0 : undefined}
            />
          </div>
        )
      )}

      <button type="submit" className="btn-actualizar">
        Actualizar Producto
      </button>
    </form>
  );
}

export default FormularioEdicion;

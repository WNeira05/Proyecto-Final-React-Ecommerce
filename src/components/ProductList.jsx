import React, { useContext } from "react";
import Productos from "./Productos";
import SearchBar from "./SearchBar";
import { CartContext } from "../context/CartContext";

const ProductList = () => {
  const { productosFiltrados, cargando, error } = useContext(CartContext);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos.</p>;

  return (
    <>
      <div style={{ textAlign: "center", margin: "3rem 0 2rem 0" }}>
  <h2
    style={{
      fontSize: "2rem",
      color: "#222222", 
      marginBottom: "0.5rem",
      letterSpacing: "1px",
      position: "relative",
      display: "inline-block",
    }}
  >
    Galería de Productos
    <span
      style={{
        position: "absolute",
        bottom: -5,
        left: 0,
        width: "100%",
        height: "3px",
        backgroundColor: "#c06c84",
        borderRadius: "5px",
      }}
    ></span>
  </h2>
</div>


      <SearchBar />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {productosFiltrados.map((producto) => (
          <Productos
            key={producto.id}
            producto={producto}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;

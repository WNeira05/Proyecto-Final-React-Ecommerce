import React from "react";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";
import ProductList from "../components/ProductList";
import loading from "../assets/loading.gif";
import fondoHero from "../assets/hero-ortopedia.jpg";
import "../App.css";

const Home = ({
  cart,
  productos,
  cargando,
  agregarCarrito,
  borrarProducto,
}) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} />

      <main>
        <section
          className="hero-container"
          style={{
            backgroundImage: `url(${fondoHero})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        ></section>

        {cargando ? (
          <div
            className="loading-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <img src={loading} alt="loading" />
          </div>
        ) : (
          <ProductList agregarCarrito={agregarCarrito} productos={productos} />
        )}
      </main>

      <Footer />
    </>
  );
};

export default Home;

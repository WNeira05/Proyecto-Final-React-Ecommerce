import { useContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AcercaDe from "./pages/AcercaDe";
import Contactos from "./pages/Contactos";
import GaleriaDeProductos from "./pages/GaleriaDeProductos";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import DetallesProductos from "./components/DetallesProductos";
import Login from "./pages/Login";
import RutaProtegida from "./components/RutaProtegida";
import { CartContext } from "./context/CartContext";

function App() {
  const {
    cart,
    productos,
    cargando,
    error,
    handleAddToCart,
    handleDeleteFromCart,
    isAuthenticated,
  } = useContext(CartContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            borrarProducto={handleDeleteFromCart}
            agregarCarrito={handleAddToCart}
            cart={cart}
            productos={productos}
            cargando={cargando}
          />
        }
      />

      <Route
        path="/acercade"
        element={<AcercaDe borrarProducto={handleDeleteFromCart} cart={cart} />}
      />

      <Route
        path="/productos"
        element={
          <GaleriaDeProductos
            borrarProducto={handleDeleteFromCart}
            agregarCarrito={handleAddToCart}
            cart={cart}
            productos={productos}
            cargando={cargando}
          />
        }
      />

      <Route
        path="/productos/:id"
        element={<DetallesProductos productos={productos} />}
      />

      <Route
        path="/contacto"
        element={
          <Contactos borrarProducto={handleDeleteFromCart} cart={cart} />
        }
      />

      <Route
        path="/admin"
        element={
          <RutaProtegida>
            <Admin />
          </RutaProtegida>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

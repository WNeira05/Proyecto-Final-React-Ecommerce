import React, { useRef, useContext } from "react";
import FormularioProducto from "../components/admin/FormularioProducto";
import FormularioEdicion from "../components/admin/FormularioEdicion";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";

const Admin = () => {
  const {
    productos,
    loading,
    open,
    setOpen,
    openEditor,
    setOpenEditor,
    seleccionado,
    setSeleccionado,
    agregarProducto,
    actulizarProducto,
    eliminarProducto,
  } = useContext(AdminContext);

  const { logout } = useAuth();
  const navigate = useNavigate();
  const edicionRef = useRef(null);

  const handleEditar = (product) => {
    setOpenEditor(true);
    setSeleccionado(product);
    setTimeout(() => {
      edicionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleAgregar = (nuevoProducto) => {
    agregarProducto(nuevoProducto);
    setOpen(false); // cerrar modal/agregador si lo estás usando
    setSeleccionado(nuevoProducto);
    setOpenEditor(true);
    setTimeout(() => {
      edicionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {loading ? (
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "#666" }}>
          Cargando...
        </p>
      ) : (
        <>
          <nav
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "10px",
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "10px 10px 0 0",
              width: "100%",
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#c0392b",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "5px",
                transition: "background-color 0.3s",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#a93226")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#c0392b")}
            >
              <FaSignOutAlt />
              Cerrar sesión
            </button>
          </nav>

          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              margin: "20px 0",
            }}
          >
            Panel Administrativo
          </h1>

          <ul
            className="list"
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {productos.map((product) => (
              <li
                key={product.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                  margin: "20px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  width: "200px",
                }}
              >
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#333",
                    marginTop: "10px",
                  }}
                >
                  {product.nombre}
                </span>
                <span style={{ fontSize: "16px", color: "#666" }}>
                  ${product.precio}
                </span>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "10px",
                    width: "100%",
                  }}
                >
                  <button
                    onClick={() => handleEditar(product)}
                    style={{
                      backgroundColor: "#3498db",
                      color: "#fff",
                      border: "none",
                      padding: "10px",
                      fontSize: "14px",
                      cursor: "pointer",
                      borderRadius: "5px",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#2980b9")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#3498db")
                    }
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => eliminarProducto(product.id)}
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      padding: "10px",
                      fontSize: "14px",
                      cursor: "pointer",
                      borderRadius: "5px",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#c0392b")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#e74c3c")
                    }
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <button
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: "#2ecc71",
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
          transition: "background-color 0.3s",
          marginTop: "20px",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#27ae60")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#2ecc71")}
      >
        Agregar producto nuevo
      </button>

      {open && <FormularioProducto onAgregar={handleAgregar} />}

      <div ref={edicionRef}>
        {openEditor && (
          <FormularioEdicion
            productoSeleccionado={seleccionado}
            onActualizar={actulizarProducto}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;

import React from "react";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";
import "../App.css";

const AcercaDe = ({ cart, borrarProducto }) => {
  return (
    <>
      <Header borrarProducto={borrarProducto} cartItems={cart} />

      <main className="acerca-container">
        <h1 className="acerca-titulo">Conocenos - Ortopedia BN</h1>

        <p>
          En Ortopedia BN nos dedicamos desde hace más de 25 años a brindar
          soluciones integrales para el bienestar y la movilidad de nuestros
          pacientes. Nuestra misión es ofrecer productos ortopédicos de alta
          calidad, con tecnología avanzada y atención personalizada para mejorar
          la calidad de vida de cada persona.
        </p>

        <p>
          Contamos con un amplio catálogo que incluye desde dispositivos de apoyo,
          prótesis, ortesis, hasta productos de rehabilitación y cuidado personal.
          Trabajamos con las mejores marcas y proveedores para garantizar eficacia
          y seguridad en cada producto.
        </p>

        <p>
          Nuestro equipo está conformado por profesionales especializados en salud
          y atención al cliente, dispuestos a asesorarte y acompañarte en la
          elección del producto que mejor se adapte a tus necesidades.
        </p>

        <p>
          En Ortopedia BN creemos en la importancia de un servicio humano y
          cercano. Por eso, además de productos, ofrecemos seguimiento postventa
          y soporte técnico para que tu experiencia sea completa y satisfactoria.
        </p>

        <p>
          Te invitamos a conocernos y descubrir cómo podemos ayudarte a recuperar
          tu movilidad y bienestar. ¡Tu salud es nuestra prioridad!
        </p>
      </main>

      <Footer />
    </>
  );
};

export default AcercaDe;

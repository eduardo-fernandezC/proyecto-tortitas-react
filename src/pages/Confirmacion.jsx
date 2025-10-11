import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Title } from "../components/atoms/Title";
import { Button } from "../components/atoms/Button";
import "../styles/pages/checkout.css";

export const Confirmacion = () => {
  const location = useLocation();
  const { form, total } = location.state || {};

  if (!form) {
    return (
      <main className="container text-center mt-5">
        <Title text="No hay información de compra" />
        <Link to="/productos">
          <Button text="Ir a la tienda" className="mt-3" />
        </Link>
      </main>
    );
  }

  return (
    <main className="container text-center mt-5 mb-5">
      <div className="card confirmacion-card mx-auto p-5">
        <Title text="¡Gracias por tu compra!" />
        <p className="mt-4 fs-5">
          Hemos recibido tu pedido, <strong>{form.nombre}</strong>.
          <br />
          En breve te enviaremos un correo a <strong>{form.correo}</strong>.
        </p>
        <p className="fw-bold mt-4" style={{ color: "var(--color-principal)" }}>
          Total pagado: ${total?.toLocaleString()}
        </p>
        <p className="mt-3">
          Modalidad:{" "}
          {form.tipoEntrega === "envio"
            ? `Envío a domicilio (${form.direccion})`
            : "Retiro en local"}
        </p>
        <Link to="/">
          <Button text="Volver al inicio" className="mt-4" />
        </Link>
      </div>
    </main>
  );
};
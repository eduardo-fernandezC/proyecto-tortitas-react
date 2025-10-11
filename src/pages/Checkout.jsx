import React from "react";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Title } from "../components/atoms/Title";
import { Button } from "../components/atoms/Button";
import "../styles/pages/checkout.css";

export const Checkout = () => {
  const { carrito, vaciarCarrito } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state?.form;

  if (!form || carrito.length === 0) {
    return (
      <main className="container text-center mt-5">
        <Title text="No hay datos de compra" />
        <Link to="/carrito">
          <Button text="Volver al carrito" className="mt-3" />
        </Link>
      </main>
    );
  }

  const total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  const handleConfirmar = () => {
    vaciarCarrito();
    navigate("/confirmacion", { state: { form, total } });
  };

  return (
    <main className="container checkout-page mt-5 mb-5">
      <div className="card checkout-card">
        <Title text="Revisá tu pedido" />
        <div className="row mt-4">
          <div className="col-md-6 mb-4">
            <h5>Datos del cliente</h5>
            <p><strong>Nombre:</strong> {form.nombre}</p>
            <p><strong>Correo:</strong> {form.correo}</p>
            <p>
              <strong>Entrega:</strong>{" "}
              {form.tipoEntrega === "envio"
                ? `Envío a domicilio (${form.direccion})`
                : "Retiro en local"}
            </p>
          </div>

          <div className="col-md-6">
            <h5>Productos</h5>
            <ul className="list-group">
              {carrito.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  {item.nombre} × {item.cantidad}
                  <span>${(item.precio * item.cantidad).toLocaleString()}</span>
                </li>
              ))}
              <li className="list-group-item text-end fw-bold">
                Total: ${total.toLocaleString()}
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <Link to="/carrito">
            <Button text="Volver" className="btn-outline-secondary" />
          </Link>
          <Button text="Confirmar compra" onClick={handleConfirmar} />
        </div>
      </div>
    </main>
  );
};
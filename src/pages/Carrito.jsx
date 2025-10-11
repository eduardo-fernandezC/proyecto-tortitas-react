import React from "react";
import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "../components/atoms/Title";
import { Button } from "../components/atoms/Button";
import { FormField } from "../components/molecules/FormField";
import { notifyError, notifyInfo } from "../components/atoms/Notification";
import "../styles/pages/carrito.css";

export const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    tipoEntrega: "envio",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  const handleCompra = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.correo) return notifyError("Completa todos los campos obligatorios.");
    if (form.tipoEntrega === "envio" && !form.direccion)
      return notifyError("Debes ingresar una dirección para el envío.");
    navigate("/checkout", { state: { form } });
  };

  if (carrito.length === 0) {
    return (
      <main className="container text-center mt-5">
        <Title text="Tu carrito está vacío" />
        <Link to="/productos">
          <Button text="Ver productos" className="mt-3" />
        </Link>
      </main>
    );
  }

  return (
    <main className="container carrito-page mt-5">
      <Title text="Tu Carrito" />

      <div className="row">
        {carrito.map((item) => (
          <div key={item.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card carrito-card">
              <img src={item.imagen} alt={item.nombre} className="card-img-top" />
              <div className="card-body text-center">
                <h5>{item.nombre}</h5>
                <p>Cantidad: {item.cantidad}</p>
                <p className="fw-bold">Subtotal: ${(item.precio * item.cantidad).toLocaleString()}</p>
                <Button
                  text="Eliminar"
                  onClick={() => {
                    eliminarDelCarrito(item.id);
                    notifyInfo(`${item.nombre} eliminado`);
                  }}
                  className="btn-danger w-100"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-4 carrito-form">
        <h4>Total: ${total.toLocaleString()}</h4>
        <form onSubmit={handleCompra}>
          <FormField label="Nombre completo" name="nombre" value={form.nombre} onChange={handleChange} />
          <FormField label="Correo electrónico" name="correo" value={form.correo} onChange={handleChange} />
          <div className="mb-3">
            <label className="form-label fw-bold">Método de entrega</label>
            <select name="tipoEntrega" value={form.tipoEntrega} onChange={handleChange} className="form-select">
              <option value="envio">Envío a domicilio</option>
              <option value="retiro">Retiro en local</option>
            </select>
          </div>
          {form.tipoEntrega === "envio" && (
            <FormField label="Dirección" name="direccion" value={form.direccion} onChange={handleChange} />
          )}
          <Button text="Finalizar compra" type="submit" className="w-100 mt-2" />
        </form>

        <Button
          text="Vaciar carrito"
          onClick={() => {
            vaciarCarrito();
            notifyInfo("Carrito vaciado correctamente");
          }}
          className="btn-outline-danger mt-3 w-100"
        />
      </div>
    </main>
  );
};
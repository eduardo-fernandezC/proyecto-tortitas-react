import React from "react";
import { useState } from "react";
import { Title } from "../components/atoms/Title";
import { Button } from "../components/atoms/Button";
import { FormField } from "../components/molecules/FormField";
import { notifyError, notifySuccess } from "../components/atoms/Notification";
import "../styles/pages/contacto.css";

export const Contacto = () => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre) return notifyError("El nombre es obligatorio.");
    if (!form.correo) return notifyError("El correo es obligatorio.");
    if (!form.asunto) return notifyError("El asunto es obligatorio.");
    if (!form.mensaje) return notifyError("El mensaje es obligatorio.");

    notifySuccess("Mensaje enviado correctamente.");
    setEnviado(true);
    setForm({ nombre: "", correo: "", telefono: "", asunto: "", mensaje: "" });
  };

  return (
    <main className="container mt-5 contacto-page">
      <Title text="Contáctanos" />
      {!enviado ? (
        <form onSubmit={handleSubmit} className="contacto-form mx-auto shadow-sm p-4 rounded">
          <FormField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} />
          <FormField label="Correo electrónico" name="correo" type="email" value={form.correo} onChange={handleChange} />
          <FormField label="Teléfono (opcional)" name="telefono" value={form.telefono} onChange={handleChange} />
          <FormField label="Asunto" name="asunto" value={form.asunto} onChange={handleChange} />
          <div className="mb-3 text-start">
            <label htmlFor="mensaje" className="form-label fw-bold">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              className="form-control"
              rows="4"
              required
            ></textarea>
          </div>
          <Button text="Enviar mensaje" type="submit" className="w-100" />
        </form>
      ) : (
        <div className="text-center enviado mt-5">
          <h3>Mensaje enviado</h3>
          <p>Gracias por contactarte con nosotros, te responderemos pronto.</p>
          <Button text="Enviar otro mensaje" onClick={() => setEnviado(false)} className="mt-2" />
        </div>
      )}
    </main>
  );
};
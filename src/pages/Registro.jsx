import React, { useState } from "react";
import { Title } from "../components/atoms/Title";
import { Button } from "../components/atoms/Button";
import { FormField } from "../components/molecules/FormField";
import { notifyError, notifySuccess } from "../components/atoms/Notification";
import "../styles/pages/registro.css";

export const Registro = () => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmar: "",
    terminos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!form.nombre || !form.correo || !form.password || !form.confirmar)
      return notifyError("Todos los campos son obligatorios.");

    if (
      !/^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(form.correo)
    )
      return notifyError(
        "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
      );

    if (form.password.length < 4 || form.password.length > 10)
      return notifyError(
        "La contraseña debe tener mínimo 4 y máximo 10 caracteres."
      );

    if (form.password !== form.confirmar)
      return notifyError("Las contraseñas no coinciden.");

    if (!form.terminos) return notifyError("Debes aceptar los términos.");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.some((u) => u.correo === form.correo);
    if (existe) return notifyError("Este correo ya está registrado.");

    usuarios.push({
      nombre: form.nombre,
      correo: form.correo,
      password: form.password,
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    notifySuccess("Registro exitoso. Bienvenido a TORTITAS.CL");
    setTimeout(() => (window.location.href = "/login"), 2000);
  };

  return (
    <main className="container mt-5 registro-page d-flex justify-content-center">
      <div className="card registro-card shadow p-4">
        <Title text="Crear Cuenta" />
        <form onSubmit={handleSubmit}>
          <FormField
            label="Nombre completo"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          <FormField
            label="Correo electrónico"
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
          />
          <FormField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <FormField
            label="Confirmar contraseña"
            name="confirmar"
            type="password"
            value={form.confirmar}
            onChange={handleChange}
          />
          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="terminos"
              name="terminos"
              checked={form.terminos}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="terminos">
              Acepto los términos y condiciones
            </label>
          </div>
          <Button text="Registrarme" type="submit" className="w-100 mt-3" />
        </form>
        <p className="mt-3 text-center">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="link">
            Inicia sesión
          </a>
        </p>
      </div>
    </main>
  );
};

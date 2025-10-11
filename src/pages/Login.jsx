import React from "react";
import { useState } from "react";
import { Title } from "../components/atoms/Title";
import { Button } from "../components/atoms/Button";
import { FormField } from "../components/molecules/FormField";
import { notifyError, notifySuccess } from "../components/atoms/Notification";
import "../styles/pages/login.css";

export const Login = () => {
  const [form, setForm] = useState({ correo: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { correo, password } = form;

    if (!correo || !password) return notifyError("Completa todos los campos.");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find((u) => u.correo === correo && u.password === password);

    if (!usuario) return notifyError("Correo o contraseña incorrectos.");

    localStorage.setItem("usuario", JSON.stringify(usuario));
    notifySuccess(`Bienvenido ${usuario.nombre}`);
    setTimeout(() => (window.location.href = "/"), 2000);
  };

  return (
    <main className="container login-page d-flex justify-content-center align-items-center">
      <div className="card login-card shadow p-4">
        <Title text="Iniciar Sesión" />
        <form onSubmit={handleSubmit}>
          <FormField label="Correo electrónico" name="correo" type="email" value={form.correo} onChange={handleChange} />
          <FormField label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} />
          <Button text="Iniciar sesión" type="submit" className="w-100 mt-3" />
        </form>
        <p className="mt-4 text-center">
          ¿No tienes cuenta? <a href="/registro" className="link">Regístrate aquí</a>
        </p>
      </div>
    </main>
  );
};
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "../../pages/Login";

describe("Página Login", () => {
    beforeEach(() => {
        localStorage.clear();

        window.notifyError = () => { };
        window.notifySuccess = () => { };
    });

    it("renderiza el título del formulario", () => {
        render(<Login />);
        expect(screen.getByText("Iniciar Sesión")).toBeTruthy();
    });

    it("no permite iniciar sesión si los campos están vacíos", () => {
        render(<Login />);
        fireEvent.click(screen.getByText("Iniciar sesión"));
        expect(localStorage.getItem("usuario")).toBeNull();
    });

    it("no permite iniciar sesión si el usuario no existe", () => {
        render(<Login />);

        const correoInput = document.querySelector('input[name="correo"]');
        const passwordInput = document.querySelector('input[name="password"]');

        fireEvent.change(correoInput, { target: { value: "noexiste@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "1234" } });
        fireEvent.click(screen.getByText("Iniciar sesión"));

        expect(localStorage.getItem("usuario")).toBeNull();
    });

    it("inicia sesión correctamente si el usuario existe", () => {
        const usuario = { nombre: "Lucas", correo: "test@test.com", password: "1234" };
        localStorage.setItem("usuarios", JSON.stringify([usuario]));

        render(<Login />);

        const correoInput = document.querySelector('input[name="correo"]');
        const passwordInput = document.querySelector('input[name="password"]');

        fireEvent.change(correoInput, { target: { value: "test@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "1234" } });
        fireEvent.click(screen.getByText("Iniciar sesión"));

        const guardado = JSON.parse(localStorage.getItem("usuario"));
        expect(guardado).toEqual(usuario);
    });
});

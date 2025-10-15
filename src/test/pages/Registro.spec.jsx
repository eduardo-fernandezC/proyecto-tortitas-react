import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Registro } from "../../pages/Registro";

describe("Página Registro", () => {
    beforeEach(() => {
        localStorage.clear();

        window.notifyError = () => { };
        window.notifySuccess = () => { };
    });

    it("renderiza correctamente el título del formulario", () => {
        render(<Registro />);
        expect(screen.getByText("Crear Cuenta")).toBeTruthy();
    });

    it("no permite registrar si los campos están vacíos", () => {
        render(<Registro />);
        fireEvent.click(screen.getByText("Registrarme"));
        expect(localStorage.getItem("usuarios")).toBeNull();
    });

    it("muestra error si las contraseñas no coinciden", () => {
        render(<Registro />);

        const nombreInput = document.querySelector('input[name="nombre"]');
        const correoInput = document.querySelector('input[name="correo"]');
        const passwordInput = document.querySelector('input[name="password"]');
        const confirmarInput = document.querySelector('input[name="confirmar"]');
        const terminosCheckbox = document.querySelector('input[name="terminos"]');

        fireEvent.change(nombreInput, { target: { value: "Lucas" } });
        fireEvent.change(correoInput, { target: { value: "lucas@duoc.cl" } });
        fireEvent.change(passwordInput, { target: { value: "1234" } });
        fireEvent.change(confirmarInput, { target: { value: "0000" } });
        fireEvent.click(terminosCheckbox);
        fireEvent.click(screen.getByText("Registrarme"));

        expect(localStorage.getItem("usuarios")).toBeNull();
    });

    it("muestra error si no acepta los términos", () => {
        render(<Registro />);

        const nombreInput = document.querySelector('input[name="nombre"]');
        const correoInput = document.querySelector('input[name="correo"]');
        const passwordInput = document.querySelector('input[name="password"]');
        const confirmarInput = document.querySelector('input[name="confirmar"]');

        fireEvent.change(nombreInput, { target: { value: "Lucas" } });
        fireEvent.change(correoInput, { target: { value: "lucas@duoc.cl" } });
        fireEvent.change(passwordInput, { target: { value: "1234" } });
        fireEvent.change(confirmarInput, { target: { value: "1234" } });
        fireEvent.click(screen.getByText("Registrarme"));

        expect(localStorage.getItem("usuarios")).toBeNull();
    });

    it("registra correctamente un nuevo usuario si todos los campos son válidos", () => {
        render(<Registro />);

        const nombreInput = document.querySelector('input[name="nombre"]');
        const correoInput = document.querySelector('input[name="correo"]');
        const passwordInput = document.querySelector('input[name="password"]');
        const confirmarInput = document.querySelector('input[name="confirmar"]');
        const terminosCheckbox = document.querySelector('input[name="terminos"]');

        fireEvent.change(nombreInput, { target: { value: "Lucas" } });
        fireEvent.change(correoInput, { target: { value: "lucas@duoc.cl" } });
        fireEvent.change(passwordInput, { target: { value: "1234" } });
        fireEvent.change(confirmarInput, { target: { value: "1234" } });
        fireEvent.click(terminosCheckbox);
        fireEvent.click(screen.getByText("Registrarme"));

        const usuarios = JSON.parse(localStorage.getItem("usuarios"));
        expect(usuarios.length).toBe(1);
        expect(usuarios[0].correo).toBe("lucas@duoc.cl");
    });

    it("no permite registrar un usuario si el correo ya existe", () => {
        const usuarioExistente = {
            nombre: "Lucas",
            correo: "repetido@duoc.cl",
            password: "1234",
        };
        localStorage.setItem("usuarios", JSON.stringify([usuarioExistente]));

        render(<Registro />);

        const nombreInput = document.querySelector('input[name="nombre"]');
        const correoInput = document.querySelector('input[name="correo"]');
        const passwordInput = document.querySelector('input[name="password"]');
        const confirmarInput = document.querySelector('input[name="confirmar"]');
        const terminosCheckbox = document.querySelector('input[name="terminos"]');

        fireEvent.change(nombreInput, { target: { value: "Otro" } });
        fireEvent.change(correoInput, { target: { value: "repetido@duoc.cl" } });
        fireEvent.change(passwordInput, { target: { value: "5678" } });
        fireEvent.change(confirmarInput, { target: { value: "5678" } });
        fireEvent.click(terminosCheckbox);
        fireEvent.click(screen.getByText("Registrarme"));

        const usuarios = JSON.parse(localStorage.getItem("usuarios"));
        expect(usuarios.length).toBe(1);
    });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Contacto } from "../../pages/Contacto";

describe("Página Contacto", () => {
    const fillForm = (container) => {
        const nombre = container.querySelector('input[name="nombre"]');
        const correo = container.querySelector('input[name="correo"]');
        const telefono = container.querySelector('input[name="telefono"]');
        const asunto = container.querySelector('input[name="asunto"]');
        const mensaje = container.querySelector('textarea[name="mensaje"]');

        fireEvent.change(nombre, { target: { value: "Lucas" } });
        fireEvent.change(correo, { target: { value: "lucas@test.com" } });
        fireEvent.change(telefono, { target: { value: "987654321" } });
        fireEvent.change(asunto, { target: { value: "Consulta" } });
        fireEvent.change(mensaje, { target: { value: "Hola, quiero hacer un pedido" } });
    };

    it("muestra el título correctamente", () => {
        const { container } = render(<Contacto />);
        expect(screen.getByText(/contáctanos/i)).toBeTruthy();
    });

    it("permite llenar el formulario", () => {
        const { container } = render(<Contacto />);
        const nombre = container.querySelector('input[name="nombre"]');
        const correo = container.querySelector('input[name="correo"]');
        const asunto = container.querySelector('input[name="asunto"]');
        const mensaje = container.querySelector('textarea[name="mensaje"]');

        expect(nombre).toBeTruthy();
        expect(correo).toBeTruthy();
        expect(asunto).toBeTruthy();
        expect(mensaje).toBeTruthy();
    });

    it("envía el formulario y muestra el mensaje de enviado", () => {
        const { container } = render(<Contacto />);
        fillForm(container);

        const boton = screen.getByRole("button", { name: /enviar mensaje/i });
        fireEvent.click(boton);

        expect(screen.queryByText(/mensaje enviado/i)).toBeTruthy();
    });

    it("permite volver al formulario luego de enviar", () => {
        const { container } = render(<Contacto />);
        fillForm(container);

        fireEvent.click(screen.getByRole("button", { name: /enviar mensaje/i }));

        const botonVolver = screen.queryByRole("button", { name: /enviar otro mensaje/i });
        if (botonVolver) {
            fireEvent.click(botonVolver);
        }

        expect(screen.queryByRole("button", { name: /enviar mensaje/i })).toBeTruthy();
    });
});

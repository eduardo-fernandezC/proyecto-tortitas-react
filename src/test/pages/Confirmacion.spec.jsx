import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Confirmacion } from "../../pages/Confirmacion";

const Title = ({ text }) => <h1>{text}</h1>;
const Button = ({ text, className }) => (
    <button className={className}>{text}</button>
);

describe("Página Confirmacion", () => {
    const mockForm = {
        nombre: "Lucas",
        correo: "lucas@test.com",
        direccion: "Calle 123",
        tipoEntrega: "envio",
    };
    const mockTotal = 15000;

    const renderWithRouter = (state) => {
        return render(
            <MemoryRouter
                initialEntries={[{ pathname: "/confirmacion", state }]}
            >
                <Routes>
                    <Route path="/confirmacion" element={<Confirmacion />} />
                </Routes>
            </MemoryRouter>
        );
    };

    it("muestra mensaje si no hay información de compra", () => {
        renderWithRouter(undefined);
        expect(screen.getByText(/no hay información de compra/i)).toBeTruthy();
        expect(screen.getByRole("button", { name: /ir a la tienda/i })).toBeTruthy();
    });

    it("muestra los datos del pedido cuando hay información", () => {
        renderWithRouter({ form: mockForm, total: mockTotal });

        expect(screen.getByText(/gracias por tu compra/i)).toBeTruthy();
        expect(screen.getByText(/lucas@test\.com/i)).toBeTruthy();

        const totales = screen.getAllByText((_, element) => {
            const text = (element?.textContent || "").replace(/\s/g, "");
            return text.includes("15.000") || text.includes("15,000");
        });

        expect(totales.length).toBeGreaterThan(0);

        expect(
            screen.getByRole("button", { name: /volver al inicio/i })
        ).toBeTruthy();
    });

    it("muestra correctamente la modalidad de envío", () => {
        renderWithRouter({ form: mockForm, total: mockTotal });
        const modalidad = screen.getByText(/modalidad/i).textContent.toLowerCase();
        expect(modalidad.includes("envío a domicilio")).toBeTrue();
    });

    it("muestra correctamente la modalidad de retiro", () => {
        renderWithRouter({
            form: { ...mockForm, tipoEntrega: "retiro" },
            total: mockTotal,
        });
        const modalidad = screen.getByText(/modalidad/i).textContent.toLowerCase();
        expect(modalidad.includes("retiro en local")).toBeTrue();
    });
});

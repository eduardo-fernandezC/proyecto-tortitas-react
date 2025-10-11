import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Checkout } from "../../pages/Checkout";
import { CartContext } from "../../Context/CartContext";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";

describe("Página Checkout", () => {
    const mockVaciarCarrito = jasmine.createSpy("vaciarCarrito");

    const MockDestino = () => {
        const location = useLocation();
        window.__lastNavigation__ = location;
        return <div>Confirmación Mock</div>;
    };

    const mockCarrito = [
        { id: 1, nombre: "Torta Chocolate", precio: 10000, cantidad: 1 },
        { id: 2, nombre: "Trufa", precio: 5000, cantidad: 2 },
    ];

    const mockForm = {
        nombre: "Papu",
        correo: "papu@test.com",
        direccion: "Calle 123",
        tipoEntrega: "envio",
    };

    const renderCheckout = (carrito = mockCarrito, form = mockForm) => {
        delete window.__lastNavigation__;
        return render(
            <CartContext.Provider value={{ carrito, vaciarCarrito: mockVaciarCarrito }}>
                <MemoryRouter initialEntries={[{ pathname: "/checkout", state: { form } }]}>
                    <Routes>
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/confirmacion" element={<MockDestino />} />
                    </Routes>
                </MemoryRouter>
            </CartContext.Provider>
        );
    };

    it("muestra mensaje si no hay datos de compra", () => {
        renderCheckout([], null);
        expect(screen.getByText(/no hay datos de compra/i)).toBeTruthy();
    });

    it("renderiza correctamente los datos del cliente y productos", () => {
        renderCheckout();
        expect(screen.getByText(/revisá tu pedido/i)).toBeTruthy();
        expect(screen.getByText(/papu@test\.com/i)).toBeTruthy();
        expect(screen.getByText(/torta chocolate/i)).toBeTruthy();
        expect(screen.getByText(/trufa/i)).toBeTruthy();
    });

    it("vacía el carrito y navega a confirmación al confirmar compra", async () => {
        renderCheckout();

        const boton = screen.getByRole("button", { name: /confirmar compra/i });
        fireEvent.click(boton);

        expect(mockVaciarCarrito).toHaveBeenCalled();

        await waitFor(() => {
            expect(window.__lastNavigation__.pathname).toBe("/confirmacion");
            expect(window.__lastNavigation__.state.form).toEqual(mockForm);
            expect(window.__lastNavigation__.state.total).toBe(20000);
        });
    });
});

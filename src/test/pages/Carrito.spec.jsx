import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Carrito } from "../../pages/Carrito";
import { CartContext } from "../../Context/CartContext";
import { MemoryRouter } from "react-router-dom";

describe("Página Carrito", () => {
    const mockEliminar = jasmine.createSpy("eliminarDelCarrito");
    const mockVaciar = jasmine.createSpy("vaciarCarrito");

    const carritoEjemplo = [
        { id: 1, nombre: "Torta Chocolate", precio: 10000, cantidad: 2, imagen: "test.jpg" },
    ];

    const renderCarrito = (carrito = carritoEjemplo) => {
        render(
            <MemoryRouter>
                <CartContext.Provider
                    value={{ carrito, eliminarDelCarrito: mockEliminar, vaciarCarrito: mockVaciar }}
                >
                    <Carrito />
                </CartContext.Provider>
            </MemoryRouter>
        );
    };

    it("muestra mensaje cuando el carrito está vacío", () => {
        renderCarrito([]);
        expect(screen.getByText("Tu carrito está vacío")).toBeTruthy();
    });

    it("muestra productos del carrito y el total correcto", () => {
        renderCarrito(carritoEjemplo);
        expect(screen.getByText("Torta Chocolate")).toBeTruthy();

        expect(
            screen.getByText((content) => /Total:\s*\$\s*20[.,]000/.test(content))
        ).toBeTruthy();
    });

    it("llama a eliminarDelCarrito al hacer clic en Eliminar", () => {
        renderCarrito(carritoEjemplo);
        fireEvent.click(screen.getByText("Eliminar"));
        expect(mockEliminar).toHaveBeenCalledWith(1);
    });
});

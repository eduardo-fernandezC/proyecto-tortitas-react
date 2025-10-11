import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { DetalleProducto } from "../../pages/DetalleProducto";
import { CartContext } from "../../Context/CartContext";

describe("Página DetalleProducto", () => {
    const mockAgregarAlCarrito = jasmine.createSpy("agregarAlCarrito");

    const renderWithRouter = (id = "1") => {
        render(
            <MemoryRouter initialEntries={[`/productos/${id}`]}>
                <CartContext.Provider value={{ agregarAlCarrito: mockAgregarAlCarrito }}>
                    <Routes>
                        <Route path="/productos/:id" element={<DetalleProducto />} />
                    </Routes>
                </CartContext.Provider>
            </MemoryRouter>
        );
    };

    it("muestra correctamente la información del producto", () => {
        renderWithRouter("1");
        expect(screen.getByText(/Dulce Tarde/i)).toBeTruthy();
        expect(screen.getByText(/Bizcocho de chocolate/i)).toBeTruthy();

        const precio = screen.getByText((content) =>
            content.replace(/\s+/g, "").includes("Precio:$6.500")
        );
        expect(precio).toBeTruthy();
    });

    it("ejecuta la función agregarAlCarrito al hacer clic en el botón", () => {
        renderWithRouter("1");
        const boton = screen.getByRole("button", { name: /agregar al carrito/i });
        fireEvent.click(boton);
        expect(mockAgregarAlCarrito).toHaveBeenCalled();
    });

    it("muestra mensaje de producto no encontrado si el id no existe", () => {
        renderWithRouter("99");
        expect(screen.getByText(/producto no encontrado/i)).toBeTruthy();
    });

    it("contiene enlace para volver a la lista de productos", () => {
        renderWithRouter("1");
        const link = screen.getByRole("link", { name: /volver a productos/i });
        expect(link.getAttribute("href")).toBe("/productos");
    });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Productos } from "../../pages/Productos";

describe("Página Productos", () => {
    it("renderiza correctamente el título de la página", () => {
        render(
            <MemoryRouter>
                <Productos />
            </MemoryRouter>
        );
        expect(screen.getByText(/productos/i)).toBeTruthy();
    });

    it("muestra al menos una tarjeta de producto", () => {
        render(
            <MemoryRouter>
                <Productos />
            </MemoryRouter>
        );
        const cards = document.querySelectorAll(".product-card, img");
        expect(cards.length).toBeGreaterThan(0);
    });

    it("muestra precios en formato de dinero", () => {
        render(
            <MemoryRouter>
                <Productos />
            </MemoryRouter>
        );
        const precios = screen.queryAllByText(/\d{3,}/);
        expect(precios.length).toBeGreaterThan(0);
    });
});

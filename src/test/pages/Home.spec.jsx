import React from "react";
import { render, screen } from "@testing-library/react";
import { Home } from "../../pages/Home";

describe("Página Home", () => {
    it("renderiza correctamente el título principal", () => {
        render(<Home />);
        expect(screen.getByText(/Productos Destacados/i)).toBeTruthy();
    });

    it("muestra el carrusel de imágenes", () => {
        render(<Home />);
        const carrusel = document.querySelector(".carousel");
        expect(carrusel).toBeTruthy();
    });

    it("contiene enlaces al catálogo de productos en cada slide", () => {
        render(<Home />);
        const links = screen.getAllByRole("link", { name: /catálogo completo/i });
        expect(links.length).toBeGreaterThan(0);
        links.forEach((link) => {
            expect(link.getAttribute("href")).toContain("/productos");
        });
    });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { Blog } from "../../pages/Blog";

const MockTitle = ({ text }) => <h1>{text}</h1>;

Blog.__Rewire__?.("Title", MockTitle);

describe("Página Blog", () => {
    beforeEach(() => {
        render(<Blog />);
    });

    it("renderiza el título principal del blog", () => {
        const title = screen.getByText("Blog de TORTITAS.CL");
        expect(title).toBeTruthy();
    });

    it("renderiza las cuatro secciones del blog (incluye '¿QUIÉNES SOMOS?')", () => {
        const posts = screen.getAllByRole("heading", { level: 2 });
        expect(posts.length).toBe(4);
    });

    it("renderiza las imágenes con su texto alternativo correcto", () => {
        const images = screen.getAllByRole("img");
        expect(images.length).toBe(4);

        expect(images[0].getAttribute("alt")).toContain("Logo Tortitas.CL");
        expect(images[1].getAttribute("alt")).toContain("Cómo hacemos nuestras tortitas");
    });
});

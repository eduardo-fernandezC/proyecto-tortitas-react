import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ProductCard } from "../../../components/molecules/ProductCard";

describe("ProductCard Component", () => {
  const mockProduct = {
    id: 1,
    nombre: "Torta de Chocolate",
    precio: 15000,
    imagen: "/assets/images/cake.webp",
  };

  it("muestra nombre y precio correctamente", () => {
    render(
      <BrowserRouter>
        <ProductCard {...mockProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText("Torta de Chocolate")).toBeTruthy();
    expect(screen.getByText(/Precio:/)).toBeTruthy();
  });

  it("tiene el enlace al detalle del producto", () => {
    render(
      <BrowserRouter>
        <ProductCard {...mockProduct} />
      </BrowserRouter>
    );
    const links = screen.getAllByRole("link");
    const productLink = links.find((link) => link.getAttribute("href") === "/detalle/1");
    expect(productLink).toBeTruthy();
  });
});
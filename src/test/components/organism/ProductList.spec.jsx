import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductList } from "../../../components/organisms/ProductList";

describe("ProductList Component", () => {
  const productos = [
    { id: 1, nombre: "Dulce Tarde", precio: 6500, imagen: "cake.jpg" },
    { id: 2, nombre: "Trufa", precio: 5500, imagen: "trufa.jpg" },
  ];

  it("renderiza la lista de productos correctamente", () => {
    render(
      <MemoryRouter>
        <ProductList productos={productos} />
      </MemoryRouter>
    );
    expect(screen.getByText("Dulce Tarde")).toBeTruthy();
    expect(screen.getByText("Trufa")).toBeTruthy();
  });

  it("muestra los precios de los productos", () => {
    render(
      <MemoryRouter>
        <ProductList productos={productos} />
      </MemoryRouter>
    );

    const precios = screen.getAllByText(/Precio:/i);
    expect(precios.length).toBe(2); 

    expect(screen.getByText(/6\.500|6500/)).toBeTruthy();
    expect(screen.getByText(/5\.500|5500/)).toBeTruthy();
  });
});

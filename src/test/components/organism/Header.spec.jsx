import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "../../../components/organisms/Header";
import { CartContext } from "../../../Context/CartContext";

describe("Header Component", () => {
  const mockNavigate = jasmine.createSpy("navigate");
  const mockCart = [
    { id: 1, nombre: "Torta", cantidad: 2, precio: 6500 },
    { id: 2, nombre: "Cupcake", cantidad: 1, precio: 2000 },
  ];

  const renderHeader = (logueado = false) => {
    localStorage.setItem("usuario", logueado ? JSON.stringify({ nombre: "Test" }) : "");
    render(
      <CartContext.Provider value={{ carrito: mockCart }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartContext.Provider>
    );
  };

  it("renderiza correctamente el logo y los enlaces de navegación", () => {
    renderHeader();
    expect(screen.getByText("TORTITAS.CL")).toBeTruthy();
    expect(screen.getByText("Inicio")).toBeTruthy();
    expect(screen.getByText("Productos")).toBeTruthy();
    expect(screen.getByText("Blog")).toBeTruthy();
    expect(screen.getByText("Contacto")).toBeTruthy();
  });

  it("muestra el contador del carrito correctamente", () => {
    renderHeader();
    const badge = screen.getByText("3"); // 2 + 1 productos
    expect(badge).toBeTruthy();
  });

  it("muestra el botón de iniciar sesión cuando no hay usuario logueado", () => {
    localStorage.removeItem("usuario");
    renderHeader(false);
    expect(screen.getByText("Iniciar sesión")).toBeTruthy();
  });

  it("muestra el botón de cerrar sesión cuando hay usuario logueado", () => {
    renderHeader(true);
    expect(screen.getByText("Cerrar sesión")).toBeTruthy();
  });
});
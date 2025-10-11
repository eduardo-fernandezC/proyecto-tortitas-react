import React, { useContext } from "react";
import { render, screen, act } from "@testing-library/react";
import { CartContext, CartProvider } from "../../Context/CartContext";

const TestComponent = () => {
  const { carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito } = useContext(CartContext);
  return (
    <div>
      <p data-testid="count">{carrito.length}</p>
      <button onClick={() => agregarAlCarrito({ id: 1, nombre: "Torta", precio: 1000 })}>Agregar</button>
      <button onClick={() => eliminarDelCarrito(1)}>Eliminar</button>
      <button onClick={vaciarCarrito}>Vaciar</button>
    </div>
  );
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("inicia con un carrito vacío", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(screen.getByTestId("count").textContent).toBe("0");
  });

  it("agrega productos al carrito", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText("Agregar").click();
    });

    expect(screen.getByTestId("count").textContent).toBe("1");
  });

  it("elimina productos del carrito", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText("Agregar").click();
    });

    act(() => {
      screen.getByText("Eliminar").click();
    });

    expect(screen.getByTestId("count").textContent).toBe("0");
  });

  it("vacía completamente el carrito", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText("Agregar").click();
      screen.getByText("Agregar").click();
    });

    act(() => {
      screen.getByText("Vaciar").click();
    });

    expect(screen.getByTestId("count").textContent).toBe("0");
  });
});
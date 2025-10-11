import React from "react";
import { render, screen } from "@testing-library/react";
import { Title } from "../../../components/atoms/Title";

describe("Title Component", () => {
  it("renderiza el texto correctamente", () => {
    render(<Title text="Título de prueba" />);
    expect(screen.getByText("Título de prueba")).toBeTruthy();
  });

  it("usa el tamaño correcto de encabezado", () => {
    render(<Title text="Subtítulo" size="h3" />);
    const element = screen.getByText("Subtítulo");
    expect(element.tagName).toBe("H3");
  });
});
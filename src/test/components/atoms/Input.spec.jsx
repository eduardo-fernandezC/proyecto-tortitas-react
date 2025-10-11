import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../../../components/atoms/Input";

describe("Input Component", () => {
  it("muestra la etiqueta correctamente", () => {
    render(<Input label="Nombre" name="nombre" />);
    expect(screen.getByText("Nombre")).toBeTruthy();
  });

  it("dispara el evento onChange correctamente", () => {
    const mockChange = jasmine.createSpy("onChange");
    render(<Input label="Correo" name="correo" onChange={mockChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test@test.com" } });
    expect(mockChange).toHaveBeenCalled();
  });
});
import React from "react";
import { render, screen } from "@testing-library/react";
import { FormField } from "../../../components/molecules/FormField";

describe("FormField Component", () => {
  it("renderiza el campo de formulario con su etiqueta", () => {
    render(<FormField label="Correo" name="email" />);
    expect(screen.getByText("Correo")).toBeTruthy();
  });

  it("incluye el input correspondiente", () => {
    render(<FormField label="Nombre" name="nombre" />);
    expect(screen.getByRole("textbox")).toBeTruthy();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "../../../components/organisms/Footer";

describe("Footer Component", () => {
  it("renderiza el nombre de la marca", () => {
    render(<Footer />);
    expect(screen.getByText("TORTITAS.CL")).toBeTruthy();
  });

  it("muestra la información de contacto", () => {
    render(<Footer />);
    expect(screen.getByText(/contacto@tortitas.cl/i)).toBeTruthy();
  });

  it("muestra el año actual en el copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeTruthy();
  });
});
import React from "react";
import { render, screen } from "@testing-library/react";
import { CarouselHome } from "../../../components/organisms/CarouselHome";

describe("CarouselHome Component", () => {
  const images = [
    { src: "img1.jpg", title: "Imagen 1" },
    { src: "img2.jpg", title: "Imagen 2" },
  ];

  it("renderiza todas las imágenes", () => {
    render(<CarouselHome images={images} />);
    expect(screen.getByAltText("Imagen 1")).toBeTruthy();
    expect(screen.getByAltText("Imagen 2")).toBeTruthy();
  });

  it("muestra los títulos de las imágenes", () => {
    render(<CarouselHome images={images} />);
    expect(screen.getByText("Imagen 1")).toBeTruthy();
    expect(screen.getByText("Imagen 2")).toBeTruthy();
  });
});
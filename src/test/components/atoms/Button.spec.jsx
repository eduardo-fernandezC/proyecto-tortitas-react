import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../../../components/atoms/Button";

describe("Button Component", () => {
  it("renderiza el texto correctamente", () => {
    render(<Button text="Haz click" />);
    expect(screen.getByText("Haz click")).toBeTruthy();
  });

  it("ejecuta la función onClick al hacer click", () => {
    const mockFn = jasmine.createSpy("onClick");
    render(<Button text="Click" onClick={mockFn} />);
    fireEvent.click(screen.getByText("Click"));
    expect(mockFn).toHaveBeenCalled();
  });
});
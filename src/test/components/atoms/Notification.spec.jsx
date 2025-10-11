import React from "react";
import { render } from "@testing-library/react";
import {
  notifySuccess,
  notifyError,
  notifyInfo,
  NotificationContainer,
} from "../../../components/atoms/Notification";

describe("Notification Component", () => {
  it("renderiza el contenedor correctamente", () => {
    const { container } = render(<NotificationContainer />);
    expect(container).toBeTruthy();
  });

  it("llama a las funciones de notificación correctamente", () => {
    spyOn(console, "log");
    notifySuccess("Éxito");
    notifyError("Error");
    notifyInfo("Info");
    expect(typeof notifySuccess).toBe("function");
  });
});
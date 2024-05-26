import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmptyDataMessage from "../src/components/EmptyDataMessage";
import { User } from "@phosphor-icons/react";
import React from "react";

describe("EmptyDataMessage Component", () => {
  it("renders the message", () => {
    render(<EmptyDataMessage />);
    expect(
      screen.getByText("Selecione um cliente para visualizar os dados.")
    ).toBeInTheDocument();
  });
});

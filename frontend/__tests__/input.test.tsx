import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input, { Option } from "../src/components/Input";
import { Formik } from "formik";
import React from "react";
import { vi } from "vitest";

describe("Input Component", () => {
  it("renders input with placeholder and label", () => {
    render(
      <Input
        id="test-input"
        placeholder="Enter text"
        label="Test Label"
        type="text"
      />
    );
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders select with options", () => {
    const options: Option[] = [
      { text: "Option 1", value: "1" },
      { text: "Option 2", value: "2" },
    ];
    render(
      <Input
        id="test-select"
        placeholder="Select an option"
        label="Test Select"
        type="select"
        options={options}
      />
    );

    // Abre o dropdown
    fireEvent.click(screen.getByTestId("test-select"));

    // Verifica as opções no dropdown
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("calls selectCallback on selecting an option", () => {
    const selectCallback = vi.fn();
    const options: Option[] = [
      { text: "Option 1", value: "1" },
      { text: "Option 2", value: "2" },
    ];
    render(
      <Input
        id="test-select"
        placeholder="Select an option"
        label="Test Select"
        type="select"
        options={options}
        selectCallback={selectCallback}
      />
    );

    // Abre o dropdown
    fireEvent.click(screen.getByTestId("test-select"));

    // Seleciona uma opção
    fireEvent.click(screen.getByText("Option 1"));

    // Verifica se o callback foi chamado com o valor correto
    expect(selectCallback).toHaveBeenCalledWith("1");
  });
  it("closes dropdown when clicking outside", () => {
    const options: Option[] = [
      { text: "Option 1", value: "1" },
      { text: "Option 2", value: "2" },
    ];
    render(
      <Input
        id="test-select"
        placeholder="Select an option"
        label="Test Select"
        type="select"
        options={options}
      />
    );

    // Abre o dropdown
    fireEvent.click(screen.getByTestId("test-select"));

    // Verifica se as opções são exibidas
    expect(screen.getByText("Option 1")).toBeInTheDocument();

    // Clica fora do dropdown
    fireEvent.mouseDown(document);

    // Verifica se as opções não são mais exibidas
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });
});

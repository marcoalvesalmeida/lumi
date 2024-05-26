import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../src/components/Button";
import { vi } from "vitest";

describe("Button Component", () => {
  it("renders the button with children", () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick handler when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>
    );
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies the disabled styles when disabled", () => {
    render(
      <Button onClick={() => {}} disabled>
        Click Me
      </Button>
    );
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass(
      "disabled:bg-blue-300 disabled:cursor-not-allowed"
    );
    expect(button).toBeDisabled();
  });
});

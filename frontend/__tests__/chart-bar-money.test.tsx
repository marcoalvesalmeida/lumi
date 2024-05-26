import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BarChartMoney, { MoneyData } from "../src/components/ChartBarMoney";
import { Bar } from "react-chartjs-2";
import React from "react";
import { vi } from "vitest";

vi.mock("react-chartjs-2", () => ({
  Bar: vi.fn(() => <div data-testid="bar-chart" />),
}));

describe("BarChartMoney Component", () => {
  const data: MoneyData[] = [
    { cost: 1000, economy: 500, month: "January" },
    { cost: 1500, economy: 750, month: "February" },
    { cost: 2000, economy: 1000, month: "March" },
  ];

  it("renders the Bar chart", () => {
    render(<BarChartMoney data={data} />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  it("passes the correct data to the Bar chart", () => {
    render(<BarChartMoney data={data} />);

    const expectedChartData = {
      labels: ["January", "February", "March"],
      datasets: [
        {
          label: "Valor Total sem GD (R$)",
          data: [1000, 1500, 2000],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Economia GD (R$)",
          data: [500, 750, 1000],
          backgroundColor: "rgba(37, 99, 235, 0.5)",
          borderColor: "rgba(37, 99, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    expect(Bar).toHaveBeenCalledWith(
      expect.objectContaining({ data: expectedChartData }),
      {}
    );
  });
});

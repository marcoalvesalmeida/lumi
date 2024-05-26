import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BarChartKwh, { KwhData } from "../src/components/ChartBarKwh";
import { Bar } from "react-chartjs-2";
import React from "react";
import { vi } from "vitest";

vi.mock("react-chartjs-2", () => ({
  Bar: vi.fn(() => <div data-testid="bar-chart" />),
}));

describe("BarChartKwh Component", () => {
  const data: KwhData[] = [
    { kwh: 100, kwhGD: 50, month: "January" },
    { kwh: 150, kwhGD: 75, month: "February" },
    { kwh: 200, kwhGD: 100, month: "March" },
  ];

  it("renders the Bar chart", () => {
    render(<BarChartKwh data={data} />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  it("passes the correct data to the Bar chart", () => {
    render(<BarChartKwh data={data} />);

    const expectedChartData = {
      labels: ["January", "February", "March"],
      datasets: [
        {
          label: "Consumo (kWh)",
          data: [100, 150, 200],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Energia Compensada (kWh)",
          data: [50, 75, 100],
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

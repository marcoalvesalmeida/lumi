// BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export type MoneyData = {
  cost: number;
  economy: number;
  month: string;
};

interface Props {
  data: MoneyData[];
}

const BarChartMoney: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Valor Total sem GD (R$)",
        data: data.map((item) => item.cost),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Economia GD (R$)",
        data: data.map((item) => item.economy),
        backgroundColor: "rgba(37, 99, 235, 0.5)",
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChartMoney;

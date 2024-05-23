// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type KwhData = {
     kwh: number, 
     kwhGD: number, 
     month: string 
}

interface Props {
  data: KwhData[]
}

const BarChartKwh: React.FC<Props> = ({data}) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Consumo (kWh)',
        data: data.map(item => item.kwh),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Geração Distribuída (kWhGD)',
        data: data.map(item => item.kwhGD),
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  return <Bar data={chartData} />;
};

export default BarChartKwh;

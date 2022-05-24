import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const BarChart = () => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Objem plynu',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: 'blue',

      },
      {
        label: 'Nakoupeno',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: 'hotpink',
      },
    ],
  };

  return (
    <>
    <Bar options={options} data={data} />
    </>
  )
}

export default BarChart

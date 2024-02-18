import React from 'react';
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
import { baseURL, getBgColor, getSolidColor } from 'utils/constants';
import { useEffect } from 'react';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Sleep Chart',
    },
  },
};



export function VerticalBarChart() {
  const labels = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  // const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [data,setData] = useState({
    labels,
    datasets: [
      {
        label: 'Week 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Week 2',
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  useEffect(() => {
    fetch(baseURL + '/weeklySleepCount/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token')
      }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setData({
            labels,
            datasets: [
              {
                label: 'Week 1',
                data: data["week1"],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Week 2',
                data: data["week2"],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          });
          console.log(data);
        });
      } else {
        response.json().then((data) => {
          console.log(data);
        });
      }
    });
  }, []);
  return <Bar options={options} data={data} />;
}

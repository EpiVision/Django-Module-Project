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
  indexAxis: 'y' as const,
  maintainAspectRatio: false,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Seizure Chart',
    },
  },
};


export const BarChart = () => {
  const labels = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  
  const [data,setData] = useState({
    labels,
    datasets: [
      {
        label: 'Week 1',
        data: [6,3,2,4,6,2,5],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Week 2',
        data: [5,4,3,2,1,2,3],
        borderColor: 'rgb(53, 162, 25)',
        backgroundColor: 'rgba(53, 162, 25, 0.5)',
      },
    ],
  });

  useEffect(() => {
    fetch(baseURL + '/weeklySeizureCount/', {
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
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Week 2',
                data: data["week2"],
                borderColor: 'rgb(53, 162, 25)',
                backgroundColor: 'rgba(53, 162, 25, 0.5)',
              },
            ],
          });
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

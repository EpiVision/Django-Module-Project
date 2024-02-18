import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { baseURL, getBgColors, getSolidColors } from 'utils/constants';
import { useEffect } from 'react';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  maintainAspectRatio: true,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    // legend: {
    //   position: 'bottom' as const,
    // },
    title: {
      display: true,
      text: 'Activity Distribution',
    },
  },
};


export function PieChart() {
  const [data,setData] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetch(baseURL + '/activitiesOfDayCount/', {
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
            labels:data['activities_name'],
            datasets: [
              {
                label: '# of Votes',
                data: data['activities_count'],
                backgroundColor: getBgColors(data['activities_count'].length),
                borderColor: getSolidColors(data['activities_count'].length),
                borderWidth: 1,
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
  

  return <Pie data={data} options={options}/>;
}
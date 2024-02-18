import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { baseURL, getBgColor, getSolidColor } from 'utils/constants';
import { useEffect } from 'react';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Activity Trend - Last Week'
    }
  }
};


export function LineChart() {
  const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [data,setData] = useState({
    labels,
    datasets: [
      {
        label: 'Activity 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Activity 2',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  });
  useEffect(() => {
    fetch(baseURL + '/getActivityTrend/', {
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
            datasets: data['activities'].map((activity: any, index: number) => {
              return {
                label: activity.activity_name,
                data: activity.week_count,
                borderColor: getSolidColor()[index],
                backgroundColor: getBgColor()[index]
              };
            })
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
  
  return <Line options={options} data={data} />;
}

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
// import TimelineChart from './TimelineChart';
import { useState, useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);
// call api to get data from http://127.0.0.1:8000/getActivities/

const backgroundColor = [
  'rgba(255, 99, 132, 0.4)',
  'rgba(54, 162, 235, 0.4)',
  'rgba(255, 206, 86, 0.4)',
  'rgba(75, 192, 192, 0.4)',
  'rgba(153, 102, 255, 0.4)',
  'rgba(255, 159, 64, 0.4)',
]

const borderColor= [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
]

const events = [
  {
    start_time: '09:00',
    end_time: '10:00',
    activity_name: 'Event 1',
  },
  {
    start_time: '10:20',
    end_time: '10:55',
    activity_name: 'Event 2',
  },
  {
    start_time: '11:20',
    end_time: '11:55',
    activity_name: 'Event 3',
  },
  // Add more events as needed
];
function countElements(arr: any[]) {
  const count: {[key: string]: number} = {};
  arr.forEach((element:any) => {
    count[element.toLowerCase()] = (count[element.toLowerCase()] || 0) + 1;
  });
  return count;
}

export function PieChartYD() {
  const [data1, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/getActivities/';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data1 => {
        setData(data1);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // get count of each activity 
  const acts = countElements(data1.map((item: any) => item.activity_name));
  
  const data = {
    labels: Object.keys(acts),
    datasets: [
      {
        label: '# of Activities',
        data: Object.values(acts),
        backgroundColor: backgroundColor.slice(0, Object.keys(acts).length),
        borderColor: borderColor.slice(0, Object.keys(acts).length),
        borderWidth: 1,
      },
    ],
  };
  

  const divStyle = {
    height: '400px',
    width: '400px',
    padding: '20px',
    border: '1px solid blue',
  };
  return <>
      <Pie data={data} />;
  </>
}
export default PieChartYD;
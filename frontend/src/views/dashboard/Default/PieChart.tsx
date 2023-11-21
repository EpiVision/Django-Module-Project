import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { baseURL } from 'utils/constants';
import { useState, useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);
// call api to get data from http://127.0.0.1:8000/getActivities/

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

function countElements(arr: any[]) {
  const count: {[key: string]: number} = {};
  arr.forEach((element:any) => {
    count[element.toLowerCase()] = (count[element.toLowerCase()] || 0) + 1;
  });
  return count;
}

export function PieChart() {
  const [data1, setData] = useState<ChartData>({labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiUrl = baseURL+'/getHorizontalBarChart/';
    
    setLoading(true);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data1 => {
        console.log('This is your data', data1);
        setData(data1);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // get count of each activity 
  // const acts = countElements(data1.map((item: any) => item));
  // console.log('This is acts',acts)
  
  // const data = {
  //   labels: Object.keys(acts),
  //   datasets: [
  //     {
  //       label: '# of Activities',
  //       data: Object.values(acts),
  //       backgroundColor: backgroundColor.slice(0, Object.keys(acts).length),
  //       borderColor: borderColor.slice(0, Object.keys(acts).length),
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const options = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      // legend: {
      //   position: 'right' as const,
      // },
      title: {
        display: true,
        text: 'Food Chart',
      },
    },
  };

  const divStyle = {
    height: '400px',
    width: '400px',
    padding: '20px',
    border: '1px solid blue',
  };
  return <div>
      <Pie options={options} data={data1} />
  </div>
}
export default PieChart;
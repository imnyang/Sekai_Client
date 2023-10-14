import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chart({ dataKey }) {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/info/${dataKey}`);
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      }
    } catch (error) {
      console.error('데이터를 가져오는 동안 오류 발생: ', error);
    }
  };

  useEffect(() => {
    fetchData(); // 초기 데이터 로딩

    const interval = setInterval(() => {
      fetchData(); // 10초마다 데이터를 갱신
    }, 1000);

    return () => {
      clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    };
  }, [dataKey]);

  if (data === null) {
    // 데이터 로딩 중 또는 오류 처리
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: [`${dataKey} 미사용`, `${dataKey} 사용 중`],
    datasets: [
      {
        label: '%',
        data: [data.notuse, data.use],
        backgroundColor: ['rgba(0, 0, 0, 0.2)', 'rgba(255, 255, 255, 0.2)'],
        borderColor: ['rgba(0, 0, 0, 1)', 'rgba(255, 255, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const renderUnit = dataKey === 'cpu' ? '%' : 'MB';

  return (
    <div className='chart'>
      <Pie data={chartData} options={{ maintainAspectRatio: false }} />
      <p>{dataKey} : {data.usage.used}{renderUnit} / {data.usage.total}{renderUnit}</p>
    </div>
  );
}

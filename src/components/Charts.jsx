import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Charts = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.2)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: [65, 59, 80, 81, 56, 55, 40, 20, 40, 40, 80, 100],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Sample Line Charts',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            }
          },
        });
    
        return () => {
          myChart.destroy();
        };
      }, []);

  return (
    <>
  
    <div className="bar-chart" >
        <canvas ref={chartRef} />
    </div>
    </>
  )
}

export default Charts
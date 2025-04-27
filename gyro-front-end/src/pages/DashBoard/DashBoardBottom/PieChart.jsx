import React from 'react';
import { Pie } from 'react-chartjs-2';
import './StyleGeral.css';


const PieChart = ({ data }) => {
    const chartData = {
        // labels: data.map(item => item.productName),
        datasets: [
            {
                data: data.map(item => item.totalQuantity),
                backgroundColor: ['#FFA726', '#FFB300', '#FFD54F', '#FF7043 ', '#FF5722', '#FF8A65', '#FF7043', '#FF3D00', '#F4511E', '#FF5722', '#FF6F00'],
                hoverBackgroundColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
                borderWith: 0,
                borderColor: 'transparent',
                borderRadius: 4,
            },
        ],
    };

    return (
        <div className="pie-chart">
            <Pie data={chartData} />
        </div>
    );
};

export default PieChart;

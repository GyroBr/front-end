import React from 'react';
import { Pie } from 'react-chartjs-2';
import './StyleGeral.css';

const PieChart = ({ data }) => {
    if (!data || data.length === 0) return <div>Nenhum dado para exibir</div>;

    // Função para extrair o nome do produto de diferentes estruturas
    const getProductName = (item) => {
        return item.productName || item.name || item.product?.name || 'Produto';
    };

    // Função para extrair a quantidade de diferentes estruturas
    const getProductQuantity = (item) => {
        return item.totalQuantity || item.quantity || item.salesCount || 0;
    };

    const chartData = {
        labels: data.map(item => getProductName(item)),
        datasets: [
            {
                data: data.map(item => getProductQuantity(item)),
                backgroundColor: [
                    '#FFA726', '#FFB300', '#FFD54F', '#FF7043', '#FF5722', 
                    '#FF8A65', '#FF7043', '#FF3D00', '#F4511E', '#FF6F00'
                ],
                borderWidth: 0,
                borderColor: 'transparent',
                borderRadius: 4,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    font: {
                        size: 12,
                    },
                    padding: 20,
                    usePointStyle: true,
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.raw} vendas`;
                    }
                }
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div className="pie-chart" >
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
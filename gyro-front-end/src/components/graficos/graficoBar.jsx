import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoBar = ({ orders }) => {

    const horas = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
    const pedidosPorHorario = new Array(horas.length).fill(0);

    orders.forEach(order => {
        const horaPedido = new Date(order.createdAt).getHours();
        const indexHorario = Math.floor(horaPedido / 4);
        if (indexHorario >= 0 && indexHorario < horas.length) {
            pedidosPorHorario[indexHorario]++;
        }
    });

    const data = {
        labels: horas,
        datasets: [
            {
                label: 'Pedidos durante o dia',
                data: pedidosPorHorario,
                backgroundColor: '#FFA34E',
                borderWidth: 1,
                borderColor: 'transparent',
                borderRadius: 5,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default GraficoBar;
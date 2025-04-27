import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Grafico = ({ dataOrders }) => {
    // Agrupa os pedidos por funcionário e conta quantos cada um realizou
    const ordersByEmployee = dataOrders.reduce((acc, order) => {
        const employeeName = order.employee.name;
        acc[employeeName] = (acc[employeeName] || 0) + 1; // Incrementa o contador do funcionário
        return acc;
    }, {});

    // Extrai os nomes dos funcionários e as respectivas quantidades
    const employeeNames = Object.keys(ordersByEmployee);
    const employeeOrderCounts = Object.values(ordersByEmployee);

    // Gera cores únicas para cada funcionário
    const generateColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            // Gera cores aleatórias em formato hexadecimal
            colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        }
        return colors;
    };

    const backgroundColors = generateColors(employeeNames.length);

    // Configuração do gráfico
    const data = {
        labels: employeeNames, // Nomes dos funcionários
        datasets: [
            {
                label: 'Pedidos por Funcionário',
                data: employeeOrderCounts, // Quantidade de pedidos por funcionário
                backgroundColor: ['#FFA858', '#FFC36A', '#F08615'],
                hoverBackgroundColor: ['#FFA34E', '#FFA34E'].map(
                    (color) => color + 'CC' // Adiciona opacidade ao hover
                ),
                borderWith: 0,
                borderColor: 'transparent',
                borderRadius: 6,
            },
        ],
    };

    return <Pie data={data} />;
};

export default Grafico;

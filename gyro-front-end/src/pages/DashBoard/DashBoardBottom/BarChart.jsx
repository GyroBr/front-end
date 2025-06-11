import React, { useEffect, useState } from "react";
import style from './BarChart.module.css';
import PaymentChart from '../DashBoard/PaymentChart';
import CardTop from '../CadsTop/CardTop';
import {getAllOrders} from "../../../services/history/history";


const BarChart = () => {

    const [orders, setOrders] = useState([]);
    const [data, setData] = useState([
        { day: 'Segunda', value: 0 },
        { day: 'Terça', value: 0 },
        { day: 'Quarta', value: 25 },
        { day: 'Quinta', value: 0 },
        { day: 'Sexta', value: 0 },
        { day: 'Sábado', value: 0 },
        { day: 'Domingo', value: 0 }
    ]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        const fetchOrders = async () => {
            try {
                const response = await getAllOrders(token); 
                const data = response.data;
                setOrders(data);
                
            } catch (error) {
                console.error('Erro ao buscar orders:', error);
            }
        };

        fetchOrders();

        // Atualiza os dados do gráfico a cada 3 segundos
        const interval = setInterval(() => {
            const updatedData = data.map(item => ({
                ...item,
                value: Math.floor(Math.random() * 7) // Valores aleatórios entre 0 e 100
            }));
            setData(updatedData);
        }, 30000000);

        // Limpa o intervalo ao desmontar o componente
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div style={{
                width: '100%',
            }}>
                <CardTop />
                <div className={style.bouth_dash}>

                    <div className={style.barChartContainer}>
                        <div className={style.yAxisLabels}>
                            {[100, 80, 60, 40, 20, 0].map((label, index) => (
                                <span key={index}>{label}</span>
                            ))}
                        </div>
                        <div className={style.barChart}>
                            {data.map((item, index) => (
                                <div key={index} className={style.barContainer}>
                                    <div
                                        className={style.bar}
                                        style={{
                                            height: `${item.value}px`,
                                            transition: 'height 0.5s ease-in-out'
                                        }}
                                    ></div>
                                    <p>{item.day}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <PaymentChart ordersData={orders} />
                </div>
            </div>
        </>
    );
};

export default BarChart;

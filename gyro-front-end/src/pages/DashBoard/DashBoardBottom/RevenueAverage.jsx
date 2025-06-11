import React, { useEffect, useState } from "react";
import {getTotalSales} from "../../../services/history/history";

import './StyleGeral.css';

const RevenueAverage = () => {

    const token = sessionStorage.getItem('token');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            
            try {
                const response = await getTotalSales(token);
                const data = response.data;
                
                // console.log('data revenue average', data);
                
                setOrders(data);
            } catch (error) {
                console.error('Erro ao buscar orders:', error);
            }
        };

        fetchOrders();
    }, []);

        const totalValueOfSales = orders.totalValueOfSales;
        const total = totalValueOfSales ? totalValueOfSales : 0;
        const totalMonth = total / 12;
        const totalDay = total / 30;
        // console.log('totalValueOfSales => ', totalValueOfSales);
        
        // console.log('orders => ', orders.totalValueOfSales);
        
        // const total = orders.totalValueOfSales;


    return (
        <div className="revenue-average">
            <h3>Média de Faturamento</h3>
            <div className="revenue-values">
                <div className="revenue-item">
                    <p>Mensal</p>
                    <span>R$ {totalMonth.toFixed(2)}</span>
                </div>
                <div className="revenue-item">
                    <p>Diária</p>
                    <span>R$ {totalDay.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};


export default RevenueAverage;

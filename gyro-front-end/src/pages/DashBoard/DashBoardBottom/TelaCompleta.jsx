import React, { useEffect, useState } from "react";
import TopProducts from './TopProducts';
import RevenueAverage from './RevenueAverage';
import PieChart from './PieChart';
import BarChart from './BarChart';
import './StyleGeral.css';
import {getTotalSales} from "../../../services/history/history";

const TelaCompleta = () => {

    // const token = sessionStorage.getItem('token');
    // const [orders, setOrders] = useState([]);

    // useEffect(() => {
    //     const fetchOrders = async () => {
            
    //         try {
    //             const response = await getTotalSales(token);
    //             const data = response.data;
    //             console.log('response orders tela completa ==> ', response);
    //             console.log('data orders tela completa ==> ', data);
                
    //             setOrders(data);
    //         } catch (error) {
    //             console.error('Erro ao buscar orders:', error);
    //         }
    //     };

    //     fetchOrders();
    // }, []);

    
    return (
        <div className="dashboard">
            {/* <PieChart />   */}
            <BarChart/>
            <RevenueAverage
            //  data={orders}
             />
            <TopProducts />
        </div>
    );
};

export default TelaCompleta;

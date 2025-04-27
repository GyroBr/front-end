import React, { useEffect, useState } from 'react';
import './StyleGeral.css';
import PieChart from "./PieChart";
import { getBestSeller } from '../../../services/history/history';

const TopProducts = () => {

    const [bestSales, setBestSales] = useState([]);
    const token = sessionStorage.getItem("token");

    useEffect(() => {

        const fetchBestSales = async () => {
            try {
                const response = await getBestSeller(token);
                const data = response.data;

                setBestSales(response);

            } catch (error) {
                console.log(error)
            }

        }

        fetchBestSales();

    }, [])




    return (
        <div className="top-products">
            <div className='div_lista_top_products'>
                <h3>Produtos mais vendidos</h3>
                <ul>
                    {bestSales.length >=0 && bestSales.map((bestProducts, index) => {
                        return <li key={index}>{bestProducts.productName}</li>
                    })}
                </ul>
            </div>
            <div className='div_pie_chart'></div>
            <PieChart data={bestSales} />
        </div>
    );
};

export default TopProducts;

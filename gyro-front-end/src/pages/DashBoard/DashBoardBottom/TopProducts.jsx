import React, { useEffect, useState } from 'react';
import './StyleGeral.css';
import PieChart from "./PieChart";
import { getBestSeller } from '../../../services/history/history';

const TopProducts = () => {
    const [bestSales, setBestSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        const fetchBestSales = async () => {
            try {
                setLoading(true);
                const response = await getBestSeller(token);
                
                console.log("Dados recebidos da API:", response);
                
                let formattedData = Array.isArray(response) 
                    ? response 
                    : response?.data || response?.products || [];
                
                // Ordena os produtos por totalSales em ordem decrescente
                formattedData = formattedData.sort((a, b) => {
                    const salesA = a.totalSales || a.totalQuantity || a.quantity || 0;
                    const salesB = b.totalSales || b.totalQuantity || b.quantity || 0;
                    return salesB - salesA;
                });
                
                setBestSales(formattedData);
            } catch (error) {
                console.error("Erro ao buscar mais vendidos:", error);
                setError("Erro ao carregar produtos mais vendidos");
            } finally {
                setLoading(false);
            }
        };

        fetchBestSales();
    }, [token]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="top-products">
            <div className='div_lista_top_products'>
                <h3>Produtos mais vendidos</h3>
                <ul>
                    {bestSales.map((product, index) => (
                        <li key={index}>
                            {product.productName || product.name || `Produto ${index + 1}`}:ㅤ
                            {product.totalSales || product.totalQuantity || product.quantity} vendas
                        </li>
                    ))}
                </ul>
            </div>
            <div className='div_pie_chart'>
                <PieChart data={bestSales} />
            </div>
        </div>
    );
};

export default TopProducts;
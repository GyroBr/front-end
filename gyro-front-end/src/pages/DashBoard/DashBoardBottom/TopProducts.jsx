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
                
                // DEBUG: Verifique a estrutura completa dos dados
                console.log("Dados recebidos da API:", response);
                
                // Verifique se os dados estão no formato esperado
                const formattedData = Array.isArray(response) 
                    ? response 
                    : response?.data || response?.products || [];
                
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
    // if (!bestSales || bestSales.length === 0) return <div>Nenhum produto vendido ainda</div>;

    return (
        <div className="top-products">
            <div className='div_lista_top_products'>
                <h3>Produtos mais vendidos</h3>
                <ul>
                    {bestSales.map((product, index) => {
                        // DEBUG: Verifique cada produto individualmente
                        console.log(`Produto ${index}:`, product);
                        
                        return (
                            <li key={index}>
                                {product.productName || product.name || `Produto ${index + 1}`} - 
                                {product.totalQuantity || product.quantity} vendas
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className='div_pie_chart'>
                <PieChart data={bestSales} />
            </div>
        </div>
    );
};

export default TopProducts;
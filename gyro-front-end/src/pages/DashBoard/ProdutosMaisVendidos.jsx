import React, { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {getBestSeller} from "../../services/history/history";
// import {getTotalSales} from "../../services/history/history";
import {getTotalSales} from "../../services/pedido/PedidoService";


ChartJS.register(ArcElement, Tooltip, Legend);


function ProdutosMaisVendidos() {

    const token = sessionStorage.getItem('token');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchBestSellers = async () => {
            console.log('teste 1');
            
            try {
                const response = await getBestSeller(token);
                const data = response.data;
                setProducts(data);
            } catch (error) {
                console.error('Erro ao buscar os produtos mais vendidos:', error);
            }
        };

        fetchBestSellers();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            console.log('teste');
            
            try {
                const response = await getTotalSales(token);
                const data = response.data;
                setOrders(data);
            } catch (error) {
                console.error('Erro ao buscar orders:', error);
            }
        };

        fetchOrders();
    }, []);

console.log('orders produtos mais vendidos => ', orders);



    // Mapeia os dados para os valores do gráfico
    const labels = products.map((product) => product.productName);
    const quantities = products.map((product) => product.totalQuantity);

    const data = {
        labels: labels, // Nomes dos produtos
        datasets: [
            {
                data: quantities, // Quantidade vendida
                backgroundColor: ['#FFD700', '#FFA500', '#FF8C00', '#FF4500', '#FFA07A'], // Paleta de cores dinâmica
                hoverBackgroundColor: ['#FFD700', '#FFA500', '#FF8C00', '#FF4500', '#FFA07A'],
            },
        ],
    };

    return (
        <>
            <div style={{
                display: 'flex',
                width: '100%'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <div style={{
                        display: 'flex',
                        backgroundColor: '#2A2A40',
                        color: '#ffffff',
                        padding: '20px',
                        margin: '5px',
                        borderRadius: '8px',
                        border: '1px solid #333',
                        boxShadow: '0px 0px 5px rgba(255, 255, 255, 0.3)'
                    }}>
                        <div style={{
                            flex: 1,
                            height:'30vh',
                            padding:' 20px',
                            marginTop:'20px',
                            border: '1px solid #fff',
                            borderRadius: '10px'
                        }}>
                            <h2>Produtos mais vendidos</h2>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                {products.map((produto, index) => (
                                    <li style={{listStyleType: 'none'}} key={index}>
                                        {produto.productName} - {produto.totalQuantity} unidades
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ flex: 1 }}>
                            <Pie data={data} />
                        </div>
                    </div>
                </div>
                <div style={{
                    backgroundColor: '#2A2A40',
                    color: '#ffffff',
                    width:'70%',
                    padding: '20px',
                    margin: '5px',
                    borderRadius: '8px',
                    border: '1px solid #333',
                    boxShadow: '0px 0px 5px rgba(255, 255, 255, 0.3)'
                }}>
                    <h2 style={{ marginBottom: '20px', borderBottom:'1px solid white    '}}>Média de Faturamento</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop:'50px' }}>
                        <div style={{
                            padding: '20px',
                            borderRadius: '8px',
                            border: '2px solid #fff',
                            textAlign: 'center',
                            width: '120px'
                        }}>
                            <p>Mensal</p>
                            <p>R$75.000,00</p>
                        </div>
                        <div style={{
                            padding: '20px',
                            borderRadius: '8px',
                            border: '2px solid #fff',
                            textAlign: 'center',
                            width: '120px'
                        }}>
                            <p>Diária</p>
                            <p>R$2.500,00</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProdutosMaisVendidos;
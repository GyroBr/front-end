import React from 'react';
import './CardTop.css';
import { BsBasket, BsCartDash } from "react-icons/bs";
import {getTotalSales} from "../../../services/order/order";
import { useEffect, useState } from 'react';
import { getBestSeller } from '../../../services/history/history';

const CardTop = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getTotalSales(token); 
        const data = response.data;
        setOrders(data.orders);
      } catch (error) {
        console.error('Erro ao buscar orders:', error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getBestSeller(token);
        // Ordena os produtos por quantidade de vendas (decrescente)
        const sortedProducts = Array.isArray(response) 
          ? response.sort((a, b) => {
              const salesA = a.totalSales || a.totalQuantity || a.quantity || 0;
              const salesB = b.totalSales || b.totalQuantity || b.quantity || 0;
              return salesB - salesA;
            })
          : [];
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  const total = orders.reduce((acc, i) => acc + i.purchaseTotal, 0);
  
  // Função para obter o nome do produto considerando diferentes estruturas
  const getProductName = (product) => {
    return product?.productName || product?.name || 'N/A';
  };

  const cards = [
    {
      icon: '💰',
      label: 'Total em vendas',
      value: `R$ ${total.toFixed(2)}`,
    },
    {
      icon: '🛒',
      label: 'Total de vendas',
      value: orders.length,
    },
    {
      icon: '⭐',
      label: 'Produto mais vendido',
      value: products.length > 0 ? getProductName(products[0]) : 'N/A',
    },
    {
      icon: '📉',
      label: 'Produto menos vendido',
      value: products.length > 0 ? getProductName(products[products.length - 1]) : 'N/A',
    },
  ];

  return (
    <div className="dashboard">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <div className="card-header">
            <span className="card-icon">{card.icon}</span>
            {card.percentage && <span className="card-percentage">{card.percentage}</span>}
          </div>
          <div className="card-content">
            <p className="card-value">{card.value}</p>
            <p className="card-label">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardTop;
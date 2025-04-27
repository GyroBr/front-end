import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './PaymentChart.css';

const PaymentChart = ({ ordersData }) => {
  
  ordersData = ordersData || [];
  const paymentMethods = {
    PIX: { value: 0, color: '#FFA726', label: 'Pix' },
    DEBIT_CARD: { value: 0, color: '#FFB300', label: 'Cartão Débito' },
    CREDIT_CARD: { value: 0, color: '#FFD54F', label: 'Cartão Crédito' },
    CASH: { value: 0, color: '#4CAF50', label: 'Dinheiro' },
  };

  ordersData.forEach(order => {
    if (paymentMethods[order.paymentMethod]) {
      paymentMethods[order.paymentMethod].value++;
    }
  });

  const totalOrders = ordersData.length;
  const data = Object.values(paymentMethods).map(method => ({
    ...method,
    percentage: ((method.value / totalOrders) * 100) || 0, 
  }));

  return (
    <div className="chart-container">
      <div className="div_tittle">
        <h4>Forma de Pagamento</h4>
      </div>
      <div className="div_content">
      <div className="circle-wrapper">
        {data.map((item, index) => (
          <div
            key={index}
            className="circle"
            style={{
              width: `${100 - index * 20}px`,
              height: `${100 - index * 20}px`,
            }}
          >
            <CircularProgressbar
              value={item.percentage}
              maxValue={100}
              styles={buildStyles({
                pathColor: item.color,
                trailColor: '#333',
                rotation: 0.75, 
              })}
            />
          </div>
        ))}
      </div>
      <div className="legend">
        {data.map((item, index) => (
          <div key={index} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: item.color }}>
            </span>

            <span>{item.label} - {item.value} Pedidos</span>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default PaymentChart;

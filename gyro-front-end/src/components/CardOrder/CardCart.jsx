/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./CardCart.module.css";

const CardCart = ({ cartItems, onCreateOrder, total, onPaymentMethodChange, onCashGivenChange }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cashGiven, setCashGiven] = useState("");

  const handlePaymentMethodChange = (e) => {
    const value = e.target.value;
    setPaymentMethod(value);
    onPaymentMethodChange(value); // Comunica com o componente pai
    if (value !== "MONEY") {
      setCashGiven("");
      onCashGivenChange(0); // Reseta o valor caso não seja dinheiro
    }
  };

  const handleCashGivenChange = (e) => {
    const value = parseFloat(e.target.value);
    // if(value)
    console.log('valor total', value);
    
    const sanitizedValue = isNaN(value) ? "" : value;
    setCashGiven(sanitizedValue);
    onCashGivenChange(sanitizedValue); // Comunica com o componente pai
  };

  const calculateChange = () => {
    if (!cashGiven || paymentMethod !== "MONEY") return 0;
    return Math.max(0, parseFloat(cashGiven) - parseFloat(total)).toFixed(2);
  };

  const change = calculateChange();

  return (
    <div className={styles.box_order}>
      <h3 className={styles.cart_tittle}>Carrinho</h3>
      <div className={styles.cart_content}>
        {Object.keys(cartItems).length > 0 ? (
          <>
            {Object.entries(cartItems).map(
              ([productId, { name, quantity, price }]) => (
                <div key={productId} className={styles.cart_item}>
                  <div className={styles.products_infos}>
                    <span className={styles.item_name}>{name}</span>
                    <span className={styles.item_quantity}>
                      Qtd: {quantity}
                    </span>
                    <span className={styles.item_price}>
                      R$ {price * quantity},00
                    </span>
                  </div>
                </div>
              )
            )}
            <div className={styles.payment_method}>
              <span className={styles.item_nameMethod}>Método de pagamento:</span>
              <select
                className={styles.selectBox}
                name="selectMethodOfPayment"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <option value="">Selecione</option>
                <option value="CREDIT_CARD">Cartão de Crédito</option>
                <option value="DEBIT_CARD">Cartão de Débito</option>
                <option value="CASH">Dinheiro</option>
                <option value="PIX">PIX</option>
              </select>
            </div>
            {paymentMethod === "MONEY" && (
              <div className={styles.cash_input_container}>
                <label className={styles.cash_label}>
                  Valor dado:
                  <input
                    type="number"
                    className={styles.cash_input}
                    value={cashGiven}
                    onChange={handleCashGivenChange}
                    placeholder="Insira o valor"
                  />
                </label>
                <span className={styles.change_label}>
                  Troco: R$ {change}
                </span>
              </div>
            )}
          </>
        ) : (
          <span className={styles.empty_cart}>Carrinho vazio</span>
        )}
      </div>
      <div className={styles.cart_footer}>
        <span className={styles.total}>Total: R$ {total},00</span>
        <button className={styles.btn_finalize} onClick={onCreateOrder}>
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
};

export default CardCart;

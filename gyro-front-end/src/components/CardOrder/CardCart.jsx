import React, { useState } from "react";
import styles from "./CardCart.module.css";

const CardCart = ({
  cartItems,
  onCreateOrder,
  total,
  onPaymentMethodChange,
  onCashGivenChange,
  isSubmitting // Nova prop recebida
}) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cashGiven, setCashGiven] = useState("");

  const handlePaymentMethodChange = (e) => {
    const value = e.target.value;
    setPaymentMethod(value);
    onPaymentMethodChange(value);
    if (value !== "CASH") {
      setCashGiven("");
      onCashGivenChange(0);
    }
  };

  const handleCashGivenChange = (e) => {
    const value = parseFloat(e.target.value);
    const sanitizedValue = isNaN(value) ? "" : value;
    setCashGiven(sanitizedValue);
    onCashGivenChange(sanitizedValue);
  };

  const calculateChange = () => {
    if (!cashGiven || paymentMethod !== "CASH") return 0;
    return Math.max(0, parseFloat(cashGiven) - parseFloat(total)).toFixed(2);
  };

  const change = calculateChange();

  // Verifica se o botão deve estar desabilitado
  const isButtonDisabled = 
    isSubmitting || 
    Object.keys(cartItems).length === 0 || 
    paymentMethod === "";

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
                      {(price * quantity).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
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
                disabled={isSubmitting} // Desabilita durante o envio
              >
                <option value="">Selecione</option>
                <option value="CREDIT_CARD">Cartão de Crédito</option>
                <option value="DEBIT_CARD">Cartão de Débito</option>
                <option value="CASH">Dinheiro</option>
                <option value="PIX">PIX</option>
              </select>
            </div>
            {paymentMethod === "CASH" && (
              <div className={styles.cash_input_container}>
                <label className={styles.cash_label}>
                  Valor dado:
                  <input
                    type="number"
                    className={styles.cash_input}
                    value={cashGiven}
                    onChange={handleCashGivenChange}
                    placeholder="Insira o valor"
                    disabled={isSubmitting} // Desabilita durante o envio
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
        <span className={styles.total}>
          Total: {Number(total).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </span>
        <button 
          className={`${styles.btn_finalize} ${isSubmitting ? styles.btn_loading : ''}`}
          onClick={onCreateOrder}
          disabled={isButtonDisabled}
        >
          {isSubmitting ? (
            <>
              <span className={styles.spinner}></span>
              Processando...
            </>
          ) : (
            'Finalizar Pedido'
          )}
        </button>
      </div>
    </div>
  );
};

export default CardCart;
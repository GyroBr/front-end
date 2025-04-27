import React, { useState } from "react";
import styles from "./CardShopList.module.css";

const CardCart = ({ cartItems = [], onCreateOrder, total, onPaymentMethodChange, onCashGivenChange }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cashGiven, setCashGiven] = useState("");

  const handlePaymentMethodChange = (e) => {
    const value = e.target.value;
    setPaymentMethod(value);
    onPaymentMethodChange(value); 
    if (value !== "MONEY") {
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
    if (!cashGiven || paymentMethod !== "MONEY") return 0;
    return Math.max(0, parseFloat(cashGiven) - parseFloat(total)).toFixed(2);
  };

  const change = calculateChange();

  return (
    <div className={styles.box_order}>
      <h3 className={styles.cart_tittle}>Produtos com Estoque Crítico</h3>
      <div className={styles.cart_content}>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map(({ productId, name, quantity, price }) => (
              <div key={productId} className={styles.cart_item}>
                <div className={styles.products_infos}>
                  <span className={styles.item_name}>{name}</span>
                  <span className={styles.item_quantity}>Quantidade: {quantity}</span>
                  {/* <span className={styles.item_price}>R$ {price * quantity},00</span> */}
                </div>
              </div>
            ))}
            {/* <div className={styles.cart_footer}>
              <span className={styles.total}>Total: R$ {total},00</span>
              <button className={styles.btn_finalize} onClick={onCreateOrder}>
                Finalizar Pedido
              </button>
            </div> */}
          </>
        ) : (
          <span className={styles.empty_cart}>Nenhum produto em estoque crítico.</span>
        )}
      </div>
    </div>
  );
};

export default CardCart;

import React, { useState } from "react";
import styles from "./CardOrder.module.css";

const CardOrder = ({ id, name, price, image, onUpdateCart, productQuantity }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onUpdateCart(id, newQuantity, name, price);
  };

  const handleRemoveFromCart = () => {
    const newQuantity = Math.max(0, quantity - 1);
    setQuantity(newQuantity);
    onUpdateCart(id, newQuantity, name, price);
  };

  const isOutOfStock = productQuantity === 0;
  const isInCart = quantity > 0;

  return (
    <div
      className={`${styles.card_estoque} ${isInCart ? styles.inCart : ""}`}
      style={{ filter: isOutOfStock ? "blur(1px)" : "none" }}
    >
      <div className={styles.upload_img}>
        <img src={image} alt={name} className={styles.img} />
      </div>
      <div className={styles.container_info}>
        <h3 className={styles.textName}>{name}</h3>
        <p className={styles.textPrice}>R$ {price},00</p>
        <p className={styles.textProductQuantity}>
          Em estoque: {productQuantity}
        </p>
        <div className={styles.box_btn}>
          <button
            className={`${styles.btn_edit_delete} ${
              isInCart ? styles.btnInCart : ""
            }`}
            onClick={handleRemoveFromCart}
            disabled={quantity === 0 || isOutOfStock}
          >
            -
          </button>
          <span className={styles.textQuantity}>{quantity}</span>
          <button
            className={`${styles.btn_edit_delete} ${
              isInCart ? styles.btnInCart : ""
            }`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardOrder;

// BtnAddCombo.jsx
import React from "react";
import styles from "../Button/BtnAddCombo.module.css";
// import { BsPlusLg } from "react-icons/bs";
import { FaFilterCircleXmark } from "react-icons/fa6";
    


const BtnAddCombo = () => {
    console.log('click')
    return (
        <button className={styles.btn_add}>
      Limpar filtro <FaFilterCircleXmark className={styles.icon} />
    </button>
  );
};

export default BtnAddCombo;
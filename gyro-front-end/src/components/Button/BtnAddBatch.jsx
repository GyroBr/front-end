import React, { useEffect, useRef } from "react";
import styles from "../Button/BtnAddProduct.module.css";
import { BsPlusLg } from "react-icons/bs";


const BtnAdd = () => {
    return (
        <button className={styles.btn_add}>
            Adicionar Lote <BsPlusLg className={styles.icon} />
        </button>
    );
};

export default BtnAdd;
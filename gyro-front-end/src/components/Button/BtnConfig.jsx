import React, { useEffect, useRef } from "react";
import styles from "../Button/BtnConfig.module.css";
import { BsSliders2 } from "react-icons/bs";


const BtnConfig = () => {
    return (
        <button className={styles.btn_config}>
            Configurar Categoria <BsSliders2 className={styles.icon} />
        </button>
    );
};

export default BtnConfig;
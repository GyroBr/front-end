import React from "react";
import styles from "../CardFunc/CardFunc.module.css";
import { BsPlusLg, BsTrash3, BsPencil } from "react-icons/bs";

const CardFunc = () => {
    return (
        <div className={styles.container_card}>
            <button className={styles.card_btn}>
                Adicionar Motoboy
                <BsPlusLg className={styles.icon} />
            </button>
            <div className={styles.card}>
                <div className={styles.card_func}>
                    <span> Felipe Magalhães de Souza</span>
                    <span> felipe@gmail.com</span>
                    <span> EHC-1234</span>
                </div>
                <div className={styles.card_edit}>
                    <BsPencil className={styles.icon_card} />
                    <BsTrash3 className={styles.icon_card} />
                </div>
            </div>
        </div>
    );
};

export default EmployeePage;
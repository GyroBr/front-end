/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import styles from "../Button/BtnAddProduct.module.css";
import { BsPlusLg } from "react-icons/bs";
import ModalAdicionarProduto from "../../components/ModaisProduto/ModalAdicionarProduto";

const BtnAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal} className={styles.btn_add}>
        Adicionar Produto <BsPlusLg className={styles.icon} />
      </button>
      <div>
        {isModalOpen && (
          <ModalAdicionarProduto
            isOpen={isModalOpen}
            setModalOpen={closeModal}
          />
        )}
      </div>
    </>
  );
};

export default BtnAdd;

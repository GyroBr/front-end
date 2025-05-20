// BtnAddCombo.jsx
import React, { useState } from "react";
import styles from "../Button/BtnAddCombo.module.css";
import { BsPlusLg } from "react-icons/bs";
import ModalAdicionarProduto from "../../components/ModaisLote/ModalAdicionarCombo";

const BtnAddCombo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal} className={styles.btn_add}>
        Adicionar Combo <BsPlusLg className={styles.icon} />
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

export default BtnAddCombo;

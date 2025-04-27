/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./CardCardapio.module.css";
import ModalExcluirProduto from "../ModaisProduto/ModalExcluirProduto";
import ModalEditarProduto from "../ModaisProduto/ModalEditarProduto";
import { MdEdit, MdDelete } from "react-icons/md";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Card = ({ id, name, description, price, image, onDelete, onEdit, category }) => {
  //Modal excluir
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = () => setIsModalDeleteOpen(false);

  //Modal editar
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const openModalEdit = () => setIsModalEditOpen(true);
  const closeModalEdit = () => setIsModalEditOpen(false);

  return (
    <div className={styles.card_cardapio}>
      <div className={styles.container}>
        <div className={styles.img}>
          <div className={styles.upload_img}>
            <img src={image} alt={name} />
          </div>
        </div>
        <div className={styles.container_info}>
          <div className={styles.tittle}>
            <span className={styles.text}>{name}</span>
          </div>
          <div className={styles.description}>
            <span className={styles.text}>{description}</span>
          </div>
        </div>
        <div className={styles.price}>
          <span className={styles.text}>R${price}</span>
        </div>
        {/* <div className={styles.buttons}>
          <button onClick={openModalEdit} className={styles.buttonCard}>
            <MdEdit /> Editar
          </button>
          <button onClick={openModalDelete} className={styles.buttonCard}>
            <MdDelete /> Excluir
          </button>
        </div> */}
      </div>
      {isModalDeleteOpen && (
        <ModalExcluirProduto
          isOpen={isModalDeleteOpen}
          setModalOpen={closeModalDelete}
          productId={id}
          onDeleteSuccess={() => onDelete(id)} // Chama a função passada por prop
        />
      )}
      {isModalEditOpen && (
        <ModalEditarProduto
          isOpen={isModalEditOpen}
          setModalOpen={closeModalEdit}
          productId={id}
          name={name}
          category={category}
          description={description}
          price={price}
          image={image}
          onEditSuccess={() => onEdit(id)} // Chama a função passada por prop
        />
      )}
    </div>
  );
};

export default Card;

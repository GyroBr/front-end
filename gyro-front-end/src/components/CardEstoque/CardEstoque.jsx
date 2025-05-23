/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./CardEstoque.module.css";
import ModalEditarProduto from "../ModaisProduto/ModalEditarProduto";
import ModalExcluirProduto from "../ModaisProduto/ModalExcluirProduto";
import { BsCalendar4Event, BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { GoAlert } from "react-icons/go";

const Card = ({
  id,
  name,
  barCode,
  price,
  image,
  onDelete,
  onEdit,
  category,
  warningQuantity,
  volume,
  expirationDate,
  quantity,
  expireDate,
}) => {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = () => setIsModalDeleteOpen(false);

  const openModalEdit = () => setIsModalEditOpen(true);
  const closeModalEdit = () => setIsModalEditOpen(false);

  // Função para determinar a cor do status
  const getStatusColor = () => {
    if (quantity < warningQuantity) {
      return styles.red; // Cor vermelha
    } else if (quantity === warningQuantity) {
      return styles.yellow; // Cor amarela
    } else {
      return styles.green; // Cor verde
    }
  };

  // console.log('imagem => ',image)

  return (
    <div className={styles.card_estoque}>
      <div className={styles.container}>
        <div className={styles.img}>
          <div className={styles.upload_img}>
            <img src={image} alt={name} />
          </div>
        </div>
        <div className={styles.container_info}>
          <div className={styles.line}>
            <span className={styles.text}>Produto: {name}</span>
          </div>
          <div className={styles.line}>
            <span className={styles.text}>Quantidade em estoque: {quantity}</span>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.box_status}>
            <span className={styles.text}>Status</span>
            <div className={`${styles.line_color} ${getStatusColor()}`}></div>
          </div>

          <div className={styles.box_rep_val}>
            <span className={styles.text}></span>
            <div className={styles.box_intern}>
              <GoAlert />
              <span className={styles.text}>Qtd crítica: {warningQuantity}</span>
            </div>
          </div>

          <div className={styles.box_rep_val}>
            <span className={styles.text}>Validade</span>
            <div className={styles.box_intern}>
              <BsCalendar4Event />
              <span className={styles.date}>{expireDate}</span>
            </div>
          </div>

          <div className={styles.box_btn}>
            <button onClick={openModalEdit} className={styles.btn_edit_delete}>
              <BsFillPencilFill />
              <span className={styles.text}>Editar</span>
            </button>

            <button onClick={openModalDelete} className={styles.btn_edit_delete}>
              <BsFillTrashFill />
              <span className={styles.text}>Excluir</span>
            </button>
          </div>
        </div>
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
          quantity={quantity}
          barCode={barCode}
          warningQuantity={warningQuantity}
          volume={volume}
          expirationDate={expirationDate}
          price={price}
          // image={image}
          onEditSuccess={() => onEdit(id)} // Chama a função passada por prop
        />
      )}
    </div>
  );
};

export default Card;
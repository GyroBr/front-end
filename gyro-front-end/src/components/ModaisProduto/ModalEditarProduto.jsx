/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./ModalEditarProduto.module.css";
import { BsX } from "react-icons/bs";
import { editProduct } from "../../services/product/product";
import { toast } from "react-toastify";

export default function ModalEditar({
  isOpen,
  setModalOpen,
  onEditSuccess,
  productId,
  volume: initialVolume,
  productId: initializeId,
  name: initialName,
  price: initialPrice,
  quantity: initialQuantity,
  warningQuantity: initialWarningQuantity,
  category: initialCategory,
  barCode: initialbarCode,
  expireDate: initialExpiresAt,
}) {
  // Estados locais para controlar os valores dos campos
  const [product, setProduct] = useState({
    productId: initializeId,
    name: initialName || "",
    volume: initialVolume || "",
    barCode: initialbarCode || "",
    price: initialPrice || "",
    quantity: initialQuantity || "",
    warningQuantity: initialWarningQuantity || "",
    category: initialCategory || "",
    expireDate: initialExpiresAt || "",
  });

  const token = sessionStorage.getItem("token");

  // Função para lidar com alterações nos inputs
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      setProduct((prev) => ({ ...prev, image: files[0] }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleConfirm = async () => {
    try {
      const productBody = {
        name: product.name,
        price: parseFloat(product.price),
        category: product.category,
        barCode: product.barCode,
        volume: product.volume,
        quantity: product.quantity,
        warningQuantity: product.warningQuantity,
        expiresAt: product.expireDate,
      };
      console.log(productBody);

      const response = await editProduct(token, productId, productBody);

      if (response.status === 200) {
        toast.success("Produto editado com sucesso!", { autoClose: 700 });
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      console.error(
        "Erro ao tentar editar o produto:",
        error.response?.data || error.message
      );
      toast.error("Erro ao tentar editar o produto", { autoClose: 700 });
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.modalContentStyle}>
        <div className={styles.titleWrapper}>
          <h4 className={styles.title}>Edite o Produto</h4>
          <button className={styles.btn_x} onClick={() => setModalOpen(false)}>
            <BsX />
          </button>
        </div>
        <div className={styles.contents}>
          {/* Grupo Nome e Preço */}
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <h6>Nome</h6>
              <input
                className={styles.inputs_square}
                type="text"
                placeholder="Digite o nome"
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputWrapper}>
              <h6>Preço</h6>
              <input
                className={styles.inputs_square}
                type="number"
                placeholder="Digite o preço"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Quantidade e Aviso */}
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <h6>Quantidade</h6>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                className={styles.inputs_square}
                placeholder="Quantidade"
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputWrapper}>
              <h6>Quantidade de Aviso</h6>
              <input
                type="number"
                name="warningQuantity"
                value={product.warningQuantity}
                className={styles.inputs_square}
                placeholder="Aviso de quantidade"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Categoria */}
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <h6>Categoria</h6>
              <input
                className={styles.inputs_square}
                type="text"
                placeholder="Digite a categoria"
                name="category"
                value={product.category}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputWrapper}>
              <h6>Volume</h6>
              <input
                type="text"
                name="volume"
                value={product.volume}
                className={styles.inputs_square}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Código de barras */}
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <h6>Código de barras</h6>
              <input
                type="number"
                name="barCode"
                className={styles.inputs_square}
                value={product.barCode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Validade */}
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <h6>Data de Validade</h6>
              <input
                type="date"
                name="expireDate"
                value={product.expireDate}
                className={styles.inputs_square}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.buttons}>
            <button
              className={styles.btn_cancel}
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </button>
            <button className={styles.btn_confirm} onClick={handleConfirm}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

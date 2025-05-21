/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./ModalEditarProduto.module.css";
import { BsX } from "react-icons/bs";
// import { editProduct } from "../../services/produto/ProdutoService";
import { toast } from "react-toastify";

export default function ModalEditar({
  isOpen,
  setModalOpen,
  onEditSuccess,
  productId,
  productId: initializeId,
  name: initialName,
  price: initialPrice,
  quantity: initialQuantity,
  warningQuantity: initialWarningQuantity,
  category: initialCategory,
  description: initialDescription,
}) {
  // Estados locais para controlar os valores dos campos
  const [product, setProduct] = useState({
    productId: initializeId,
    name: initialName || "",
    description: initialDescription || "",
    price: initialPrice || "",
    quantity: initialQuantity || "",
    warningQuantity: initialWarningQuantity || "",
    category: initialCategory || "",
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

  // Função para confirmar a edição
  const handleConfirm = async () => {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("quantity", product.quantity);
      formData.append("warningQuantity", product.warningQuantity);

      const response = await editProduct(token, productId, formData);
      console.log(response);

      if (response.status === 200) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        toast.success("Produto editado com sucesso!", {
          autoClose: 700,
        });
        // onEditSuccess(); // Notifica o componente pai para atualizar a lista
      }
    } catch (error) {
      console.error(
        "Erro ao tentar editar o produto:",
        error.response?.data || error.message
      );
      toast.error("Erro ao tentar editar o produto", {
        autoClose: 700,
      });
    } finally {
      setModalOpen(false);
    }
  };

  if (!isOpen) {
    return null;
  }

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
          <div className={styles.row}>
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
          </div>

          {/* Validade */}
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <h6>Data de Validade</h6>
              <input
                type="date"
                name="expirationDate"
                value={product.expirationDate}
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

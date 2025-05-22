import React, { useState, useEffect } from "react";
import styles from "./ModalAdicionarProduto.module.css";
import { registerProduct } from "../../services/product/product";
import { BsX } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";

export default function ModalAdicionar({ isOpen, setModalOpen, onAddSuccess }) {
  const [product, setProduct] = useState({
    name: "",
    barCode: "",
    price: "",
    quantity: "",
    expirationDate: "",
    category: "",
    image: null,
    warningQuantity: "",
    volume: "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const token = sessionStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      setProduct((prev) => ({ ...prev, image: file }));

      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    } else {
      let newValue = value;

      if (name === "price" && value !== "") {
        newValue = parseFloat(value);
      } else if (
        ["quantity", "warningQuantity"].includes(name) &&
        value !== ""
      ) {
        newValue = parseInt(value, 10);
      }

      setProduct((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  const handleConfirm = async () => {
    try {
      const formData = new FormData();

      const productData = {
        name: product.name,
        price: product.price,
        category: product.category,
        volume: product.volume,
        quantity: product.quantity,
        warningQuantity: product.warningQuantity,
        expiresAt: product.expirationDate,
        barCode: product.barCode,
      };

      formData.append(
        "product",
        new Blob([JSON.stringify(productData)], { type: "application/json" })
      );

      if (product.image) {
        formData.append("image", product.image);
      }

      const response = await registerProduct(token, formData);

      if (response.status === 200) {
        toast.success("Produto adicionado com sucesso!", { autoClose: 700 });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data || "Erro ao adicionar produto", {
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!isOpen) return null;

  return (
    <div className={styles.background}>
      <div className={styles.modalContentStyle}>
        <div className={styles.titleWrapper}>
          <h4 className={styles.title}>Adicione um Produto</h4>
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

          {/* Validade e Volume*/}
          <div className={styles.inputGroup}>
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
                name="barCode"
                className={styles.inputs_square}
                value={product.barCode}
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

          {/* Upload de Imagem com Preview e Botão de Remover */}
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <h6>Adicionar imagem</h6>
              {!previewUrl ? (
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  name="image"
                  onChange={handleInputChange}
                />
              ) : (
                <div className={styles.previewWrapper}>
                  <img
                    src={previewUrl}
                    alt="Pré-visualização"
                    className={styles.previewImage}
                  />
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => {
                      setProduct((prev) => ({ ...prev, image: null }));
                      URL.revokeObjectURL(previewUrl);
                      setPreviewUrl(null);
                    }}
                  >
                    Remover imagem
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className={styles.buttons}>
            <button
              className={styles.btn_cancel}
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </button>
            <button className={styles.btn_confirm} onClick={handleConfirm}>
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

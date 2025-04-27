import React, { useState } from "react";
import styles from "./ModalAdicionarProduto.module.css";
import { registerProduct } from "../../services/product/product";
import { toast } from "react-toastify";

export default function ModalAdicionar({ isOpen, setModalOpen, onAddSuccess }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    expirationDate: "",
    category: "",
    image: null,
    warningQuantity: "", 
  });

  const token = sessionStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
      console.log(name, value, files, "dados que chegaram");
      
    if (name === "image" && files.length > 0) {
      setProduct((prev) => ({ ...prev, image: files[0] }));
    } else {
      let newValue = value;

      if (name === "price" && value !== "") {
        newValue = parseFloat(value);
      } else if (name === "quantity" && value !== "") {
        newValue = parseInt(value, 10);
      } else if (name === "warningQuantity" && value !== "") {
        newValue = parseInt(value, 10);
      }

      setProduct((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  const handleConfirm = async () => {
    try {
        const formData = new FormData();

        // Convertendo o objeto product para JSON
        const productData = {
            name: product.name,
            price: product.price,
            category: product.category, 
            volume: "300ml",
            quantity: product.quantity,
            warningQuantity: product.warningQuantity, 
            expiresAt: product.expirationDate,
            barCode: product.description
        };

        formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));

        if (product.image) {
            formData.append("image", product.image);
        }

        console.log(Array.from(formData.entries()), "Dados que serão enviados");

        const response = await registerProduct(token, formData);

        if (response.status === 200) {
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            toast.success("Produto adicionado com sucesso!", { autoClose: 700 });
        }
    } catch (error) {
        console.log(error.response);
        toast.error(error.response?.data || "Erro ao adicionar produto", { autoClose: 5000 });
    }
};


  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.background}>
      <div className={styles.modalContentStyle}>
        <div className={styles.contents}>
          <div className={styles.row}>
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
            <div className={styles.inputWrapper}>
              <h6>Adicionar imagem</h6>
              <label htmlFor="imageUpload" className={styles.uploadLabel}>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  name="image"
                  onChange={handleInputChange}
                />
                <span className={styles.uploadText}>Clique para enviar</span>
              </label>
            </div>
          </div>
          <div className={styles.row}>
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
              <h6>Quantidade de Aviso</h6> {/* Novo campo de input */}
              <input
                type="number"
                name="warningQuantity"
                value={product.warningQuantity}
                className={styles.inputs_square}
                placeholder="Aviso de quantidade"
                onChange={handleInputChange}
              />
            </div>
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
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <h6>Código de barras</h6>
              <textarea
                name="description"
                className={styles.textarea_description}
                value={product.description}
                onChange={handleInputChange}
              ></textarea>
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
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

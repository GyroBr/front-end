/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./ModalEditarProduto.module.css";
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
  // image: initialImage,
  category: initialCategory,
  description: initialDescription,
}) {
  // Estados locais para controlar os valores dos campos
  const [product, setProduct] = useState({
    productId: initializeId,
    name: initialName || "",
    description: initialDescription || "",
    price: initialPrice || "",
    // image: null, // Para novos arquivos
    category: initialCategory || "",
    // existingImage: initialImage || "", // Para exibir a imagem atual
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
      // if (product.image) {
      //   formData.append("file", product.image);
      // }

      const response = await editProduct(token, productId, formData);
      console.log(response)

      if (response.status === 200) {
        
        setTimeout(() => {
          window.location.reload();
      }, 1000);
      toast.success('Produto editado com sucesso!', {
        autoClose: 700,
      });
        // onEditSuccess(); // Notifica o componente pai para atualizar a lista
      }
    } catch (error) {
      console.error("Erro ao tentar editar o produto:", error.response?.data || error.message);
      toast.error('Erro ao tentar editar o produto', {
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
        <div className={styles.contents}>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <h6>Nome</h6>
              <input
                className={styles.inputs_square}
                type="text"
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
                name="category"
                value={product.category}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className={styles.inputWrapper}>
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
              {product.existingImage && (
                <img
                  src={product.existingImage}
                  alt="Imagem do Produto"
                  className={styles.previewImage}
                />
              )}
            </div> */}
          </div>
          <div className={styles.div_input} id="productDescription">
            <h6>Descrição</h6>
            <textarea
              className={styles.textarea_description}
              rows="4"
              name="description"
              value={product.description}
              onChange={handleInputChange}
            />
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

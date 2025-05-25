/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./ModalEditarEmployee.module.css";
import { BsX } from "react-icons/bs";
import { updateEmployee } from '../../services/employes/employe';
import { toast } from "react-toastify";

export default function ModalEditar({
  isOpen,
  setModalOpen,
  onEditSuccess,
  employeeId,
  employeeId: initializeId,
  name: initialName,
  email: initialEmail,
  password: initialPassword,
}) {
  // Estados locais para controlar os valores dos campos
  const [employee, setEmployee] = useState({
    employeeId: initializeId,
    name: initialName || "",
    email: initialEmail || "",
    password: initialPassword || "",
  });

  const token = sessionStorage.getItem("token");

  // Função para lidar com alterações nos inputs
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      setEmployee((prev) => ({ ...prev, image: files[0] }));
    } else {
      setEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Função para confirmar a edição
  const handleConfirm = async () => {
    try {
      const formData = new FormData();
      formData.append("name", employee.name);
      formData.append("email", employee.email);
      formData.append("password", employee.password);

      console.log("Dados do funcionário:", formData.name);
      const response = await updateEmployee(token, employeeId, formData);
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
          {/* Grupo Nome */}
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <h6>Nome</h6>
              <input
                className={styles.inputs_square}
                type="text"
                placeholder=""
                name="name"
                value={employee.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* E-mail */}
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <h6>E-mail</h6>
              <input
                type="email"
                name="email"
                value={employee.email}
                className={styles.inputs_square}
                placeholder=""
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Senha */}
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <h6>Senha</h6>
              <input
                className={styles.inputs_square}
                type="password"
                placeholder=""
                name="password"
                value={employee.password}
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

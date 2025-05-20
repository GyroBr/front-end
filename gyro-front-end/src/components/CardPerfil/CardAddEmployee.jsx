import React, { useState } from "react";
import styles from "./CardAddPerfil.module.css";
import { BsX } from "react-icons/bs";
import { toast } from "react-toastify";
import { registerEmployee } from "../../services/employes/employe";

const CardAddEmployee = ({ handleClose }) => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleConfirmClick = async () => {
    const dataToSend = {
      name: employeeData.name,
      email: employeeData.email,
      password: employeeData.password,
    };

    try {
      const token = sessionStorage.getItem("token");
      await registerEmployee(token, dataToSend);

      toast.success("Funcionário adicionado com sucesso!", {
        autoClose: 1700,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1800);
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Email já cadastrado!", {
          autoClose: 4000,
        });
      } else {
        const errorMessages = error.response?.data || [];
        errorMessages.forEach((err) => {
          toast.error(`Erro em ${err.field}: ${err.message}`, {
            autoClose: 4000,
          });
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.background}>
      <div className={styles.modalContentStyle}>
        <div className={styles.titleWrapper}>
          <h4 className={styles.title}>Adicionar Funcionário</h4>
          <button className={styles.btn_x} onClick={handleClose}>
            <BsX />
          </button>
        </div>
        <div className={styles.contents}>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <h6>Nome</h6>
              <input
                className={styles.inputs_square}
                type="text"
                placeholder="Digite o nome"
                name="name"
                value={employeeData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <h6>E-mail</h6>
              <input
                type="email"
                name="email"
                value={employeeData.email}
                className={styles.inputs_square}
                placeholder="Digite o e-mail"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <h6>Senha</h6>
              <input
                className={styles.inputs_square}
                type="password"
                placeholder="Digite a senha"
                name="password"
                value={employeeData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.btn_cancel} onClick={handleClose}>
              Cancelar
            </button>
            <button className={styles.btn_confirm} onClick={handleConfirmClick}>
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAddEmployee;

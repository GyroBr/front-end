import React from "react";
import styles from "../ModaisEmployee/ModalExcluirEmployee.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { deleteEmployee } from "../../services/employes/employe";

export default function ModalExcluir({ isOpen, setModalOpen, employeeId }) {
  const token = sessionStorage.getItem("token");

  const handleConfirm = async () => {
    try {
      const response = await deleteEmployee(employeeId, token); // Chama a função de exclusão do serviço

      if (response.status === 204) {
        toast.success("Funcionário excluído com sucesso!", { autoClose: 700 });
        setTimeout(() => {
          // window.location.reload();
        }, 1000);
      } else {
        console.log(error);
        toast.error(error.response?.data || "Erro ao excluir funcionário", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Erro ao tentar excluir o Funcionário:", error);

      toast.error(error.response?.data || "Erro ao excluir funcionário", {
        autoClose: 2000,
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
          <h4>Tem certeza que deseja excluir este Funcionário?</h4>
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

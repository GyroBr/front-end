import React, { useEffect, useState } from "react";
// import axios from 'axios';
import Sidebar from "../../components/SideBar/Sidebar";
// import CardFunc from "../../components/CardFunc/CardFunc";
import styles from "../Employee/EmployeeStyle.module.css";
import { BsPlusLg, BsTrash3, BsPencil, BsTrash3Fill, BsPencilFill  } from "react-icons/bs";
import { toast } from "react-toastify";
// import jwt from 'jsonwebtoken';
// import api from '../../api';
import { getEnterpriseById } from "../../services/enterprise/enterprise";
import { TbElevator } from "react-icons/tb";
import CardPerfil from "../../components/CardPerfil/CardPerfil";
import CardAddEmployee from "../../components/CardPerfil/CardAddEmployee";
import {
  registerEmployee,
  getEmployees,
} from "../../services/employes/employe";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = () => setIsModalDeleteOpen(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  
    const openModalAddEmployee = () => setIsModalAddOpen(true);
    const closeModalAddEmployee = () => setIsModalAddOpen(false);
  const [enterpriseData, setEnterpriseData] = useState({
    id: "",
    nome: "",
    telefone: "",
    email: "",
    cnpj: "",
    sector: "",
    password: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
  });

  //carrega assim que a pagina carrega
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        // Faça a requisição GET aqui
        try {
          const data = await getEnterpriseById(token);
          // console.log(data); // Processar os dados conforme necessário
          setEnterpriseData({
            id: data.enterpriseId,
            nome: data.name,
            telefone: data.phoneNumber,
            email: data.email,
            cnpj: data.cnpj,
            sector: data.sector,
            password: data.password,
            cep: data.address.postalCode,
            rua: data.address.street,
            numero: data.address.number,
            bairro: data.address.neighborhood,
            cidade: data.address.city,
          });
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        // Faça a requisição GET aqui
        try {
          const data = await getEmployees(token);
          // console.log(data, 'dados dos funcionarios'); // Processar os dados conforme necessário

          setEmployees(data.data.employees);
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // console.log("to no employee", employees); // Verifique o estado employees após a definição
  }, [employees]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnterpriseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setIsEditable(false); // Esta linha faz a alteração do readOnly(somente leitura) false - pode editar true- só pode ler
    console.log("to na primeira", isEditable);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    console.log("to na segunda");
    window.location.reload();
  };

  const handleOpenCardEmployee = () => {
    setIsAddingEmployee(true);
  };

  const handleCloseCardEmployee = () => {
    setIsAddingEmployee(false);
  };

  const handleConfirmClick = async () => {
    // Adicione a lógica de confirmação aqui
    const dataToSend = {
      name: enterpriseData.nome,
      phoneNumber: enterpriseData.telefone,
      email: enterpriseData.email,
      password: enterpriseData.password,
    };
    console.error(dataToSend);
    try {
      const token = sessionStorage.getItem("token"); // Pega o token do sessionStorage

      const response = await api.put(
        `/admin/update-enterprise/${enterpriseData.id}`,
        dataToSend,
        {
          headers: {
            "content-type": "application/json",
            Authorization: token,
          },
        }
      );

      toast.success("Perfil atualizado com sucesso!", {
        autoClose: 1700,
      });
    } catch (error) {
      // setIsEditing(false);

      toast.error("Erro ao atualizar perfil!", {
        autoClose: 1700,
      });
      console.log("to na terceira");
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.sidebar_container}>
        <Sidebar />
      </div>
      <div className={styles.conteudo}>
        <div className={styles.title_page}>
          <h1>Gestão de Funcionários</h1>
        </div>

        <div className={styles.card_conteudo}>
          <div className={styles.container_card}>
            <div className={styles.card_btn} onClick={handleOpenCardEmployee}>
              <button
                className={styles.btnAddFunc}
                onClick={openModalAddEmployee}
              >
                Adicionar Funcionário
                {/* <BsPlusLg className={styles.icon} /> */}
              </button>
            </div>
            <div className={styles.divTitle}>
              <div className={styles.divSpan}>
                <span className={styles.spanTitle}>Nome</span>
                <span className={styles.spanTitle}>Email</span>
                <span className={styles.spanTitle}>Senha</span>
              </div>
              <div className={styles.divIcon}>
                <div className={styles.btnTitle}>
                  <BsPencilFill 
                    className={styles.icon_card}
                  />
                </div>
                <div className={styles.btnTitle}>
                  <BsTrash3Fill
                    className={styles.icon_card}
                  />
                </div>
              </div>
            </div>
            <div className={styles.container_scrool}>
              {employees.length > 0 &&
                employees.map((employee) => (
                  <CardPerfil
                    key={employee.employeeId}
                    nome={employee.name}
                    email={employee.email}
                    password={employee.password}
                    id={employee.employeeId}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      {isAddingEmployee && (
        <CardAddEmployee handleClose={handleCloseCardEmployee} />
      )}
    </div>
  );
};

export default EmployeePage;

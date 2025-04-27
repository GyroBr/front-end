import React, { useEffect, useState } from "react";
// import axios from 'axios';
import Sidebar from "../../components/SideBar/Sidebar";
// import CardFunc from "../../components/CardFunc/CardFunc";
import styles from "../Employee/EmployeeStyle.module.css";
import { BsPlusLg, BsTrash3, BsPencil } from "react-icons/bs";
import { toast } from 'react-toastify';
// import jwt from 'jsonwebtoken';
// import api from '../../api';
import { getEnterpriseById } from "../../services/enterprise/enterprise";
import { TbElevator } from "react-icons/tb";
import CardPerfil from "../../components/CardPerfil/CardPerfil";
import CardAddEmployee from "../../components/CardPerfil/CardAddEmployee";
import { registerEmployee, getEmployees } from "../../services/employes/employe";

const EmployeePage = () => {

    const [employees, setEmployees] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingEmployee, setIsAddingEmployee] = useState(false);
    const [isEditable, setIsEditable] = useState(true);
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
        cidade: ""
    });

    //carrega assim que a pagina carrega
    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('token');
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
                        cidade: data.address.city
                    });
                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('token');
            if (token) {
                // Faça a requisição GET aqui
                try {
                    const data = await getEmployees(token);
                    // console.log(data, 'dados dos funcionarios'); // Processar os dados conforme necessário
                    
                    setEmployees(data.data.employees);

                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
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
            [name]: value
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
        console.error(dataToSend)
        try {
            const token = sessionStorage.getItem('token');  // Pega o token do sessionStorage

            const response = await api.put(`/admin/update-enterprise/${enterpriseData.id}`, dataToSend, {
                headers: {
                    "content-type": "application/json",
                    "Authorization": token
                },
            });

            toast.success('Perfil atualizado com sucesso!', {
                autoClose: 1700,
            });

        } catch (error) {
            // setIsEditing(false);

            toast.error('Erro ao atualizar perfil!', {
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
                    <h1>Perfil</h1>
                </div>

                <div className={styles.card_conteudo}>
                    <div className={styles.container_perfil}>
                        <button className={styles.card_btn} onClick={handleEditClick}>
                            Editar Perfil
                            <BsPencil className={styles.icon_pencil} />
                        </button>

                        <div className={styles.container_user_profile}>
                            <div className={styles.line}>
                                <div className={styles.box}>
                                    <span>Nome</span>
                                    <input
                                        type="text"
                                        name="nome"
                                        value={enterpriseData.nome}
                                        onChange={handleInputChange}
                                        placeholder="Digite o nome"
                                        className={styles.input}
                                        readOnly={isEditable}
                                    />
                                </div>
                                <div className={styles.box}>
                                    <span>Telefone</span>
                                    <input
                                        type="text"
                                        name="telefone"
                                        value={enterpriseData.telefone}
                                        onChange={handleInputChange}
                                        placeholder="Digite o telefone"
                                        className={styles.input}
                                        readOnly={isEditable}
                                    />
                                </div>
                            </div>

                            <div className={styles.line}>
                                <div className={styles.box}>
                                    <span>Email</span>
                                    <input
                                        type="text"
                                        name="email"
                                        value={enterpriseData.email}
                                        onChange={handleInputChange}
                                        placeholder="Digite o email"
                                        className={styles.input}
                                        readOnly={isEditable}
                                    />
                                </div>
                                <div className={styles.box}>
                                    <span>CNPJ</span>
                                    <input
                                        type="text"
                                        name="cnpj"
                                        value={enterpriseData.cnpj}
                                        onChange={handleInputChange}
                                        placeholder="Digite o cnpj"
                                        className={styles.input}
                                        readOnly={true}
                                        onFocus={(e) => e.target.blur()}

                                    />
                                </div>
                            </div>

                            <div className={styles.line}>
                                <div className={styles.box}>
                                    <span>Setor</span>
                                    <input
                                        type="text"
                                        name="sector"
                                        value={enterpriseData.sector.replace(/_/g, ' ')}
                                        onChange={handleInputChange}
                                        placeholder="Digite o setor"
                                        className={styles.input}
                                        readOnly={true}
                                        onFocus={(e) => e.target.blur()}
                                    />
                                </div>
                                <div className={styles.box}>
                                    <span>Senha</span>
                                    <input
                                        type="password"
                                        name="password"
                                        value={enterpriseData.password}
                                        onChange={handleInputChange}
                                        placeholder="Digite a senha"
                                        className={styles.input}
                                        readOnly={isEditable}
                                    />
                                </div>
                            </div>

                            <div className={styles.line}>
                                <div className={styles.box}>
                                    <span>CEP</span>
                                    <input
                                        type="text"
                                        name="cep"
                                        value={enterpriseData.cep}
                                        onChange={handleInputChange}
                                        placeholder="Digite o cep"
                                        className={styles.input}
                                        readOnly={true}
                                        onFocus={(e) => e.target.blur()}
                                    />
                                </div>
                                <div className={styles.box}>
                                    <span>Rua</span>
                                    <input
                                        type="text"
                                        name="rua"
                                        value={enterpriseData.rua}
                                        onChange={handleInputChange}
                                        placeholder="Digite a Rua"
                                        className={styles.input}
                                        readOnly={true}
                                        onFocus={(e) => e.target.blur()}
                                    />
                                </div>
                            </div>

                            <div className={styles.line}>
                                <div className={styles.box}>
                                    <span>Número</span>
                                    <input
                                        type="text"
                                        name="numero"
                                        value={enterpriseData.numero}
                                        onChange={handleInputChange}
                                        placeholder="Digite o número"
                                        className={styles.input}
                                        readOnly={true}
                                        onFocus={(e) => e.target.blur()}
                                    />
                                </div>
                                <div className={styles.box}>
                                    <span>Bairro</span>
                                    <input
                                        type="text"
                                        name="bairro"
                                        value={enterpriseData.bairro}
                                        onChange={handleInputChange}
                                        placeholder="Digite o bairro"
                                        className={styles.input}
                                        readOnly={true}
                                        onFocus={(e) => e.target.blur()}
                                    />
                                </div>
                            </div>

                            <div className={styles.line}>
                                <div className={styles.box}>
                                    <span>Cidade</span>
                                    <input
                                        type="text"
                                        name="cidade"
                                        value={enterpriseData.cidade}
                                        onChange={handleInputChange}
                                        placeholder="Digite a cidade"
                                        className={styles.input}
                                        readOnly={true}
                                        onFocus={(e) => e.target.blur()}
                                    />
                                </div>
                                {/* <div className={styles.box}>
                                    <span>Estado</span>
                                    <input type="text" placeholder="Digite o estado" className={styles.input} />
                                </div> */}
                            </div>

                            {isEditing && (
                                <div className={styles.button_group}>
                                    <button className={styles.btn_cancel} onClick={handleCancelClick}>
                                        Cancelar
                                    </button>
                                    <button className={styles.btn_confirm} onClick={handleConfirmClick}>
                                        Confirmar
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                    <div className={styles.container_card}>
                        <button className={styles.card_btn} onClick={handleOpenCardEmployee}>
                            Adicionar Funcionário
                            <BsPlusLg className={styles.icon} />
                        </button>
                        <div className={styles.container_scrool}>
                            {employees.length > 0 && employees.map((employee) => (
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

export default EmployeePage
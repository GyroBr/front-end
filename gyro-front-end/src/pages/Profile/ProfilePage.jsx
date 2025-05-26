import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import styles from "../Profile/ProfileStyle.module.css";
import { BsPencil } from "react-icons/bs";
import { toast } from 'react-toastify';
import { getEnterpriseById, updateEnterprise } from "../../services/enterprise/enterprise";
import CardAddEmployee from "../../components/CardPerfil/CardAddEmployee";

const EmployeePage = () => {
    // const [employees, setEmployees] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingEmployee, setIsAddingEmployee] = useState(false);
    const [isEditable, setIsEditable] = useState(true);
    const [enterpriseData, setEnterpriseData] = useState({
        id: "",
        name: "",
        phoneNumber: "",
        email: "",
        cnpj: "",
        sector: "",
        password: "",
        address: {
            postalCode: "",
            street: "",
            number: "",
            neighborhood: "",
            city: "",
            federativeUnity: "SP",
            state: "São Paulo"
        }
    });

    // Carrega os dados quando a página é montada
    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('token');
            if (token) {
                try {
                    const data = await getEnterpriseById(token);
                    setEnterpriseData({
                        id: data.enterpriseId,
                        name: data.name,
                        phoneNumber: data.phoneNumber,
                        email: data.email,
                        cnpj: data.cnpj,
                        sector: data.sector,
                        password: data.password,
                        address: {
                            postalCode: data.address.postalCode,
                            street: data.address.street,
                            number: data.address.number,
                            neighborhood: data.address.neighborhood,
                            city: data.address.city,
                            federativeUnity: data.address.federativeUnity || "SP",
                            state: data.address.state || "São Paulo"
                        }
                    });
                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                }
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Verifica se o campo pertence ao endereço
        if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            setEnterpriseData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
        } else {
            setEnterpriseData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setIsEditable(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setIsEditable(true);
        window.location.reload();
    };

    const handleCloseCardEmployee = () => {
        setIsAddingEmployee(false);
    };

    const handleConfirmClick = async () => {
        try {
            const token = sessionStorage.getItem('token');
            
            // Preparar os dados no formato esperado pelo backend
            const empresaData = {
                name: enterpriseData.name,
                phoneNumber: enterpriseData.phoneNumber,
                email: enterpriseData.email,
                password: enterpriseData.password,
                cnpj: enterpriseData.cnpj,
                sector: enterpriseData.sector,
                address: {
                    postalCode: enterpriseData.address.postalCode,
                    street: enterpriseData.address.street,
                    number: enterpriseData.address.number,
                    neighborhood: enterpriseData.address.neighborhood,
                    city: enterpriseData.address.city,
                    federativeUnity: enterpriseData.address.federativeUnity,
                    state: enterpriseData.address.state
                }
            };

            console.log('Dados sendo enviados:', empresaData);

            const response = await updateEnterprise(empresaData, token);
            
            if (response) {
                toast.success('Perfil atualizado com sucesso!', {
                    autoClose: 1700,
                });
                setIsEditing(false);
                setIsEditable(true);
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error.response?.data || error.message);
            toast.error('Erro ao atualizar perfil! Verifique todos os campos obrigatórios.', {
                autoClose: 2500,
            });
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
                            <BsPencil className={styles.icon_pencil} />
                        </button>

                        <div className={styles.container_user_profile}>
                            <div className={styles.line}>
                                <div className={styles.box}>
                                    <span>Nome</span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={enterpriseData.name}
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
                                        name="phoneNumber"
                                        value={enterpriseData.phoneNumber}
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
                                        name="address.postalCode"
                                        value={enterpriseData.address.postalCode}
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
                                        name="address.street"
                                        value={enterpriseData.address.street}
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
                                        name="address.number"
                                        value={enterpriseData.address.number}
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
                                        name="address.neighborhood"
                                        value={enterpriseData.address.neighborhood}
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
                                        name="address.city"
                                        value={enterpriseData.address.city}
                                        onChange={handleInputChange}
                                        placeholder="Digite a cidade"
                                        className={styles.input}
                                        readOnly={true}
                                        onFocus={(e) => e.target.blur()}
                                    />
                                </div>
                                <div className={styles.box}>
                                    <span>Estado (UF)</span>
                                    <input
                                        type="text"
                                        name="address.federativeUnity"
                                        value={enterpriseData.address.federativeUnity}
                                        onChange={handleInputChange}
                                        placeholder="Digite a UF"
                                        className={styles.input}
                                        readOnly={isEditable}
                                    />
                                </div>
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
                </div>
            </div>
            {isAddingEmployee && (
                <CardAddEmployee handleClose={handleCloseCardEmployee} />
            )}
        </div>
    );
};

export default EmployeePage;
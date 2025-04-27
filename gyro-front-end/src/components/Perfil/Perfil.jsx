import { FotoPerfil } from "../NavBarLateral/FotoPerfil/FotoPerfil";
import { InputPefil } from "../InputPerfil/InputPerfil";
import { useState } from "react";

import iconEdit from '../../assets/icons/lapisEditar.svg';

import styles from './Perfil.module.css';

const dados = {
    nome: 'João da Silva',
    email: 'email.com',
    empresa: 'gyro',
    cargo: 'gestor',
    celular: '123456789',
    cpfCnpj: '22334422321'
}

export function Perfil() {
    const [habilitado, setHabilitado] = useState(false);

    const [nome, setNome] = useState(dados.nome);
    const [email, setEmail] = useState(dados.email);
    const [empresa, setEmpresa] = useState(dados.empresa);
    const [cargo, setCargo] = useState(dados.cargo);
    const [celular, setCelular] = useState(dados.celular);
    const [cpfCnpj, setCpfCnpj] = useState(dados.cpfCnpj);

    return (
        <div className={styles.container}>

          
                <div className={styles.tituloPag}>
                    <h1>Gestão de Perfil</h1>
                </div>

                <div className={styles.blocoSuperior}>
                    <div className={styles.fotoPerfil}>
                        <FotoPerfil />
                        {habilitado && 
                        <div className={styles.botaoEditarImagem}>
                            
                            <button 
                            className={styles.botaoPerfil} onClick={() => setHabilitado(true)}>
                            <img src={iconEdit} alt="editar" />
                            Editar Foto
                            </button>
                        </div>
                     }
                    </div>

                    <div className={styles.DadosPerfil}>

                        <div className={styles.inputs}>
                            <div className={styles.inputsBloco}>
                                <p>Nome</p>
                                <InputPefil 
                                    type="text" 
                                    placeholder="nome" 
                                    habilitado={habilitado} 
                                    value={nome}
                                    set={setNome}
                                />
                                <p>Email</p>
                                <InputPefil 
                                    type="text" 
                                    placeholder="email" 
                                    habilitado={habilitado} 
                                    value={email}
                                    set={setEmail}
                                />
                                <p>Empresa</p>
                                <InputPefil 
                                    type="text" 
                                    placeholder="empresa" 
                                    habilitado={habilitado}
                                    value={empresa}
                                    set={setEmpresa} 
                                />
                            </div>

                            <div className={styles.inputsBloco}>
                            <p>Cargo</p>
                                <InputPefil 
                                    type="text" 
                                    placeholder="cargo" 
                                    habilitado={habilitado}
                                    value={cargo}
                                    set={setCargo}
                                />
                                <p>Celular</p>
                                <InputPefil 
                                    type="text" 
                                    placeholder="celular" 
                                    habilitado={habilitado}
                                    value={celular}
                                    set={setCelular} 
                                />
                                <p>CPF/CNPJ</p>    
                                <InputPefil 
                                    type="text" 
                                    placeholder="CPF/CNPJ" 
                                    habilitado={habilitado} 
                                    value={cpfCnpj}
                                    set={setCpfCnpj}
                                />
                            </div>
                        </div>

                        <div className={styles.botao}>
                            {!habilitado &&
                            <div>
                                <button 
                                    className={styles.botaoPerfil} onClick={() => setHabilitado(true)}>
                                    Editar Perfil
                                </button>
                            </div>
                            }
                            {habilitado && 
                                <button className={styles.botaoPerfil} onClick={() => setHabilitado(false)}>
                                    Salvar
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.divisoria}></div>

        </div>
    );
}

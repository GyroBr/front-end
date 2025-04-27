import React, { useState, useEffect } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { toast } from "react-toastify";
import styles from "./RegisterStyle.module.css";
import { useNavigate } from "react-router-dom";
import { registerEnterprise } from "../../services/enterprise/enterprise";
// import { toast } from "react-toastify";
import viaCepService from "../../services/viacep/viacep";


const RegisterComponent = () => {
  const setores = [
    "RESTAURANTES",
    "BARES_E_PUBS",
    "CAFETERIAS_E_PADARIAS",
    "LANCHONETES",
    "EMPORIOS_E_MERCEARIAS",
    "SUPERMERCADOS_E_HIPERMERCADOS",
    "ADEGAS_E_VINICOLAS",
    "INDUSTRIAS_DE_BEBIDAS",
    "DISTRIBUIDORAS_DE_ALIMENTOS_E_BEBIDAS",
    "FOOD_TRUCKS",
    "EVENTOS_E_CATERING",
    "MERCADOS_DE_ALIMENTOS_ORGANICOS",
    "FABRICAS_DE_PRODUTOS_ALIMENTICIOS",
    "CLUBES_E_ASSOCIACOES_DE_BEBIDAS",
    "COMERCIOS_DE_PRODUTOS_GOURMET",
  ];

  const fieldNameMap = {
    name: "Nome empresarial",
    phoneNumber: "Telefone",
    cnpj: "CNPJ",
    email: "E-mail",
    password: "Senha",
    sector: "Setor",
    address: {
      street: "Rua",
      number: "Número",
      postalCode: "CEP",
      neighborhood: "Bairro",
      city: "Cidade",
    },
  };


  const [usuario, setUsuario] = useState({
    name: "",
    phoneNumber: "",
    cnpj: "",
    email: "",
    password: "",
    sector: "",
    address: {
      street: "",
      number: "",
      postalCode: "",
      neighborhood: "",
      //lembrar de verificar.
      federativeUnity: "SP",
      state: "São Paulo",
      //lembrar de verificar.
      city: "",
    },
  });

  const [fase, setFase] = useState(1);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    if (fase === 1) {
      if (field === "phoneNumber" && value.length > 11) {
        value = value.slice(0, 11);
      }
      if (field === "cnpj" && value.length > 14) {
        value = value.slice(0, 14);
      }
      if (field === "postalCode" && value.length > 8) {
        value = value.slice(0, 8);
      }

      setUsuario({ ...usuario, [field]: value });
    } else {
      setUsuario({
        ...usuario,
        address: { ...usuario.address, [field]: value },
      });
    }
  };

  const handleNext = () => setFase(2);
  const handleBack = () => setFase(1);

  const handleCadastrarUsuario = async () => {
    try {
      await registerEnterprise(usuario);
      toast.success("Empresa cadastrada com sucesso!", { autoClose: 700 });
      setTimeout(() => {
        navigate("/Login");
      }, 900);
    } catch (error) {
      const errorMessages = error.response?.data || [];
      console.log(errorMessages);
  
      if (errorMessages === "O setor da empresa precisa ser definido") {
        toast.error(`O setor em qual sua empresa atual precisa ser definido`, {
          autoClose: 7000,
        });
      }
  
      errorMessages.forEach((error) => {
        const fieldParts = error.field.split(".");
        let fieldName = fieldNameMap;
  
        fieldParts.forEach((part) => {
          fieldName = fieldName[part] || part;
        });
  
        toast.error(`Erro no campo ${fieldName}: ${error.message}`, {
          autoClose: 7000,
        });
      });
    }
  };
  

  useEffect(() => {
    if (usuario.address.postalCode.length === 8) {
      viaCepService(usuario.address.postalCode).then((data) => {
        if (data) {
          setUsuario((prevUsuario) => ({
            ...prevUsuario,
            address: {
              ...prevUsuario.address,
              street: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
            },
          }));
        }
      });
    }
  }, [usuario.address.postalCode]);

  return (
    <div className={styles.div_mother}>
      <div className={styles.div_left}>
        <div className={styles.div_img}></div>
      </div>
      <div className={styles.div_form}>
        <div className={styles.div_logo}></div>
        <p className={styles.subtittle}>
          Junte-se a nós e potencialize seu negócio <span className={styles.colored_dot}>.</span>
        </p>
        <div className={styles.setasEtapas}>
          <img src="../../src/assets/images/linha_laranja.svg" alt="" />
          <img
            src={
              fase === 1
                ? "../../src/assets/images/seta_cinza.svg"
                : "../../src/assets/images/seta_laranja.svg"
            }
            alt=""
          />
        </div>

        {fase === 1 && (
          <div>
            <h3>Informações Básicas</h3>
            <div className={styles.forms}>
              <div className={styles.groupForms}>
                <h6>Nome empresarial</h6>
                <input
                  type="text"
                  value={usuario.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className={styles.groupForms}>
                <h6>Telefone</h6>
                <input
                  type="text"
                  value={usuario.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  maxLength={11}
                />
              </div>
              <div className={styles.groupForms}>
                <h6>CNPJ</h6>
                <input
                  type="text"
                  value={usuario.cnpj}
                  onChange={(e) => handleChange("cnpj", e.target.value)}
                />
              </div>
              <div className={styles.groupForms}>
                <h6>E-mail</h6>
                <input
                  type="email"
                  value={usuario.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className={styles.groupForms}>
                <h6>Senha</h6>
                <input
                  type="password"
                  value={usuario.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </div>
              <div className={styles.groupForms}>
                <h6>Setor</h6>
                <select
                  value={usuario.sector}
                  onChange={(e) => handleChange("sector", e.target.value)}
                >
                  <option value="">Selecione um setor</option>
                  {setores.map((setor) => (
                    <option key={setor} value={setor}>
                      {setor.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <button to={"/"} onClick={() => navigate('/')} className={styles.backButton}>
                <GrFormPrevious /> Voltar
              </button>
              <button onClick={handleNext} className={styles.nextButton}>
                Continuar <GrFormNext />
              </button>
            </div>
          </div>
        )}

        {fase === 2 && (
          <div>
            <h3>Endereço</h3>
            <div className={styles.forms}>
              <div className={styles.groupForms}>
                <h6>CEP</h6>
                <input
                  type="text"
                  value={usuario.address.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                  maxLength={8}
                />
              </div>
              <div className={styles.groupForms}>
                <h6>Número</h6>
                <input
                  type="text"
                  value={usuario.address.number}
                  onChange={(e) => handleChange("number", e.target.value)}
                />
              </div>
              <div className={styles.groupForms}>
                <h6>Rua</h6>
                <input
                  type="text"
                  value={usuario.address.street}
                  readOnly // Campo somente leitura
                />
              </div>
              <div className={styles.groupForms}>
                <h6>Bairro</h6>
                <input
                  type="text"
                  value={usuario.address.neighborhood}
                  readOnly // Campo somente leitura
                />
              </div>
              <div className={styles.groupForms}>
                <h6>Cidade</h6>
                <input
                  type="text"
                  value={usuario.address.city}
                  readOnly // Campo somente leitura
                />
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={handleBack} className={styles.backButton}>
                <GrFormPrevious /> Voltar
              </button>
              <button onClick={handleCadastrarUsuario} className={styles.cadButton}>
                Cadastrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterComponent

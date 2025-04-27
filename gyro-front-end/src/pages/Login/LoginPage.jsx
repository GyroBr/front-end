import React, { useState } from 'react'
import styles from './LoginStyle.module.css';
import { auth } from "../../services/auth/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";

// import React from 'react'

const LoginComponent = () => {
  const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
  
    const handleLogar = async () => {
      const dados = {
        email: login,
        password: senha
      };
      console.log('Dados enviados:', dados);
  
      await auth(dados)
        .then((response) => {
          sessionStorage.setItem('token', response.token);
          toast.success('Login efetuado com sucesso!', {
            autoClose: 700,
          });
          console.log(response)
          navigate('/stock');
        }).catch((error) => {
          const errorMessages = error.response.data;
  
          if(error.response.status === 401){
  
            toast.error(errorMessages)
          }
         
          errorMessages.forEach((error) => {
            toast.error(`Erro em ${error.field}: ${error.message}`, {
              autoClose: 4000,
            });
          });
        });
    };
  
    return (
      <div className={styles.div_mother}>
        <a href="."><MdArrowBack className={styles.arrow_back} /></a>
        <div className={styles.div_form}>
          <div className={styles.div_logo}></div>
          <p className={styles.subtittle}>Bem-vindo de volta! Acesse sua conta <span className={styles.colored_dot}>.</span></p>
          <div className={styles.forms}>
            <div className={styles.groupForms}>
              <h5>E-mail</h5>
              <input type="email" onChange={(e) => setLogin(e.target.value)} />
            </div>
            <div className={styles.groupForms}>
              <h5>Senha</h5>
              <input type="password" onChange={(e) => setSenha(e.target.value)} />
            </div>
            <a className={styles.linkForget} href="http://">Esqueceu a senha?</a>
          </div>
          <button onClick={handleLogar} className={styles.login_button}>Login</button>
        </div>
        <div className={styles.div_right}>
          <div className={styles.div_img}></div>
        </div>
      </div>
    );
}

export default LoginComponent
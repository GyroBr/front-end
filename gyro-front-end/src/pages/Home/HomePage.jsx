import React from "react";
import styles from "./HomeStyle.module.css";
import NavBarComponent from "./NavBar/NavBarComponent";

import visionIcon from "../../assets/images/vision.svg";
import missionIcon from "../../assets/images/mission.svg";
import big from "../../assets/images/logo.svg";
import { Link, NavLink } from "react-router-dom";
import valueIcon from "../../assets/images/value.svg";
import locationIcon from "../../assets/images/loc.svg";
import telephoneIcon from "../../assets/images/tel.svg";
import imagem360 from "../../assets/images/360img.png";

import faceIcon from "../../assets/images/facebook.png";
import twitterIcon from "../../assets/images/twitter.png";
import linkIcon from "../../assets/images/linkedin.webp";
import tubeIcon from "../../assets/images/youtube.webp";
import instaIcon from "../../assets/images/instagram.png";
import googleIcon from "../../assets/images/google.webp";
import pinterestIcon from "../../assets/images/pinterest.png";

const HomeComponent = () => {
  return (
    <div className={styles.home}>
      <NavBarComponent />

      <section className={styles.banner1} id="home">
        <div className={styles.banner_shadow}>
          <div className={styles.banner_content}>
            <h1>
              O dia a dia do seu <b>COMÉRCIO</b> nunca foi tão <b>SIMPLES</b>
              <b className={styles.point}> .</b>
            </h1>
            <p>Seja nosso parceiro e simplifique a gestão do seu comércio.</p>
            <button>Saiba Mais</button>
          </div>
        </div>
      </section>

      <section className={styles.banner2} id="servicos">
        <div className={styles.banner_content}>
          <h1>
            Gestão na Palma da <b>Sua Mão</b>
            <b className={styles.point}> .</b>
          </h1>
          <p>
            Leve a gestão do seu negócio para onde você estiver com o nosso
            aplicativo.
          </p>
          <button>Conhecer</button>
        </div>
      </section>

      <section className={styles.banner3}>
        <div className={styles.banner_shadow}>
          <div className={styles.banner_content}>
            <h1>
              Você <b>simplifica</b> processos e maximiza a eficiência do seu{" "}
              <b>negócio</b>
              <b className={styles.point}> .</b>
            </h1>
            <p>Seja nosso parceiro e simplifique a gestão do seu comércio.</p>
            <button>Junte-se a nós</button>
          </div>
        </div>
      </section>
      <section className={styles.banner4}>
        <div className={styles.banner_content}>
          <div className={styles.img360}></div>
          <div className={styles.teste}>
            <h1>
              <b>Suporte Total</b>
              <b className={styles.point}> 360°</b>
            </h1>
            <p>Desde a gestão diária até análises avançadas.</p>
            <button>Conhecer</button>
            {/* <NavLink to={"/Cadastro"} className={stylesNavBar.buttonCadastro}>Cadastrar</NavLink> */}
          </div>
        </div>
      </section>
      <section className={styles.banner5}>
        <div className={styles.banner_shadow}>
          <div className={styles.banner_content}>
            <h1>
              Controle Total do <b>Faturamento</b>
              <b className={styles.point}> .</b>
            </h1>
            <p>
              Monitore receitas e otimize a saúde financeira do seu negócio com
              nossas ferramentas avançadas.
            </p>
            <button>Junte-se a nós</button>
          </div>
        </div>
      </section>
      <section className={styles.banner6}>
        <div className={styles.banner_content}>
          <h1>
            <b>Garantindo</b> o acompanhamento e gestão eficiente do{" "}
            <b>seu negócio</b>
            <b className={styles.point}> .</b>
          </h1>
          <p>Seja nosso parceiro e simplifique seu comércio.</p>
          <button>Conhecer</button>
        </div>
      </section>

      <section className={styles.banner7} id="sobre">
        <div className={styles.banner_content}>
          <div className={styles.div_Title}>
            <h1>
              Nossa Filosofia <b className={styles.point}> .</b>
            </h1>
            <p>
              Descubra os pilares que sustentam nossa empresa, que orientam
              nossas ações e nosso compromisso com o sucesso dos nossos
              clientes.
            </p>
          </div>
          <div className={styles.div_SubText}>
            <div className={styles.card}>
              <img className={styles.icons} src={missionIcon} alt="Mission" />
              <h1>Missão</h1>
              <p>
                Criar um sistema inteligente que simplifique a gestão de
                comércios, possibilitando nossos clientes a focarem no que fazem
                de melhor: criar experiências excepcionais para seus
                consumidores.
              </p>
            </div>
            <div className={styles.card}>
              <img className={styles.icons} src={visionIcon} alt="Vision" />
              <h1>Visão</h1>
              <p>
                Ser referência nacional em solução tecnológica para o setor de
                Alimentos e Bebidas, revolucionando a gestão e promovendo o
                sucesso dos nossos clientes.
              </p>
            </div>
            <div className={styles.card}>
              <img className={styles.icons} src={valueIcon} alt="Value" />
              <h1>Valores</h1>
              <p>Nossos valores são os princípios que orientam nossas decisões,
                relações e cultura: <br />Inovação, Comprometimento, Excelência, Transparência e Colaboração.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.banner8} id="contato">
        <div className={styles.banner_content_text}>
          <h1>Ainda tem dúvidas sobre a GYRO na sua empresa ?</h1>
          <p>
            Você ainda pode falar com um dos nossos atendentes especializados,
            vamos tirar todas as suas dúvidas e mostrar o por que podemos
            transformar o seu comércio com a Gyro.
          </p>
        </div>
        <div className={styles.card_email}>
          <div className={styles.banner_content}>
            <div className={styles.card}>
              <p>E-mail</p>
              <input type="text" className={styles.input_description} />
            </div>
            <div className={styles.card2}>
              <p>Mensagem</p>
              <input type="text" className={styles.input_message} />
            </div>
          </div>
          <button className={styles.bu}>Enviar</button>
        </div>
      </section>

      <footer>
        <div className={styles.banner_content}>
          <div className={styles.div_icon}>
            <img className={styles.big_icon} src={big} alt="GYRO" />
          </div>
          <div className={styles.div_contact}>
            <div className={styles.card}>
              <div className={styles.card_location}>
                <img
                  className={styles.icon}
                  src={locationIcon}
                  alt="Location"
                />
                <p>Avenida Bela Vista, 2537, São Paulo - SP</p>
              </div>
              <div className={styles.card_telephone}>
                <img
                  className={styles.icon}
                  src={telephoneIcon}
                  alt="Location"
                />
                <p>(11) 4533-8990</p>
              </div>
            </div>
            <div className={styles.card2}>
              <p>Social Media</p>
              <div className={styles.icons_footer}>
                <img className={styles.icon} src={faceIcon} alt="Facebook" />
                <img className={styles.icon} src={twitterIcon} alt="Twitter" />
                <img className={styles.icon} src={linkIcon} alt="Linkedin" />
                <img className={styles.icon} src={tubeIcon} alt="Youtube" />
                <img className={styles.icon} src={instaIcon} alt="Instagram" />
                <img className={styles.icon} src={googleIcon} alt="Google" />
                <img
                  className={styles.icon}
                  src={pinterestIcon}
                  alt="Pinterest"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.banner_content_text}>
          <div className={styles.div1}>
            <ul>
              <li>ABOUT US</li>
              <li>CONTACT US</li>
              <li>HELP</li>
              <li>PRIVACY POLICY</li>
            </ul>
          </div>
          <div className={styles.div2}>
            <p>Gyro © 2024 • All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeComponent;

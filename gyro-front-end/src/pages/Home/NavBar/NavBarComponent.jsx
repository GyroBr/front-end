import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBarStyle.module.css";
import logo from "../../../assets/images/logo.svg";

const NavBarComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isWhiteText, setIsWhiteText] = useState(true);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const banner4Position = document.getElementById("servicos")?.offsetTop || 0;
    const banner7Position = document.getElementById("sobre")?.offsetTop || 0;

    setIsWhiteText(!(scrollY >= banner4Position && scrollY < banner7Position));
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({ top: section.offsetTop - 80, behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`${styles.navbar1} ${isWhiteText ? styles.whiteText : styles.blackText}`}>
      <a href="#home">
        <img src={logo} alt="logo" className={styles.logo} />
      </a>
      <div className={styles.menu} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul id="ulNavBar" className={menuOpen ? "Open" : ""}>
        <li>
          <a href="#home" onClick={() => scrollToSection("home")}>Home</a>
        </li>
        <li>
          <a href="#servicos" onClick={() => scrollToSection("servicos")}>Serviços</a>
        </li>
        <li>
          <a href="#sobre" onClick={() => scrollToSection("sobre")}>Sobre Nós</a>
        </li>
        <li>
          <a href="#contato" onClick={() => scrollToSection("contato")}>Contato</a>
        </li>
        <li>
            <NavLink to={"/login"} className={styles.buttonLogin}>Acessar Conta</NavLink>
        </li>
        <li>
            <NavLink to={"/register"} className={styles.buttonCadastro}>Cadastrar</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBarComponent;

import React, { useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/images/logo.svg';
import styles from './NavBar.module.css';

export const NavBar = ({ logoInicio }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isWhiteText, setIsWhiteText] = useState(true);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const banner4Position = document.querySelector(`.${styles.banner4}`).offsetTop;
        const banner7Position = document.querySelector(`.${styles.banner7}`).offsetTop;
        console.log('tete', scrollY);
        if (scrollY >= banner4Position && scrollY < banner7Position) {
            setIsWhiteText(false);
            console.log('tete');
            
        } else {
            setIsWhiteText(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`${styles.navbar1} ${isWhiteText ? styles.whiteText : styles.blackText}`}>
                <Link to={"/"}>
                    <img src={logo} alt="logo" className={styles.logo} />
                </Link>
                <div className={styles.menu} onClick={() => { setMenuOpen(!menuOpen) }}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menuOpen ? "Open" : ""}>
                    <li>
                        <NavLink to={"/"} className={styles.logo}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/Servicos"}>Serviços</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/Sobre"}>Sobre Nós</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/Duvidas"}>Dúvidas</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/login"} className={styles.buttonLogin}>Acessar Conta</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/Cadastro"} className={styles.buttonCadastro}>Cadastrar</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default NavBar;

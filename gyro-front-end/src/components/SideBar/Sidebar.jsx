import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../SideBar/Sidebar.module.css";
import { CiLogout } from "react-icons/ci";
import {
    BsBarChartFill,
    BsReverseLayoutTextSidebarReverse,
    BsBox,
    BsCart4,
    BsJustify,
    BsPerson,
    BsBoxArrowLeft,
} from "react-icons/bs";
import { MdOutlineMenuBook } from "react-icons/md";
import { getEnterpriseById, isAdmin } from "../../services/enterprise/enterprise";

const Menu = () => {
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const [admin, setAdmin] = useState([]);

    useEffect(() => {
        const menuItem = menuRef.current.querySelectorAll(`.${styles.item_menu}`);

        function selectLink(event) {
            menuItem.forEach((item) => item.classList.remove(styles.ativo));
            event.currentTarget.classList.add(styles.ativo);
        }

        menuItem.forEach((item) => item.addEventListener("click", selectLink));

        return () => {
            menuItem.forEach((item) => item.removeEventListener("click", selectLink));
        };
    }, []);

    useEffect(() => {
        const fetchEnterpriseData = async () => {
            const token = sessionStorage.getItem("token");
            try {
                const data = await getEnterpriseById(token);
                // console.log("Enterprise Data:", data);
            } catch (error) {
                console.error("Erro ao buscar os dados da empresa:", error.message);
            }
        };

        fetchEnterpriseData();
    }, []);


    useEffect(() => {

        const fetchIsAdmin = async () => {

            const token = sessionStorage.getItem("token")
            try {
                const response = await isAdmin(token);
                const data = response.data;

                setAdmin(data)

                

            } catch (error) {
                console.log("error from is admin" , error.response)
            }

        }

        fetchIsAdmin()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const token = sessionStorage.getItem("token");
            if (!token) {
                navigate("/"); // Redireciona para a página de login se o token não existir
            }
        }, 1000); // Verifica a cada 1 segundo

        return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/"); // Redireciona para a página de login após o logout
    };

   

    return (
        <nav className={styles.menu_lateral} ref={menuRef}>
            <div className={styles.btn_expandir}>
                <BsJustify />
            </div>

            <ul>
                <li className={styles.item_menu} style={{display: admin ? "block" : "none"}}>
                    <a href="/dashPage">
                        <span className={styles.icon}>
                            <BsBarChartFill />
                        </span>
                        <span className={styles.txt_link}>DashBoard</span>
                    </a>
                </li>

                <li className={styles.item_menu} style={{display: admin ? "block" : "none"}}>
                    <a href="/history">
                        <span className={styles.icon}>
                            <BsReverseLayoutTextSidebarReverse />
                        </span>
                        <span className={styles.txt_link}>Histórico</span>
                    </a>
                </li>

                <li className={styles.item_menu}
                 style={{display : admin ? "none" : "block"}}
                 >
                    <a href="/order">
                        <span className={styles.icon}>
                            <BsCart4 />
                        </span>
                        <span className={styles.txt_link}>Pedidos</span>
                    </a>
                </li>
                <li className={styles.item_menu}>
                    <a href="/stock">
                        <span className={styles.icon}>
                            <BsBox />
                        </span>
                        <span className={styles.txt_link}>Estoque</span>
                    </a>
                </li>

                 {/* <li className={styles.item_menu}>
                    <a href="/CardapioPage">
                        <span className={styles.icon}>
                            <MdOutlineMenuBook  />
                        </span>
                        <span className={styles.txt_link}>Menu</span>
                    </a>
                </li>  */}

                <li className={styles.item_menu}
                 style={{display: admin ? "block" : "none"}}
                 >
                    <a href="/Employee">
                        <span className={styles.icon}>
                            <BsPerson />
                        </span>
                        <span className={styles.txt_link}>Perfil</span>
                    </a>
                </li>

                <li className={styles.item_menu_out}>
                    <a onClick={handleLogout} href="#">
                        <span className={styles.icon}>
                            <BsBoxArrowLeft />
                        </span>
                        <span className={styles.txt_link}>Sair</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;

import React, { useEffect, useState, useRef } from "react";
import styles from "./NavIntern.module.css";
import { getAllCategories } from "../../services/product/product";
import { FaFilterCircleXmark } from "react-icons/fa6";

const NavIntern = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const menuRef = useRef(null);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories(token);
        setCategories(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    const menuItem = menuRef.current?.querySelectorAll(`.${styles.menu_top} ul li`);

    function selectLink(event) {
      if (menuItem) {
        menuItem.forEach((item) => item.classList.remove(styles.ativo));
        event.currentTarget.classList.add(styles.ativo);
      }
    }

    if (menuItem) {
      menuItem.forEach((item) => item.addEventListener("click", selectLink));
    }

    return () => {
      if (menuItem) {
        menuItem.forEach((item) => item.removeEventListener("click", selectLink));
      }
    };
  }, [categories]);

  // Define a função reloadPage para recarregar a página
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <nav className={styles.menu_top} ref={menuRef}>
      <ul>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <li key={index} className={styles.item_menu}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onCategorySelect(category);
                }}
              >
                <span className={styles.txt_link}>{category}</span>
              </a>
            </li>
          ))
        ) : (
          <li className={styles.item_menu}>
            <a href="#">
              <span className={styles.txt_link}>Nenhuma categoria disponível</span>
            </a>
          </li>
        )}
        <li>
        </li>
      </ul>
          <button className={styles.btn_add} onClick={reloadPage}>
            Limpar filtro <FaFilterCircleXmark className={styles.icon} />
          </button>
    </nav>
  );
};

export default NavIntern;

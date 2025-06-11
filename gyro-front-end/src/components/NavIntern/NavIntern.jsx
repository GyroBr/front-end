import React, { useEffect, useState, useRef } from "react";
import styles from "./NavIntern.module.css";
import { getAllCategories } from "../../services/product/product";
import { FaFilterCircleXmark } from "react-icons/fa6";

const NavIntern = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
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
    const menuItems = menuRef.current?.querySelectorAll(`.${styles.menu_top} ul li`);

    function selectLink(event) {
      if (menuItems) {
        menuItems.forEach((item) => item.classList.remove(styles.ativo));
        event.currentTarget.classList.add(styles.ativo);
      }
    }

    if (menuItems) {
      menuItems.forEach((item) => item.addEventListener("click", selectLink));
    }

    return () => {
      if (menuItems) {
        menuItems.forEach((item) => item.removeEventListener("click", selectLink));
      }
    };
  }, [categories]);

  const handleClearFilter = () => {
    // Limpa o filtro ativo
    setActiveFilter(null);
    
    // Remove a classe ativo de todos os itens
    const menuItems = menuRef.current?.querySelectorAll(`.${styles.menu_top} ul li`);
    if (menuItems) {
      menuItems.forEach((item) => item.classList.remove(styles.ativo));
    }
    
    // Notifica o componente pai que o filtro foi limpo
    onCategorySelect(null);
  };

  const handleCategoryClick = (category) => {
    setActiveFilter(category);
    onCategorySelect(category);
  };

  return (
    <nav className={styles.menu_top} ref={menuRef}>
      <ul>
        {categories.length > 0 ? (
          <>
            {/* <li 
              className={`${styles.item_menu} ${activeFilter === null ? styles.ativo : ''}`}
              onClick={() => handleClearFilter()}
            >
              <a href="#" onClick={(e) => e.preventDefault()}>
                <span className={styles.txt_link}>Todas</span>
              </a>
            </li> */}
            {categories.map((category, index) => (
              <li 
                key={index} 
                className={`${styles.item_menu} ${activeFilter === category ? styles.ativo : ''}`}
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(category);
                  }}
                >
                  <span className={styles.txt_link}>{category}</span>
                </a>
              </li>
            ))}
          </>
        ) : (
          <li className={styles.item_menu}>
            <a href="#">
              <span className={styles.txt_link}>Nenhuma categoria disponível</span>
            </a>
          </li>
        )}
      </ul>
      {activeFilter && (
        <button className={styles.btn_add} onClick={handleClearFilter}>
          Limpar filtro <FaFilterCircleXmark className={styles.icon} />
        </button>
      )}
    </nav>
  );
};

export default NavIntern;
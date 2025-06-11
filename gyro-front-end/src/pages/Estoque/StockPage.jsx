import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import NavIntern from "../../components/NavIntern/NavIntern";
import BtnAddProduct from "../../components/Button/BtnAddProduct";
import BtnAddCombo from "../../components/Button/BtnAddCombo";
import CardEstoque from "../../components/CardEstoque/CardEstoque";
import CardShopList from "../../components/CardEstoque/CardShopList";
import styles from "./StockStyle.module.css";
import { getProducts } from "../../services/product/product";

const EstoquePage = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFullHeight, setIsFullHeight] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  
  useEffect(() => {
    let isMounted = true;
    const token = sessionStorage.getItem("token");

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await getProducts(token);
  
        if (!Array.isArray(products)) {
          throw new Error("Formato de dados inválido recebido da API");
        }

        if (isMounted) {
          setRepositories(products);
          setIsFullHeight(products.length >= 3);
          setLoading(false);
          setInitialLoadComplete(true);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
        if (isMounted) {
          setLoading(false);
          setInitialLoadComplete(true);
        }
      }
    };
  
    fetchProducts();
  
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === "TODOS" ? null : category);
  };

  const filteredRepositories = selectedCategory
    ? repositories.filter((product) => product.category === selectedCategory)
    : repositories;

  return (
    <div className={styles.body}>
      <div className={styles.sidebar_container}>
        <Sidebar />
      </div>
      <div
        className={`${styles.conteudo} ${
          isFullHeight ? styles.autoHeight : styles.fullHeight
        }`}
      >
        <div className={styles.title_page}>
          <h1>Gestão de Estoque</h1>
        </div>
        <div className={styles.navIntern_top}>
          <NavIntern onCategorySelect={handleCategorySelect} />
        </div>
        <div className={styles.container_btn}>
          <BtnAddProduct /> 
          {/* <BtnAddCombo /> */}
        </div>
        <div className={styles.container}>
          {!initialLoadComplete ? (
            <div className={styles.loadingContainer}>
              <p>Carregando produtos...</p>
              {/* Adicione um spinner aqui se desejar */}
            </div>
          ) : filteredRepositories.length === 0 ? (
            <p className={styles.noProducts}>Nenhum produto encontrado.</p>
          ) : (
            <div className={styles.productsGrid}>
              {filteredRepositories.map((repo) => (
                <CardEstoque
                  key={`${repo.productId}-${repo.name}`}
                  id={repo.productId}
                  name={repo.name}
                  barCode={repo.barCode}
                  volume={repo.volume}
                  price={repo.price}
                  image={repo.image}
                  warningQuantity={repo.warningQuantity}
                  category={repo.category}
                  quantity={repo.quantity}
                  expireDate={repo.expiresAt}
                />
              ))}
            </div>
          )}
        </div>
        {initialLoadComplete && (
          <CardShopList
            cartItems={repositories.filter(
              (product) => product.quantity < product.warningQuantity
            )}
            onCreateOrder={null}
            total={repositories
              .filter((product) => product.quantity < product.warningQuantity)
              .reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
              )}
            onPaymentMethodChange={null}
            onCashGivenChange={null}
          />
        )}
      </div>
    </div>
  );
};

export default EstoquePage;
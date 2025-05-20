import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar/Sidebar";
import NavIntern from "../../components/NavIntern/NavIntern";
import BtnAddProduct from "../../components/Button/BtnAddProduct";
import BtnAddCombo from "../../components/Button/BtnAddCombo";
import CardEstoque from "../../components/CardEstoque/CardEstoque";
import CardShopList from "../../components/CardEstoque/CardShopList";
import styles from "./StockStyle.module.css";
import {
  // getProductImage,
  getProducts,
} from "../../services/product/product";

const token = sessionStorage.getItem("token");

const EstoquePage = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFullHeight, setIsFullHeight] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  useEffect(() => {
    let isMounted = true; // Variável para evitar atualizações após desmontagem
  
    const fetchProducts = async () => {
      try {
        const products = await getProducts(token);
  
        if (!Array.isArray(products)) {
          setLoading(false);
          return;
        }
  
        const productsWithImages = await Promise.all(
          products.map(async (product) => {
            if (!product.productId) {
              return null;
            }
  
            try {
              const imageUrl = await getProductImage(token, product.productId);
              console.log("Imagem carregada:", imageUrl);
              return { ...product, image: imageUrl };
            } catch (error) {
              console.warn("Erro ao carregar imagem do produto:", product.productId, error);
              return { ...product, image: "/path/to/default/image.png" };
            }
          })
        );
  
        // Filtra produtos válidos
        const validProducts = productsWithImages.filter((product) => product !== null);
  
        // Evita atualização se o componente foi desmontado
        if (isMounted) {
          setRepositories(validProducts);
          setLoading(false);
          setIsFullHeight(validProducts.length > 6);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
        if (isMounted) setLoading(false);
      }
    };
  
    fetchProducts();
  
    return () => {
      isMounted = false; // Evita atualização do estado após desmontagem
    };
  }, [token]);
  

  const handleCategorySelect = (category) => {
    console.log("Categoria selecionada:", category);
    setSelectedCategory(category);
  };

  const filteredRepositories = selectedCategory
    ? repositories.filter((product) => {
        console.log(
          "Verificando produto:",
          product.category,
          "com categoria selecionada:",
          selectedCategory
        );
        return product.category === selectedCategory;
      })
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
          <BtnAddCombo />
        </div>
        <div className={styles.container}>
          {loading ? (
            <p>Carregando produtos...</p>
          ) : filteredRepositories.length === 0 ? (
            <p>Nenhum produto encontrado.</p>
          ) : (
            <div className={styles.container}>
              {filteredRepositories.map((repo) => (
                <CardEstoque
                  key={`${repo.productId}-${repo.name}`}
                  id={repo.productId}
                  name={repo.name}
                  description={repo.description}
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
            )} // Calcula o total dos produtos com status vermelho
          onPaymentMethodChange={null}
          onCashGivenChange={null}
        />
      </div>
    </div>
  );
};

export default EstoquePage;

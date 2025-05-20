import Sidebar from "../../components/SideBar/Sidebar";
import styles from "./DashPage.module.css";
import React, { useEffect, useState } from "react";
import Grafico from "../../components/graficos/grafico";
import GraficoBar from "../../components/graficos/graficoBar";
import Tabela from "../../components/Tabela/Tabela";
import TabelaCompleta from "../DashBoard/DashBoardBottom/TelaCompleta";
import { getOrders, getBestSeller } from "../../services/history/history";
import { use } from "react";

const DashPage = () => {
  const [orders, setOrders] = useState([]);
  const [salesByEmployee, setSalesByEmployee] = useState({});
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders(token);
        const data = response.data;
        setOrders(data);
      } catch (error) {
        console.error("Erro ao buscar orders:", error);
      }
    };

   
    fetchOrders();
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.sidebar_container}>
        <Sidebar />
      </div>
      <div className={styles.conteudo}>
        <div className={styles.title_page}>
          <h1>Dashboard</h1>
        </div>
        <div className={styles.card_conteudo}>
          <TabelaCompleta />
        </div>
      </div>
    </div>
  );
};

export default DashPage;

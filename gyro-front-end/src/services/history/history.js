import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_HTTPS_IP_ADDRESS,
  headers: {
    "Content-Type": "application/json"
  }
});

export const getOrders = async (token) => {
  try {
    const response = await api.get("/companies/get-company-info", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.orders;
  } catch (error) {
    console.error("Erro ao obter pedidos:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllOrders = async (token) => {
  try {
    const response = await api.get("/orders/get-all-orders", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    console.error("Erro ao obter todos os pedidos:", error.response?.data || error.message);
    throw error;
  }
};

export const getBestSeller = async (token) => {
  try {
    const response = await api.get("/products/top-products", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response?.data || [];
  } catch (error) {
    console.error("Erro ao obter os mais vendidos:", error.response?.data || error.message);
    throw error;
  }
};

export const getTotalSales = async (token) => {
  try {
    const response = await api.get("/companies/get-company-info", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    console.error("Erro ao obter total de vendas:", error.response?.data || error.message);
    throw error;
  }
};

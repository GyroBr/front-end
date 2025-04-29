import axios from "axios";

const api = axios.create({
  baseURL: 'https://18.215.23.142/api',
  headers: {
    "Content-Type": "application/json"
  }
});

export const getOrders = async (token) => {
  try {
    const response = await api.get(`/companies/get-company-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.orders;
  } catch (error) {
    console.error("Erro ao tentar obter dados dos produtos", error.response?.data || error.message);
    throw error;
  }
};

export const getAllOrders = async (token) => {
  try {
    const response = await api.get(`/orders/get-all-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Erro ao tentar obter dados dos produtos", error.response?.data || error.message);
    throw error;
  }
};

export const getBestSeller = async (token) => {
  try {
    const response = await api.get(`/products/top-products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response ? response.data : [];
  } catch (error) {
    console.error("Erro ao tentar obter dados dos produtos", error.response?.data || error.message);
    throw error;
  }
};

export const getTotalSales = async (token) => {
  try {
    const response = await api.get(`/companies/get-company-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Erro ao tentar obter dados dos produtos", error.response?.data || error.message);
    throw error;
  }
};
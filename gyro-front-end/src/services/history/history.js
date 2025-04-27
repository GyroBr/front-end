import axios from "axios";

const api = axios.create(
    {
        // usando URL como variável de ambiente
        baseURL: '/api'
    }
);

export const getOrders = async (token) => {
    try {
        const response = await api.get(`/companies/get-company-info`, {
            headers: {
                "Content-Type": "application/json",
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
                "Content-Type": "application/json",
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
        const response = await axios.get(`/api/products/top-products`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response ? response.data : [];
    } catch (error) {
        console.error("Erro ao tentar obter dados dos produtos", error.response?.data || error.message);
        throw error;
    }
};

//não achei a rota //
export const getTotalSales = async (token) => {
    try {
        const response = await axios.get(`api/companies/get-company-info`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log("Dados dos produtos mais vendidos obtidos com sucesso 24", response);
        
        return response;
    } catch (error) {
        console.error("Erro ao tentar obter dados dos produtos", error.response?.data || error.message);
        throw error;
    }
};
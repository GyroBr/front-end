import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_HTTPS_IP_ADDRESS,
  headers: {
    "Content-Type": "application/json"
  }
});

export const registerEnterprise = async (empresa) => {
  try {
    const response = await api.post("/companies/register", empresa);
    return response;
  } catch (error) {
    console.error("Erro ao tentar registrar a empresa:", error.response?.data || error.message);
    throw error;
  }
};

export const getEnterpriseById = async (token) => {
  try {
    const response = await api.get("/companies/get-company-info", {
      headers: {
        Authorization: token
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao tentar obter informações da empresa:", error.response?.data || error.message);
    throw error;
  }
};

export const isAdmin = async (token) => {
  try {
    const response = await api.get("/auths/is-admin", {
      headers: {
        Authorization: token
      }
    });
    return response;
  } catch (error) {
    console.error("Erro ao tentar verificar o admin:", error.response?.data || error.message);
    throw error;
  }
};

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_HTTPS_IP_ADDRESS,
  headers: {
    "Content-Type": "application/json"
  }
});

export const auth = async (data) => {
  try {
    const response = await api.post("/auths/login", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao logar:", error.response?.data || error.message);
    throw error;
  }
};

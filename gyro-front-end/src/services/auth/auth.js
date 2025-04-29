import axios from "axios";

const api = axios.create({
  baseURL: "https://18.232.231.57",
  headers: {
    "Content-Type": "application/json"
  }
});

export const auth = async (data) => {
    try {
        console.log('Dados enviados:', data);
        const response = await api.post("/api/auths/login", data);
        return response.data;
    } catch (error) {
        console.error("Erro ao logar:", error.response?.data || error.message);
        throw error;
    }
};
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_HTTPS_IP_ADDRESS
});

export default async function viaCepService(cep) {
  try {
    const response = await api.get(`/externals/${cep}`);
    const data = response.data;

    if (data.erro) return null;

    return {
      logradouro: data.logradouro || "",
      bairro: data.bairro || "",
      localidade: data.localidade || "",
    };
  } catch (error) {
    console.error("Erro ao consultar CEP:", error.response?.data || error.message);
    return null;
  }
}

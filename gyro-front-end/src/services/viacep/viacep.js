import axios from "axios";

const api = axios.create({
  baseURL: "https://18.232.231.57"
});

export default async function viaCepService(cep) {
  try {
    const response = await api.get(`/externals/${cep}`);
    const data = response.data;

    console.log(data);

    if (data.erro) {
      console.error('Erro ao buscar o CEP:', data.erro);
      return null;
    }

    return {
      logradouro: data.logradouro || "",
      bairro: data.bairro || "",
      localidade: data.localidade || "",
    };
  } catch (error) {
    console.error("Erro na requisição do CEP:", error);
    return null;
  }
}
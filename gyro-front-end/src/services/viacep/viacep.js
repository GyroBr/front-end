import axios from "axios";

export default async function viaCepService(cep) {
  // const uriViaCep = `https://viacep.com.br/ws/${cep}/json/`;
  // const uriViaCep = `http://gyro-back-end-monolito:8080/externals/${cep}`;
  const uriViaCep = `/api/externals/${cep}`;

  try {
    const response = await axios.get(uriViaCep);
    const data = response.data;

    console.log(data);

    // Verifique se a API retornou um erro
    if (data.erro) {
      console.error('Erro ao buscar o CEP:', data.erro);
      return null;
    }

    // Retorne um objeto com os dados esperados
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
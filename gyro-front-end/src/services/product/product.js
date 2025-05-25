import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_HTTPS_IP_ADDRESS,
  headers: {
    "Content-Type": "application/json"
  }
});

// export const registerProduct = async (token, formData) => {
//   try {
//     return await api.post(`/products/register`, formData, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//   } catch (error) {
//     console.error("Erro ao registrar produto:", error.response?.data || error.message);
//     throw error;
//   }
// };

export const registerProduct = async (token, formData) => {
  try {
    const response = await api.post(`/products/register`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (token) => {
  try {
    const response = await api.get(`/products/get-all-by-company`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(token)
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.response?.data || error.message);
    throw error;
  }
};

export const getProductImage = async (token, productId) => {
  try {
    const response = await api.get(`/images/render/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob'
    });
    const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
    return URL.createObjectURL(imageBlob);
  } catch (error) {
    console.error("Erro ao carregar imagem:", error.response?.data || error.message);
    throw error;
  }
};

export const editProduct = async (token, productId, productBody) => {
  try {
    return await api.put(`/products/update-product/${productId}`, productBody, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error("Erro ao editar produto:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllCategories = async (token) => {
  try {
    return await api.get(`/products/get-categories`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteProduct = async (token, productId) => {
  try {
    return await api.delete(`/products/delete-product/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error("Erro ao deletar produto:", error.response?.data || error.message);
    throw error;
  }
};

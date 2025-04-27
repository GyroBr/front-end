/* eslint-disable no-useless-catch */
import axios from "axios";

const APIBASEURL = "/api/products";

export const registerProduct = async (token, formData) => {

    for (let pair of formData.entries()) {
        console.log('product js',pair[0], pair[1]);
    }

    
    try {
        console.log("Dados formatados:", Array.from(formData.entries()));
        console.log(token, "token que chegou");

        const response = await axios.post(`${APIBASEURL}/register`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        throw error;
    }
};


export const getProducts = async (token) => {

    try {
        const response = await axios.get(`${APIBASEURL}/get-all-by-company`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response.data, "dados que chegaram");
        return response.data;
    } catch (error) {
        console.error("Erro ao tentar obter os produtos:", error.response?.data || error.message);
        throw error;
    }
};

export const getProductImage = async (token, productId) => {
    try {
        const response = await axios.get(`/images/render/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
        });

        const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
        const imageUrl = URL.createObjectURL(imageBlob);
        return imageUrl;
    } catch (error) {
        console.error("Erro ao tentar obter a imagem do produto:", error.response?.data || error.message);
        throw error;
    }
};

// export const getProductImage = async (token, productId) => {
//     try {
//         const response = await axios.get(`/images/render/${productId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//        
//         return imageUrl;
//     } catch (error) {
//         console.error("Erro ao tentar obter a imagem do produto:", error.response?.data || error.message);
//         throw error;
//     }
// };

export const editProduct = async (token, productId, productBody) => {
    try {
        console.log(productBody, "dados para edição");
        console.log(token, "token que chegou");
        const response = await axios.put(`${APIBASEURL}/${productId}`, productBody, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Erro ao tentar editar o produto:", error.response?.data || error.message);
        throw error;
    }
};

export const getAllCategories = async (token) => {
    try {
        const response = await axios.get(`${APIBASEURL}/get-categories`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // console.log(response, "categorias que chegaram");
        
        return response;
    } catch (error) {
        console.log("Erro ao pegar categorias");
        throw error;
    }
};

export const deleteProduct = async (token, productId) => {
    try {
        console.log(`Deletando produto com ID: ${productId}`);
        const response = await axios.delete(`${APIBASEURL}/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Erro ao tentar deletar o produto:", error.response?.data || error.message);
        throw error;
    }
};



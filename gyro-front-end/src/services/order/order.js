/* eslint-disable no-useless-catch */
import axios from "axios";

const APIBASEURL = "/api/orders";

export const createOrder = async (token, orderData) => {
    try {
        console.log(orderData, "dados do pedido que chegaram");
        
        const orderDataRequest = {
            paymentMethod: orderData.paymentMethod,
            cashForPayment: orderData.amountOfMoneyGiven,

        };
        
        console.log(orderDataRequest, "dados do pedido que vão ser enviados");
        
        const response = await axios.post(`${APIBASEURL}/register`, orderDataRequest, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Pedido criado com sucesso", response);

        orderData.orderProduct.forEach(e => {
            axios.post(`/api/order-products/register`, {
                productId: e.productId,
                orderId: response.data.orderId,
                orderQuantity: e.quantity,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        });
        

        return response;
    } catch (error) {
        console.error("Erro ao tentar criar o pedido:", error.response?.data || error.message);
        throw error;
    }
};

// não achei a rota
export const deleteOrder = async (token, orderId) => {
    try {
        console.log(`Deletando pedido com ID: ${orderId}`);
        const response = await axios.delete(`${APIBASEURL}/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Pedido deletado com sucesso", response);
        return response;
    } catch (error) {
        console.error("Erro ao tentar deletar o pedido:", error.response?.data || error.message);
        throw error;
    }
};

// não achei a rota
export const getPaymentMethods = async (token, paymentMethod) => {
    try {
        console.log(token, "token que chegou");
        console.log(APIBASEURL);
        
        const response = await axios.get(`${APIBASEURL}/${paymentMethod}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response);
        
        return response;
    } catch (error) {
        console.error("Erro ao tentar obter os métodos de pagamento:", error.response?.data || error.message);
        throw error;
    }
};

// não achei a rota
export const getTotalSales = async (token) => {
    try {
        const response = await axios.get(`api/companies/get-company-info`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log("Dados dos produtos mais vendidos obtidos com sucesso => ", response);
        
        return response;
    } catch (error) {
        console.error("Erro ao tentar obter dados dos produtos", error.response?.data || error.message);
        throw error;
    }
};

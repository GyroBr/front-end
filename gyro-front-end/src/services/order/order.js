import axios from "axios";

const api = axios.create({
  baseURL: 'https://18.215.23.142/api',
  headers: {
    "Content-Type": "application/json"
  }
});

export const createOrder = async (token, orderData) => {
  try {
    console.log(orderData, "dados do pedido que chegaram");
    
    const orderDataRequest = {
      paymentMethod: orderData.paymentMethod,
      cashForPayment: orderData.amountOfMoneyGiven,
    };
    
    console.log(orderDataRequest, "dados do pedido que vão ser enviados");
    
    const response = await api.post(`/orders/register`, orderDataRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Pedido criado com sucesso", response);

    await Promise.all(orderData.orderProduct.map(e => 
      api.post(`/order-products/register`, {
        productId: e.productId,
        orderId: response.data.orderId,
        orderQuantity: e.quantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ));

    return response;
  } catch (error) {
    console.error("Erro ao tentar criar o pedido:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteOrder = async (token, orderId) => {
  try {
    console.log(`Deletando pedido com ID: ${orderId}`);
    const response = await api.delete(`/orders/${orderId}`, {
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

export const getPaymentMethods = async (token, paymentMethod) => {
  try {
    console.log(token, "token que chegou");
    const response = await api.get(`/orders/${paymentMethod}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Erro ao tentar obter os métodos de pagamento:", error.response?.data || error.message);
    throw error;
  }
};

export const getTotalSales = async (token) => {
  try {
    const response = await api.get(`/companies/get-company-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Erro ao tentar obter dados dos produtos", error.response?.data || error.message);
    throw error;
  }
};
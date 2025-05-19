import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_HTTPS_IP_ADDRESS,
  headers: {
    "Content-Type": "application/json"
  }
});

const switchToHttp = () => {
  api.defaults.baseURL = import.meta.env.VITE_HTTP_IP_ADDRESS;
};

export const createOrder = async (token, orderData) => {
  const orderDataRequest = {
    paymentMethod: orderData.paymentMethod,
    cashForPayment: orderData.amountOfMoneyGiven,
  };

  try {
    const response = await api.post("/orders/register", orderDataRequest, {
      headers: { Authorization: `Bearer ${token}` }
    });

    await Promise.all(orderData.orderProduct.map(e =>
      api.post("/order-products/register", {
        productId: e.productId,
        orderId: response.data.orderId,
        orderQuantity: e.quantity,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
    ));

    return response;
  } catch (error) {
    if (error.response?.status === 0) {
      switchToHttp();
      const response = await api.post("/orders/register", orderDataRequest, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await Promise.all(orderData.orderProduct.map(e =>
        api.post("/order-products/register", {
          productId: e.productId,
          orderId: response.data.orderId,
          orderQuantity: e.quantity,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ));

      return response;
    }
    throw error;
  }
};

export const deleteOrder = async (token, orderId) => {
  try {
    const response = await api.delete(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    if (error.response?.status === 0) {
      switchToHttp();
      const response = await api.delete(`/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response;
    }
    throw error;
  }
};

export const getPaymentMethods = async (token, paymentMethod) => {
  try {
    const response = await api.get(`/orders/${paymentMethod}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    if (error.response?.status === 0) {
      switchToHttp();
      const response = await api.get(`/orders/${paymentMethod}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response;
    }
    throw error;
  }
};

export const getTotalSales = async (token) => {
  try {
    const response = await api.get("/companies/get-company-info", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    if (error.response?.status === 0) {
      switchToHttp();
      const response = await api.get("/companies/get-company-info", {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response;
    }
    throw error;
  }
};

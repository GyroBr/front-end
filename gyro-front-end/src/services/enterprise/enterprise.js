import axios from 'axios';

const api = axios.create({
  baseURL: "https://18.232.231.57",
  headers: {
    "Content-Type": "application/json"
  }
});

export const registerEnterprise = async (empresa) => {
  try {
    const response = await api.post(`/companies/register`, empresa);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getEnterpriseById = async (token) => {
  try {
    const response = await api.get(`/companies/get-company-info`, {
      headers: {
        "Authorization": token
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const isAdmin = async (token) => {
  try {
    const response = await api.get(`/auths/is-admin`, {
      headers: {
        "Authorization": token
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};
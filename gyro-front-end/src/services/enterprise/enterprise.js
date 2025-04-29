import axios from 'axios';

const api = axios.create({
  baseURL: "https://18.232.231.57",
  headers: {
    "Content-Type": "application/json"
  }
});

export const registerEnterprise = async (empresa) => {
  try {
    const response = await api.post(`/api/companies/register`, empresa);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getEnterpriseById = async (token) => {
  try {
    const response = await api.get(`/api/companies/get-company-info`, {
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
    const response = await api.get(`/api/auths/is-admin`, {
      headers: {
        "Authorization": token
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};
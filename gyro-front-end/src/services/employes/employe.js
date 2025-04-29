import axios from "axios";

const api = axios.create({
  baseURL: 'https://18.215.23.142',
  headers: {
    "Content-Type": "application/json"
  }
});

export const registerEmployee = async (token, formData) => {
  try {
    const response = await api.post(`/api/employees/register`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getEmployees = async (token) => {
  try {
    const response = await api.get(`/api/companies/get-company-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Funcionários recuperados", response.data.employees);
    return response;
  } catch (error) {
    console.error("Erro ao tentar obter os funcionários:", error.response?.data || error.message);
    throw error;
  }
};

export const updateEmployee = async (token, body, id) => {
  try {
    const response = await api.put(`/admin/update-employee/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployee = async (id, token) => {
  try {
    const response = await api.delete(`/admin/delete-employee/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
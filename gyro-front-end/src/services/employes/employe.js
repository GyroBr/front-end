import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_HTTPS_IP_ADDRESS,
  headers: {
    "Content-Type": "application/json"
  }
});

export const registerEmployee = async (token, formData) => {
  try {
    const response = await api.post("/employees/register", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Erro ao tentar registrar o funcionário:", error.response?.data || error.message);
    throw error;
  }
};

export const getEmployees = async (token) => {
  try {
    const response = await api.get("/companies/get-company-info", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Funcionários recuperados", response.data.employees);
    return response;
  } catch (error) {
    console.error("Erro ao tentar obter os funcionários:", error.response?.data || error.message);
    throw error;
  }
};

export const updateEmployee = async (token, id, body) => {
  try {
    const response = await api.put(`/admin/update-employee/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Erro ao tentar atualizar o funcionário:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteEmployee = async (id, token) => {
  try {
    const response = await api.delete(`/admin/delete-employee/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Erro ao tentar deletar o funcionário:", error.response?.data || error.message);
    throw error;
  }
};

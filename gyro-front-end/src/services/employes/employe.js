/* eslint-disable no-useless-catch */

import axios from "axios";

const api = axios.create(
    {
        // usando URL como variável de ambiente
        baseURL: 'http://gyro-back-end-monolito:8080'
    }
);

export const registerEmployee = async (token, formData) => {
    try {
        // console.log(formData, "dados");
        // console.log(token, "token");
        const response = await axios.post(`/api/employees/register`, formData, {
            headers: {
                "Content-type" : "application/json",
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
        const response = await axios.get(`/api/companies/get-company-info`, {
            headers: {
                "Content-Type": "application/json",
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


// falta no back
export const updateEmployee = async (token, body, id) => {
    try {
        const response = await axios.put(`/admin/update-employee/${id}`, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        throw error;
    }
};


//falta no back
export const deleteEmployee = async (id, token) => {
    try {
        const response = await axios.delete(`/admin/delete-employee/${id}`, {
            headers: {
        
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        throw error;
    }
}





/* eslint-disable no-useless-catch */

import axios from 'axios';

// const apiURL = 'http://gyro-back-end-monolito:8080/companies';

export const registerEnterprise = async (empresa) => {

    console.log(empresa)
    try {
        const response = await axios.post(`/api/companies/register`, empresa, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    } catch (error) {
        throw error ;
    }
};


export const getEnterpriseById = async (token) => {
    try {
        const response = await axios.get(`/api/companies/get-company-info`, {
            headers: {
                "Authorization": token
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//
export const isAdmin = async (token) =>{
    try{
        const response = await axios.get(`/api/auths/is-admin`,{
            headers : {
                "Authorization" : token
            }
        });

        // console.log(response)
        return response
    }catch(error){
        throw error;
    }
}
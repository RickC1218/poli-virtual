import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const crud_user = {

    // Obtener valor de localStorage
    getLocalStorageValue: (key: string) => {
        return localStorage.getItem(key);
    },

    // Operación CREATE (POST)
    createUser: async (userData: any) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/sign-up/`, userData);
            return response.data;
        } catch (error) {
            throw error
        }
    },

    // Setear email de verificación
    emailVerification: async (email: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/set-email-verification/`, { email: email, });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Operación READ (GET)
    login: async (userData: any) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/sign-in/`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    logout: async (userData: any) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/user/sign-out/`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Operación UPDATE (PUT)
    updateUser: async (userData: any, session_token: string) => {
        try {
            const headers = {
                'Authorization': `Bearer ${session_token}`,
            };
    
            const response = await axios.put(`${API_BASE_URL}/user/`, userData, { headers });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Operación DELETE (DELETE)
    deleteUser: async (email: string) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/user/${email}/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Operación LIST (GET all)
    listUser: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default crud_user;

import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const crud_user = {
    // Operación CREATE (POST)
    createUser: async (userData: any) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/sign-up/`, userData);
            return response.data;
        } catch (error) {
            throw error
        }
    },

    // Operación READ (GET)
    getUser: async (userData: any) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user//`, {
                params: { __id: userData._id},
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Operación UPDATE (PUT)
    updateUser: async (email: string) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/user/${email}/`);
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

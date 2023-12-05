import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const crud_user = {
    // Operación CREATE (POST)
    createCurso: async (cursoData: any) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/cursos/`, cursoData);
            return response.data;
        } catch (error) {
            throw error
        }
    },

    // Operación READ (GET)
    getUser: async (email: string, password: string) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Operación UPDATE (PUT)
    updateCurso: async (cursoId: number, cursoData: any) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/cursos/${cursoId}/`, cursoData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Operación DELETE (DELETE)
    deleteCurso: async (cursoId: number) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/cursos/${cursoId}/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Operación LIST (GET all)
    listCursos: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/cursos/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default crud_user;

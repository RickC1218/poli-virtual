import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const crud_category = {
  // Obtain categories
  getCategories: async (id: any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/${id}`);
      return response.data;
    } catch (error) {
      const responseError = error as {
        response?: { status?: number; data?: { mensaje?: string } };
      };
      if (responseError?.response?.status === 404) {
        return "Categorias no encontradas";
      } else {
        return "Error desconocido";
      }
    }
  },

  // Obtain category by id
  getCategoryById: async (id: any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/${id}`);
      return response.data;
    } catch (error) {
      const responseError = error as {
        response?: { status?: number; data?: { mensaje?: string } };
      };
      if (responseError?.response?.status === 404) {
        return "Categoria no encontrada";
      } else {
        console.log(responseError);
        return "Error desconocido";
      }
    }
  },
};

export default crud_category;

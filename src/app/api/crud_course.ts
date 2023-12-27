import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const crud_course = {
  // Obtain courses
  getCourses: async (category: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/course/${category}`);
      return response.data;
    } catch (error) {
      const responseError = error as {
        response?: { status?: number; data?: { mensaje?: string } };
      };
      if (responseError?.response?.status === 404) {
        return "Cursos no encontrados";
      } else {
        return "Error desconocido al obtener cursos";
      }
    }
  },
};

export default crud_course;

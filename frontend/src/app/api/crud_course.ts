import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const crud_course = {
  // Obtain courses by category
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
  //Obtain course by Id
  getCourseById: async (id: any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/course/${id}`);
      return response.data;
    } catch (error) {
      const responseError = error as {
        response?: { status?: number; data?: { mensaje?: string } };
      };
      if (responseError?.response?.status === 404) {
        return "Curso no encontrado";
      } else {
        console.log(responseError);
        return "Error desconocido";
      }
    }
  },
  // Obtain featured courses
  getFeaturedCourses: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/course/featured-courses/`
      );
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
  // Obtain course recently added
  getRecentlyAddedCourses: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/course/recently-added-courses/`
      );
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
  // Obtain course by user or instructor
  getUserCourses: async (instructor: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/course/courses-by-instructor/${instructor}`);
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

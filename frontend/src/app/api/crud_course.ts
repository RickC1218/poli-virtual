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

  // Create course
  createCourse: async (courseData: any, modules: any) => {
    try {
      const modulesSend = modules.map((module: any) => ({
        title: module.title,
        description: module.description,
        content: module.content.map((content: any) => ({
          title: content.title,
          video_url: "",
        })),
      }));
      courseData.modules = modulesSend;

      const videos = modules.map((module: any) => module.content.map((content: any) => content.video_url));
      console.log("Videos",videos);

      console.log("Course Data Modules",courseData.modules);

      courseData.comments = [];

      const headers = {
        "Content-Type": "multipart/form-data",
      };

      courseData.videos = videos;
      console.log("Course Data",courseData);

      const response = await axios.post(`${API_BASE_URL}/course/upload-videos/`, courseData, { headers });

      return response.data;
    } catch (error) {
      const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
      if (responseError?.response?.status === 404) {
          return "Error al actualizar el usuario";
      } else {
          return "Error desconocido";
      }
    }
  },

  // Update course
  uploadCourse:  async (courseData: any) => {
    try {
        const headers = {
            "Content-Type": "multipart/form-data",
        };
        const hasProfilePictureChanged = courseData.profile_image_url && courseData.profile_image_url === null;
        const requestBody = hasProfilePictureChanged
            ? { ...courseData, profile_image_url: courseData.profile_image_url }
            : { ...courseData };
        const response = await axios.put(`${API_BASE_URL}/course/`, requestBody, { headers });
        return response.data;
    } catch (error) {
        const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
        if (responseError?.response?.status === 404) {
            return "Error al actualizar el curso";
        } else {
            return "Error desconocido";
        }
    }
},
};

export default crud_course;

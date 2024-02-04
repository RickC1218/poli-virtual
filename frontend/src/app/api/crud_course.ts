import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const crud_course = {
  // Obtain courses by category
  getCourses: async (category: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/course/courses-by-category/${category}`);
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
        content: []
      }));
      courseData.modules = modulesSend;

      const videos = modules.map((module: any) => ({
        course_name: courseData.name,
        module: module.title,
        title: module.content.map((content: any) => content.title),
        video_url: module.content.map((content: any) => content.video_url),
      }));

      courseData.comments = [];

      courseData.modules = JSON.stringify(courseData.modules);
      courseData.comments = JSON.stringify(courseData.comments);

      const headers = {
        "Content-Type": "multipart/form-data",
      };

      await axios.post(`${API_BASE_URL}/course/`, courseData, { headers });

      let response_content = "";
      videos.forEach(async (video: any) => {
        for (let i = 0; i < video.title.length; i++) {
          response_content = await axios.post(`${API_BASE_URL}/content/`, {
            course_name: video.course_name,
            module: video.module,
            title: video.title[i],
            video_url: video.video_url[i],
          }, { headers });
        }
      });

      return response_content;

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
  uploadCourse: async (courseData: any) => {
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

  // create comment
  createComment: async ( commentData: any, courseID: string, sesionToken: string) => {
    try {
      const headers = {
        'Authorization': `Bearer ${sesionToken}`,
      };
      const response = await axios.put(`${API_BASE_URL}/course/update-course-comments/${courseID}/`, {comments: [commentData]}, { headers });
      return response.data;
    } catch (error) {
      const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
      if (responseError?.response?.status === 404) {
        return "Error al crear el comentario";
      } else {
        return "Error al crear el comentario";
      }
    }
  },

  // search courses
  searchCourses: async (searchData: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/course/get-courses/${searchData}`);
      return response.data;
    } catch (error) {
      const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
      if (responseError?.response?.status === 404) {
        return "Error al buscar cursos";
      } else {
        return "Error al buscar cursos";
      }
    }
  }

};

export default crud_course;

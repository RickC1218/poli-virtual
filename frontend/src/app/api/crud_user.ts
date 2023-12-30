import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const crud_user = {
    // Obtain session token
    getLocalStorageValue: (key: string) => {
        return localStorage.getItem(key);
    },

    // Operation sign up
    createUser: async (userData: any) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/sign-up/`, userData);
            return response.data;
        } catch (error) {
            const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
            switch (responseError?.response?.status) {
                case 400:
                    return "Error al guardar el usuario";
                case 402:
                    return "Este usuario ya existe";
                default:
                    return "Error desconocido";
            }
        }
    },

    // Setear email de verificación
    emailVerification: async (email: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/set-email-verification/`, { email: email, });
            return response.data;
        } catch (error) {
            const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
            if (responseError?.response?.status === 404) {
                return "Usuario no encontrado";
            } else {
                return "Error desconocido";
            }
        }
    },

    // Send email to restore password
    sendEmailToRestorePassword: async (email: string) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/user/send-email-to-restore-password/`, { email: email, });
            return response.data;
        } catch (error) {
            const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
            if (responseError?.response?.status === 404) {
                return "Usuario no encontrado";
            } else {
                return "Error desconocido";
            }
        }
    },

    // Restore password
    restorePassword: async (userData: any) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/user/restore-password/`, userData);
            return response.data;
        } catch (error) {
            const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
            switch (responseError?.response?.status) {
                case 400:
                    return "Error al restaurar la contraseña";
                case 404:
                    return "Usuario no encontrado";
                default:
                    return "Error desconocido";
            }
        }
    },

    // Operation log in
    login: async (userData: any) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/sign-in/`, userData);
            return response.data;
        } catch (error) {
            const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
            switch (responseError?.response?.status) {
                case 400:
                    return "Correo electrónico y contraseña no ingresados";
                case 401:
                    return "Contraseña incorrecta";
                case 403:
                    return "Correo electrónico no verificado";
                case 404:
                    return "Usuario no encontrado";
                default:
                    return "Error desconocido";
            }
        }
    },

    // Operation log out
    logout: async (userData: any, session_token: string) => {
        try {
            const headers = {
                'Authorization': `Bearer ${session_token}`,
            };
            const response = await axios.put(`${API_BASE_URL}/user/sign-out/`, userData, { headers });
            return response.data;
        } catch (error) {
            const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
            switch (responseError?.response?.status) {
                case 400:
                    return "Error al cerrar sesión";
                case 401:
                    return "Acceso no autorizado";
                case 404:
                    return "Usuario no encontrado";
                default:
                    return "Error desconocido";
            }
        }
    },

    // Obtain user courses
    getEnrolledCourses: async (session_token: string) => {
        try{
            const headers = {
                'Authorization': `Bearer ${session_token}`,
            };
            const response = await axios.get(`${API_BASE_URL}/user/`, { headers });
            return response.data;
        } catch (error) {
            const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
            if (responseError?.response?.status === 404) {
                return "Cursos no encontrados";
            } else {
                return "Cursos desconocido";
            }
        }
    },

    // Operation update user
    updateUser: async (userData: any, session_token: string) => {
        try {
            const headers = {
                'Authorization': `Bearer ${session_token}`,
            };
            const response = await axios.put(`${API_BASE_URL}/user/`, userData, { headers });
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

    // operation update password
    updatePassword: async (userData: any, session_token: string) => {
        try {
            const headers = {
                'Authorization': `Bearer ${session_token}`,
            };
            const response = await axios.put(`${API_BASE_URL}/user/change-password/`, userData, { headers });
            return response.data;
        } catch (error) {
            const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
            switch (responseError?.response?.status) {
                case 400:
                    return "Error al actualizar la contraseña";
                case 401:
                    return "Acceso no autorizado";
                case 404:
                    return "Usuario no encontrado";
                default:
                    return "Error desconocido";
            }
        }
    },

    // Operación get (GET all featured instructors)
    getfeaturedInstructors: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user/featured-teachers`);
            return response.data;
        } catch (error) {
            const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
            if (responseError?.response?.status === 404) {
                return "Instructores no encontrados";
            } else {
                return "Error desconocido";
            }
        }
    },

    // contact with us
    sendEmailContact: async (formData: any) => {
        try{
            const response = await axios.post(`${API_BASE_URL}/user/contact-with-us/`, formData);

            return response.data;
        } catch (error) {
            const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
            if (responseError?.response?.status === 404) {
                return "Error al enviar el correo";
            } else {
                return "Error desconocido";
            }
        }
    },

    //send mail to be instructor
    sendEmailToBeInstructor: async (userData: any, session_token: string) => {
        try{
            const headers = {
                'Authorization': `Bearer ${session_token}`,
            };
            const response = await axios.put(`${API_BASE_URL}/user/send-email-to-approve-teacher/`, userData ,{ headers } );
            console.log(response.data);
            return response.data;
        } catch (error) {
            const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };

            if (responseError?.response?.status === 404) {
                return "Error al enviar el correo";
            } else {
                return "Error desconocido";
            }
        }
    },
    
    // active the instructor site
    beInstructor : async (emailData: any, session_token: string) => {
        try{
            const headers = {
                'Authorization': `Bearer ${session_token}`,
            };
            const response = await axios.put(`${API_BASE_URL}/user/be-an-instructor/`, emailData,{headers});
            return response.data;
        } catch (error) {
            const responseError = error as { response?: { status?: number; data?: { mensaje?: string } } };
            if (responseError?.response?.status === 404) {
                return "Error al enviar el correo";
            } else {
                return "Error desconocido";
            }
        }
    }
};

export default crud_user;

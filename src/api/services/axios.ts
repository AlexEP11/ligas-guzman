import axios from "axios";

// Crear instancia de Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para agregar el Access Token a las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken"); // Obtener el Access Token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Añadir el token a los headers
    }
    return config;
});

// Interceptor para manejar errores y refrescar el token si es necesario
// axios.js
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // No hacer nada si es un error en las credenciales, ya que es manejado por la mutación
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken();
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                console.error("Error al refrescar el token", err);
                // window.location.href = "/"; // Solo redirigir si es necesario (ej. token inválido)
            }
        }

        return Promise.reject(error);
    }
);

// Función para refrescar el Access Token
const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken"); // Obtener el Refresh Token
        const { data } = await api.post("/token/refresh/", {
            refresh: refreshToken,
        });
        const newAccessToken = data.access;

        // Guardar el nuevo Access Token en el localStorage
        localStorage.setItem("accessToken", newAccessToken);

        return newAccessToken;
    } catch (error) {
        console.error("Error al refrescar el Access Token", error);
        throw error;
    }
};
export default api;

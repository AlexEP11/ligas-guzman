import { DecodedToken, LoginData } from "@/types/Login";
import { isAxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import api from "../services/axios";

export async function authLogin(dataLogin: LoginData) {
    try {
        const { data } = await api.post("/token/", dataLogin);
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        const decoded: DecodedToken = jwtDecode(data.access);
        return decoded;
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response) {
                const errorMessage = error.response.data?.detail || "Ambos campos son obligatorios";
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                throw new Error(errorMessage);
            } else if (error.request) {
                throw new Error("No se pudo recibir una respuesta del servidor.");
            } else {
                throw new Error("Hubo un error al configurar la solicitud.");
            }
        } else {
            throw new Error("Ocurrió un error inesperado.");
        }
    }
}

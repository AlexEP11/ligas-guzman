import { isAxiosError } from "axios";
import api from "../services/axios";

export async function getAllPlayersPromo() {
    try {
        const { data } = await api.get("/general/");
        return data;
    } catch (error) {
        let errorMessage =
            "Ocurrió un error inesperado. Por favor, inténtelo de nuevo.";

        if (isAxiosError(error)) {
            if (error.message.includes("ERR_CONNECTION_REFUSED")) {
                errorMessage =
                    "No se pudo establecer una conexión con el servidor. Por favor, inténtelo de nuevo más tarde.";
            } else if (error.response) {
                // Extraer el mensaje de error del backend
                errorMessage = error.response.data.error || errorMessage;
            }
        }

        throw new Error(errorMessage);
    }
}

export async function getDocuments(type: string, curp: string) {
    try {
        const { data } = await api.get(`/player/${type}/${curp}/`, {
            responseType: "blob",
        });
        return data;
    } catch (error) {
        let errorMessage =
            "Ocurrió un error inesperado. Por favor, inténtelo de nuevo.";

        if (isAxiosError(error)) {
            if (error.message.includes("ERR_CONNECTION_REFUSED")) {
                errorMessage =
                    "No se pudo establecer una conexión con el servidor. Por favor, inténtelo de nuevo más tarde.";
            } else if (error.response) {
                // Extraer el mensaje de error del backend
                errorMessage = error.response.data.error || errorMessage;
            }
        }

        throw new Error(errorMessage);
    }
}

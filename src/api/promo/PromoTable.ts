import { isAxiosError } from "axios";
import api from "../services/axios";

export async function getPlayersTables(
    url: string | null = null,
    searchTerm: string = ""
) {
    try {
        // Construir la query de búsqueda si se proporciona un término
        const searchQuery = searchTerm
            ? `search=${encodeURIComponent(searchTerm)}`
            : "";

        // Si la URL base ya tiene parámetros (ej. `?page=2`), se debe usar `&` para concatenar
        const finalUrl = url
            ? searchQuery
                ? url.includes("?") // Si ya tiene parámetros, añadir con "&"
                    ? `${url}&${searchQuery}`
                    : `${url}?${searchQuery}`
                : url
            : `/jugadores/` + (searchQuery ? `?${searchQuery}` : ""); // Si no hay URL base, añadir la búsqueda

        const { data } = await api.get(finalUrl);
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

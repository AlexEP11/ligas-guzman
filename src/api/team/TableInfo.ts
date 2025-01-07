import { isAxiosError } from "axios";
import api from "../services/axios";

export async function getAllPlayers() {
    try {
        const { data } = await api.get("/list/team/");
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

        throw new Error(errorMessage); // Lanzamos el error con el mensaje adecuado
    }
}

export async function sendCard(ids: number[]) {
    try {
        const { data } = await api.post(
            "/credentials/",
            { jugadores: ids },
            {
                responseType: "blob",
            }
        );
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

        throw new Error(errorMessage); // Lanzamos el error con el mensaje adecuado
    }
}

export async function getAlignmentPDF(ids: number[]) {
    try {
        const { data } = await api.post(
            "/list/team/pdf/",
            { jugadores: ids },
            {
                responseType: "blob",
            }
        );
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

        throw new Error(errorMessage); // Lanzamos el error con el mensaje adecuado
    }
}

export async function getActualSpaces() {
    try {
        const { data } = await api.get("/credentials/");
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

        throw new Error(errorMessage); // Lanzamos el error con el mensaje adecuado
    }
}

export async function fetchClientSecret() {
    try {
        const { data } = await api.post("/stripe/checkout-session/", {
            credits: 10, // Datos que envías al backend
        });
        return data.clientSecret;
    } catch (error) {
        let errorMessage =
            "Ocurrió un error inesperado. Por favor, inténtelo de nuevo.";

        if (isAxiosError(error)) {
            if (error.message.includes("ERR_CONNECTION_REFUSED")) {
                errorMessage =
                    "No se pudo establecer una conexión con el servidor. Por favor, inténtelo más tarde.";
            } else if (error.response) {
                // Extraer mensaje del backend
                errorMessage = error.response.data.error || errorMessage;
            }
        }

        throw new Error(errorMessage); // Lanzamos el error con el mensaje adecuado
    }
}

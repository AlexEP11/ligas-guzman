import api from "../services/axios";
import { isAxiosError } from "axios";

export async function postLogo(logoFile: FileList) {
    try {
        const formData = new FormData();

        formData.append("logo", logoFile[0]);

        const { data } = await api.post("/logo/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
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

import api from "../services/axios";
import { Signatures } from "@/types/Common";
import { isAxiosError } from "axios";

export async function postSignatures(signatures: Signatures) {
    try {
        const formData = new FormData();

        if (signatures.presidente) {
            formData.append("presidente", signatures.presidente[0]);
        }

        if (signatures.secretario) {
            formData.append("secretario", signatures.secretario[0]);
        }

        const { data } = await api.post("/signature/", formData, {
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

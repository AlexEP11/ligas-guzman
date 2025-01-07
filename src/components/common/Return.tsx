import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchSesionStatus } from "@/api/team/TableInfo";

export default function Return() {
    const location = useLocation();
    const [status, setStatus] = useState<string | null>(null);

    const { mutate } = useMutation({
        mutationFn: fetchSesionStatus,
        onSuccess: (data) => {
            setStatus(data.status);
        },
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const sessionId = queryParams.get("session_id");

        if (sessionId) {
            mutate(sessionId);
        }
    }, [location.search, mutate]);

    if (status === "open") {
        return <Navigate to="/historial/credenciales" />;
    }

    if (status === "complete") {
        return <Navigate to="/historial/credenciales" />;
    }

    return null;
}

import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchSesionStatus } from "@/api/team/TableInfo";

export default function Return() {
    const location = useLocation();
    const [status, setStatus] = useState<string | null>(null);
    const [customerEmail, setCustomerEmail] = useState<string>("");

    const { mutate } = useMutation({
        mutationFn: fetchSesionStatus,
        onSuccess: (data) => {
            setStatus(data.status);
            setCustomerEmail(data.customer_email);
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
        return (
            <section id="success">
                <p>
                    We appreciate your business! A confirmation email will be
                    sent to {customerEmail}. If you have any questions, please
                    email{" "}
                    <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </section>
        );
    }

    return null;
}

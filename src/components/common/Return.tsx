import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Return() {
    const location = useLocation();
    const [status, setStatus] = useState<string | null>(null);
    const [customerEmail, setCustomerEmail] = useState<string>("");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const sessionId = queryParams.get("session_id");

        if (sessionId) {
            fetch(`http://137.184.134.164:8000/api/stripe/session/`)
                .then((res) => res.json())
                .then((data) => {
                    setStatus(data.status);
                    setCustomerEmail(data.customer_email);
                })
                .catch((error) => {
                    console.error("Error fetching session status:", error);
                });
        }
    }, [location.search]);

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

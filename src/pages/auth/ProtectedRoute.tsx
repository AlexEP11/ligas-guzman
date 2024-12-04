import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

type ProtectedRouteProps = {
    children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = localStorage.getItem("accessToken");

    // Redirige al inicio de sesión si no hay token
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Si hay token, permite el acceso
    return <>{children}</>;
}

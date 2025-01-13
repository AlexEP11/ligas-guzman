import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
    user_type?: string;
};

type ProtectedRouteProps = {
    children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = localStorage.getItem("accessToken");
    const location = useLocation();

    if (!token) {
        // Redirige al inicio de sesión si no hay token
        return <Navigate to="/" replace />;
    }

    try {
        // Decodifica el token
        const decodedToken: DecodedToken = jwtDecode(token);

        // Define las rutas permitidas por tipo de usuario
        const routesByUserType: Record<string, string[]> = {
            equipo: [
                "/registrar/credencial",
                "/historial/credenciales",
                "/subir/firmas",
            ],
            liga: ["/liga", "/liga/subir/firmas"],
            promotoria: ["/promotoria"],
        };

        const userType = decodedToken?.user_type;

        // Si el tipo de usuario no es reconocido, redirige al login
        if (!userType || !routesByUserType[userType]) {
            return <Navigate to="/" replace />;
        }

        // Verifica si la ruta actual está permitida para este tipo de usuario
        const allowedRoutes = routesByUserType[userType];
        if (!allowedRoutes.includes(location.pathname)) {
            // Redirige a la ruta principal del usuario si intenta acceder a una ruta no permitida
            return <Navigate to={allowedRoutes[0]} replace />;
        }
    } catch (error) {
        // Si ocurre un error al decodificar el token
        console.error("Error decodificando el token:", error);
        return <Navigate to="/" replace />;
    }

    // Si todo está bien, renderiza los hijos
    return <>{children}</>;
}

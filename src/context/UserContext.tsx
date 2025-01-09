import { createContext, useState, useEffect } from "react";
import { DecodedToken, User } from "@/types/Login";
import { jwtDecode } from "jwt-decode";

type UserProviderProps = {
    children: React.ReactNode;
};

type UserContextType = {
    userData: User;
    setUserData: (data: User) => void;
};

export const UserContext = createContext<UserContextType>(null!);

export const UserProvider = ({ children }: UserProviderProps) => {
    const [userData, setUserData] = useState<User>({
        user_type: "Usuario Desconocido",
        nombre_equipo: "Equipo Desconocido",
        nombre_liga: "Liga Desconocida",
        categoria: "Categoría Desconocida",
        liga: "Liga Desconocida",
        equipo_id: -1,
        n_categoria: 0,
    });

    // Verificar y actualizar el estado solo si el token está disponible
    const initializeUserData = (): User => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                // Verificar si el token tiene el formato correcto
                const tokenParts = token.split(".");
                if (tokenParts.length === 3) {
                    const decoded: DecodedToken =
                        jwtDecode<DecodedToken>(token);
                    return {
                        user_type: decoded.user_type || "Usuario Desconocido",
                        nombre_equipo:
                            decoded.nombre_equipo || "Equipo Desconocido",
                        nombre_liga: decoded.nombre_liga || "Liga Desconocida",
                        liga: decoded.liga || "Liga Desconocida",
                        categoria: decoded.categoria || "Categoría Desconocida",
                        equipo_id: decoded.equipo_id || -1,
                        n_categoria: decoded.n_categoria || 0,
                    };
                } else {
                    console.error("Token JWT malformado:", token);
                    localStorage.removeItem("accessToken"); // Eliminar el token si no es válido
                    localStorage.removeItem("refreshToken"); // Eliminar el token de refresco también
                }
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }
        return {
            user_type: "Usuario Desconocido",
            nombre_equipo: "Equipo Desconocido",
            nombre_liga: "Liga Desconocida",
            liga: "Liga Desconocida",
            categoria: "Categoría Desconocida",
            n_categoria: 0,
            equipo_id: -1,
        };
    };

    // UseEffect para verificar el token cuando el componente se monta
    useEffect(() => {
        setUserData(initializeUserData()); // Solo actualiza el estado si el token está presente
    }, []); // Esto se ejecutará solo una vez cuando el componente se monte

    // UseEffect para escuchar cambios en localStorage (si el token se actualiza en otro lugar)
    useEffect(() => {
        const handleStorageChange = () => {
            setUserData(initializeUserData()); // Actualiza el estado cuando se detecten cambios en el almacenamiento
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

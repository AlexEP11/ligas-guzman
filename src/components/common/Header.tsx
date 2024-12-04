import { useUser } from "@/context/hooks/useUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userData } = useUser();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const logout = () => {
        // Eliminar los datos del localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userData");

        // Redirigir al inicio de sesión
        navigate("/"); // Redirige a la página de login
    };

    return (
        <nav className="navbar flex w-full gap-2 shadow max-lg:flex-col lg:items-center">
            <div className="flex max-lg:w-full items-center justify-between">
                <div className="navbar-start items-center justify-between max-lg:w-full">
                    <a href="/registrar/credencial" aria-label="Homepage Link" className="flex items-center gap-3">
                        <img src="/logo.ico" alt="" />
                        <p className="font-bold">{userData.nombre_equipo}</p>
                    </a>
                    <div className="lg:hidden">
                        <button
                            type="button"
                            className="collapse-toggle btn btn-outline btn-secondary btn-sm btn-square"
                            aria-label="Toggle navigation"
                            onClick={toggleMenu}
                        >
                            <span className="icon-[tabler--menu-2] collapse-open:hidden size-4"></span>
                            <span className="icon-[tabler--x] collapse-open:block hidden size-4"></span>
                        </button>
                    </div>
                </div>
            </div>

            <div
                id="dropdown-navbar-collapse"
                className={`lg:navbar-end ${
                    isMenuOpen ? "block" : "hidden"
                } grow basis-full overflow-hidden transition-[height] duration-300 max-lg:w-full`}
            >
                <ul className="menu lg:menu-horizontal gap-2 p-0 text-base items-center">
                    <li>
                        <a href="/registrar/credencial">Registrar Credencial</a>
                    </li>
                    <li>
                        <a href="/historial/credenciales">Historial de Credenciales</a>
                    </li>
                    <li>
                        <a href="/subir/firmas">Subir Firmas</a>
                    </li>
                    <li>
                        <button onClick={logout} className="btn btn-error text-base">
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

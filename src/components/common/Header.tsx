import { useNavigate } from "react-router-dom";
import { Navbar } from "flowbite-react";

type NavItems = { label: string; href?: string };
type HeaderProps = { navItems?: NavItems[]; name: string };

export default function Header({ navItems, name }: HeaderProps) {
    const navigate = useNavigate();

    const logout = () => {
        // Eliminar los datos del localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userData");

        // Redirigir al inicio de sesión
        navigate("/"); // Redirige a la página de login
    };

    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="/registrar/credencial">
                <img src="/logo.ico" className="mr-3 h-6 sm:h-9" alt="Logo" />
                <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white">{name}</span>
            </Navbar.Brand>
            <Navbar.Toggle
                theme={{
                    base: "lg:hidden ",
                }}
            />
            <Navbar.Collapse
                theme={{
                    base: "lg:block lg:w-auto w-full",
                    list: "lg:flex-row  flex flex-col lg:space-x-8 lg:text-sm lg:font-medium",
                }}
            >
                {navItems?.map((item, index) => (
                    <Navbar.Link key={index} href={item.href}>
                        {item.label}
                    </Navbar.Link>
                ))}
                {/* <Navbar.Link href="/registrar/credencial">Registrar Credencial</Navbar.Link>
                <Navbar.Link href="/historial/credenciales">Historial de Credenciales</Navbar.Link>
                <Navbar.Link href="/subir/firmas">Subir Firmas</Navbar.Link> */}
                <Navbar.Link
                    onClick={logout}
                    className="cursor-pointer transition-colors duration-300"
                    theme={{ active: { off: "text-red-500 font-bold hover:text-red-600 " } }}
                >
                    Cerrar Sesión
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

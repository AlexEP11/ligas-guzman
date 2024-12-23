import { useNavigate } from "react-router-dom";
import { Navbar } from "flowbite-react";

type NavItems = { label: string; href?: string };
type HeaderProps = { navItems?: NavItems[]; name: string; linkIcon: string };

export default function Header({ navItems, name, linkIcon }: HeaderProps) {
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
        <Navbar fluid rounded className="bg-[#0e080a] ">
            <Navbar.Brand
                href={linkIcon}
                className="hover:scale-105 transition-transform duration-300"
            >
                <img src="/logo.ico" className="mr-3 h-6 sm:h-9 " alt="Logo" />
                <span className="self-center whitespace-nowrap text-lg font-bold text-white">
                    {name}
                </span>
            </Navbar.Brand>
            <Navbar.Toggle
                theme={{
                    base: "lg:hidden ",
                }}
                className="bg-white p-2 rounded-md "
            />
            <Navbar.Collapse
                theme={{
                    base: "lg:block lg:w-auto w-full",
                    list: "lg:flex-row  flex flex-col lg:space-x-8 lg:text-sm lg:font-medium",
                }}
            >
                {navItems?.map((item, index) => (
                    <Navbar.Link
                        key={index}
                        href={item.href}
                        className="text-white font-bold text-lg transition-colors duration-300 ease-linear"
                        theme={{
                            active: { off: "md:hover:text-[#1580AD]" },
                        }}
                    >
                        {item.label}
                    </Navbar.Link>
                ))}
                <Navbar.Link
                    onClick={logout}
                    className="cursor-pointer transition-colors duration-300 text-lg"
                    theme={{
                        active: {
                            off: "text-red-500 font-bold hover:text-red-700 ",
                        },
                    }}
                >
                    Cerrar Sesión
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

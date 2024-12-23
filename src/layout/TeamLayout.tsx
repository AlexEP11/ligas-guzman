import { useUser } from "@/context/hooks/useUser";
import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import BackGround from "./styles/Background";

export default function TeamLayout() {
    const { userData } = useUser();
    const navItems = [
        { label: "Registrar Credencial", href: "/registrar/credencial" },
        { label: "Historial de Credenciales", href: "/historial/credenciales" },
        { label: "Subir Firmas", href: "/subir/firmas" },
    ];
    return (
        <>
            <div className="relative min-h-screen">
                <BackGround />

                <main className="relative z-10">
                    <Header
                        navItems={navItems}
                        name={userData.nombre_equipo}
                        linkIcon="/registrar/credencial"
                    />
                    <section className="container max-w-screen-xl mx-auto mt-10 md:mb-10">
                        <Outlet />
                    </section>
                </main>
            </div>
        </>
    );
}

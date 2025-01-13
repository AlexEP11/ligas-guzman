import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import BackGround from "./styles/Background";
import { useUser } from "@/context/hooks/useUser";
import Footer from "@/components/common/Footer";

export default function LeagueLayout() {
    const { userData } = useUser();

    const navItems = [
        { label: "Tabla de equipos", href: "/liga" },
        { label: "Subir Firmas", href: "/liga/subir/firmas" },
    ];
    return (
        <>
            <div className="relative min-h-screen">
                <BackGround />

                <main className="relative z-10">
                    <Header
                        navItems={navItems}
                        name={userData.liga}
                        linkIcon="/liga"
                    />
                    <section className="container max-w-screen-xl mx-auto mt-10 md:mb-10">
                        <Outlet />
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
}

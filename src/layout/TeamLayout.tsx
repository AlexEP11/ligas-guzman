import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import BackGround from "./styles/Background";

export default function TeamLayout() {
    return (
        <>
            <div className="relative min-h-screen">
                <BackGround />

                <main className="relative z-10">
                    <Header />
                    <section className="container max-w-screen-xl mx-auto mt-10 md:mb-10">
                        <Outlet />
                    </section>
                </main>
            </div>
        </>
    );
}

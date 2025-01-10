import { Outlet } from "react-router-dom";
import BackGround from "./styles/Background";

export default function PaymentLayout() {
    return (
        <>
            <div className="relative min-h-screen">
                <BackGround />

                <main className="relative z-10">
                    <section className="container max-w-screen-xl mx-auto mt-10 md:mb-10 px-5">
                        <Outlet />
                    </section>
                </main>
            </div>
        </>
    );
}

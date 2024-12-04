import { useState, useEffect } from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 5; // Total de imágenes en el carrusel

    // Cambiar la imagen del carrusel cada 7 segundos (7000ms)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides); // Cambiar al siguiente slide
        }, 7000);

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, []);

    return (
        <main className="flex flex-col md:flex-row h-screen">
            <div
                className="flex-1 flex items-center justify-center shadow-inner"
                style={{
                    backgroundColor: "#ffffff",
                    backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "auto",
                }}
            >
                <LoginForm />
            </div>

            <div id="carousel-4" className="relative w-1/2 h-full overflow-hidden hidden lg:block">
                <div className="relative w-full h-full">
                    {["/image.jpg", "/image 2.jpg", "/image 3.jpg", "/image 4.jpg", "/image 5.jpg"].map(
                        (src, index) => (
                            <div
                                key={index}
                                className={`absolute w-full h-full transition-opacity duration-500 ${
                                    index === currentSlide ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                <img
                                    src={src}
                                    className="w-full h-full object-cover"
                                    alt={`Slide ${index + 1}`}
                                    loading="lazy"
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </main>
    );
}

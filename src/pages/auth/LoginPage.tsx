import LoginForm from "@/components/auth/LoginForm";
import Footer from "@/components/common/Footer";
import BackGround from "@/layout/styles/Background";
import { Carousel } from "flowbite-react";

export default function LoginPage() {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                <div className="absolute -z-50">
                    <BackGround />
                </div>
                <div className="flex items-center  justify-center p-4">
                    <LoginForm />
                </div>

                <div className="hidden lg:flex items-center justify-center">
                    <Carousel
                        slideInterval={4000}
                        indicators={false}
                        theme={{
                            root: {
                                leftControl: "hidden",
                                rightControl: "hidden",
                            },
                            scrollContainer: {
                                base: "rounded-none flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth ",
                            },
                        }}
                    >
                        {[
                            "/image.jpg",
                            "/image 2.jpg",
                            "/image 3.jpg",
                            "/image 4.jpg",
                            "/image 5.jpg",
                        ].map((imagen, index) => (
                            <img
                                key={index}
                                src={imagen}
                                alt={`Imagen ${index + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        ))}
                    </Carousel>
                </div>
            </div>
            <Footer />
        </>
    );
}

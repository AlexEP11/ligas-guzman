import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SuccessPay() {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        // Inicia un temporizador para redirigir después de 5 segundos
        const timer = setTimeout(() => {
            setRedirect(true);
        }, 8000);

        // Limpieza del temporizador cuando el componente se desmonte
        return () => clearTimeout(timer);
    }, []);

    if (redirect) {
        return <Navigate to="/historial/credenciales" />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8">
            <motion.div
                className="bg-white rounded-md shadow-lg p-10 text-center space-y-5 w-full max-w-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut",
                }}
            >
                {/* Ícono de check */}
                <motion.div
                    className="flex items-center justify-center rounded-full bg-green-500 w-16 h-16 mx-auto"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <svg
                        className="w-10 h-10 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </motion.div>

                {/* Título */}
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 break-words"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        delay: 0.2,
                        duration: 0.6,
                        ease: "easeOut",
                    }}
                >
                    ¡Pago completado exitosamente!
                </motion.h1>

                {/* Mensaje */}
                <motion.p
                    className="text-xl sm:text-2xl text-gray-600"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        delay: 0.4,
                        duration: 0.6,
                        ease: "easeOut",
                    }}
                >
                    Gracias por tu compra. Serás redirigido en breve...
                </motion.p>

                {/* Barra de progreso */}
                <motion.div
                    className="h-2 bg-gray-200 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                >
                    <div className="h-full bg-green-500"></div>
                </motion.div>
            </motion.div>
        </div>
    );
}

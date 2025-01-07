import { motion, AnimatePresence } from "framer-motion";
import { Button } from "flowbite-react";
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { fetchClientSecret } from "@/api/team/TableInfo";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function CheckoutForm({
    openModal,
    setOpenModal,
}: {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}) {
    const options = { fetchClientSecret };

    return (
        <AnimatePresence>
            {openModal && (
                <>
                    {/* Fondo semitransparente para el modal */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black"
                        aria-hidden="true"
                        onClick={() => setOpenModal(false)} // Cerrar modal al hacer clic fuera
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        role="dialog"
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <div className="max-w-lg w-full rounded-3xl p-8 bg-white shadow-lg">
                            {/* Título */}
                            <div className="flex justify-between items-center mb-4">
                                <h3
                                    className="text-2xl font-semibold text-[#1580AD]"
                                    id="modal-title"
                                >
                                    Realizar pago
                                </h3>
                            </div>

                            {/* Formulario incrustado */}
                            <div
                                id="checkout"
                                className="flex justify-center"
                                style={{ maxHeight: "500px", overflow: "auto" }} // Limita el alto y agrega scroll si es necesario
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        maxWidth: "600px", // Restringe el ancho máximo
                                    }}
                                >
                                    <EmbeddedCheckoutProvider
                                        stripe={stripePromise}
                                        options={options}
                                    >
                                        <EmbeddedCheckout />
                                    </EmbeddedCheckoutProvider>
                                </div>
                            </div>

                            {/* Botón para cerrar */}
                            <div className="flex justify-start mt-4">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        onClick={() => setOpenModal(false)}
                                        color="failure"
                                        className="rounded-md font-bold text-white"
                                    >
                                        Cancelar
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

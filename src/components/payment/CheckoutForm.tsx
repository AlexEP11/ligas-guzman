import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, TextInput } from "flowbite-react";
import { loadStripe } from "@stripe/stripe-js";
import { fetchClientSecret } from "@/api/team/TableInfo";
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

type CheckoutFormProps = {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function CheckoutForm({
    openModal,
    setOpenModal,
}: CheckoutFormProps) {
    const [step, setStep] = useState(1); // Controla los pasos del modal
    const [amount, setAmount] = useState(""); // Guarda la cantidad ingresada
    const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error

    // Función personalizada para obtener el clientSecret con la cantidad
    const fetchClientSecretWithAmount = async () => {
        if (!amount) return null;

        const numericAmount = parseInt(amount, 10); // Convierte a número
        if (isNaN(numericAmount)) {
            return null;
        }

        return await fetchClientSecret(numericAmount);
    };

    const options = { fetchClientSecret: fetchClientSecretWithAmount };

    const handleNext = () => {
        const numericValue = parseInt(amount, 10);
        if (numericValue > 0) {
            setErrorMessage("");
            setStep(2);
        } else {
            setErrorMessage("Por favor, introduce una cantidad válida.");
        }
    };

    const handleClose = () => {
        setStep(1);
        setAmount("");
        setErrorMessage("");
        setOpenModal(false);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.includes(".")) {
            const roundedValue = Math.round(parseFloat(value));
            setAmount(roundedValue.toString());
        } else {
            setAmount(value);
        }
    };

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
                        onClick={handleClose}
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
                                    className="text-2xl font-bold text-[#1580AD]"
                                    id="modal-title"
                                >
                                    {step === 1
                                        ? "Introduce la cantidad"
                                        : "Realizar pago"}
                                </h3>
                            </div>

                            {/* Contenido del modal */}
                            {step === 1 ? (
                                <div className="flex flex-col gap-4">
                                    <TextInput
                                        type="number"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="Cantidad a comprar"
                                        required
                                        min={1}
                                    />
                                    {errorMessage && (
                                        <p className="text-white font-bold text-center bg-red-700 text-sm p-2 rounded-md mt-1">
                                            {errorMessage}
                                        </p>
                                    )}
                                    <Button
                                        onClick={handleNext}
                                        color="success"
                                        className="rounded-md font-bold text-white"
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            ) : (
                                <div
                                    id="checkout"
                                    className="flex justify-center"
                                    style={{
                                        maxHeight: "500px",
                                        overflow: "auto",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            maxWidth: "600px",
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
                            )}

                            {/* Botones para cerrar o volver */}
                            <div className="flex justify-start mt-4">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {step === 2 ? (
                                        <Button
                                            onClick={() => setStep(1)} // Regresa al paso 1
                                            color="dark"
                                            className="rounded-md font-bold text-white"
                                        >
                                            Volver
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleClose}
                                            color="failure"
                                            className="rounded-md font-bold text-white"
                                        >
                                            Cancelar
                                        </Button>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

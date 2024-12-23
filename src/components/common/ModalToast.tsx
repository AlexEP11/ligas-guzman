import { Button } from "flowbite-react";
import { CgDanger } from "react-icons/cg";
import { FaRegCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type ModalToastProps = {
    modalOpt: {
        message: string;
        isError: boolean;
    };
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
};

export function ModalToast({
    modalOpt: { message, isError = false },
    openModal,
    setOpenModal,
}: ModalToastProps) {
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
                        <div className="max-w-sm w-full rounded-3xl p-8 bg-white shadow-lg">
                            {/* Icono */}
                            <div className="flex items-center justify-center mb-5">
                                <div
                                    className={`rounded-full p-2  ${
                                        isError
                                            ? "bg-red-600/20"
                                            : "bg-[#1580AD]/20"
                                    }`}
                                >
                                    {isError ? (
                                        <CgDanger className="h-10 w-10 text-red-600" />
                                    ) : (
                                        <FaRegCheckCircle className="h-10 w-10 text-[#1580AD]" />
                                    )}
                                </div>
                            </div>

                            {/* Título */}
                            <div
                                className={`flex justify-center items-center ${
                                    isError ? "text-red-600" : "text-[#1580AD]"
                                }`}
                                id="modal-title"
                            >
                                <h3 className="text-2xl font-semibold text-center">
                                    {isError
                                        ? "Operación inválida"
                                        : "Operación exitosa"}
                                </h3>
                            </div>

                            {/* Mensaje */}
                            <div className="mt-4" id="modal-description">
                                <p className="text-gray-600 font-medium text-lg">
                                    {message}
                                </p>
                            </div>

                            {/* Botón de Cerrar */}
                            <div className="flex justify-end mt-4">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        onClick={() => setOpenModal(false)}
                                        theme={{
                                            color: isError
                                                ? {
                                                      failure:
                                                          "bg-red-600 hover:bg-red-700",
                                                  }
                                                : {
                                                      info: "bg-[#1580AD] hover:bg-[#126385]",
                                                  },
                                        }}
                                        color={isError ? "failure" : "info"}
                                        className="rounded-md font-bold text-white"
                                    >
                                        Cerrar
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

import { Button } from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";

type ModalToastProps = {
    modalOpt: {
        message: string;
        isError: boolean;
    };
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
};

export function ModalToast({ modalOpt: { message, isError = false }, openModal, setOpenModal }: ModalToastProps) {
    return (
        <AnimatePresence>
            {openModal && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black"
                        aria-hidden="true"
                        onClick={() => setOpenModal(false)} // Cerrar modal al hacer clic fuera
                    />
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
                        <div className="max-w-sm rounded-lg bg-white shadow-lg dark:bg-gray-800">
                            <div
                                className={`flex justify-between items-center p-5 border-b ${
                                    isError ? "border-red-600 text-red-600" : "border-blue-600  text-blue-600"
                                }`}
                                id="modal-title"
                            >
                                <h3 className="text-lg font-medium">
                                    {isError ? "Operación inválida" : "Operación exitosa"}
                                </h3>
                                <button
                                    className="text-gray-500 hover:text-gray-800"
                                    onClick={() => setOpenModal(false)}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="p-5" id="modal-description">
                                <p className="text-gray-700 dark:text-gray-300">{message}</p>
                            </div>
                            <div className="flex justify-end p-4 border-t dark:border-gray-700">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button onClick={() => setOpenModal(false)} color={isError ? "failure" : "info"}>
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

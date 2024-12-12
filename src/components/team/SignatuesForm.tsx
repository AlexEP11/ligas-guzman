import formatoPDF from "/Formato Firmas Equipo.pdf";
import { Button, FileInput, Label, Popover } from "flowbite-react";
import { useForm } from "react-hook-form";
import { FaDownload } from "react-icons/fa6";
import { IoMdCloudUpload } from "react-icons/io";
import type { Signatures } from "@/types/Common";

export default function SignaturesForm() {
    const initialValue: Signatures = {
        firmas: null,
    };

    const { register, handleSubmit, reset } = useForm({ defaultValues: initialValue });

    const onSubmit = (e: Signatures) => {};

    return (
        <form className="font-robotoMono space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="firmas" value="Frimas Equipo" />
                </div>
                <FileInput id="firmas" accept="application/pdf" {...register("firmas")} />
            </div>
            <p></p>
            <div className="flex items-center justify-between">
                <Popover
                    aria-labelledby="default-popover"
                    content={
                        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                <h3 id="default-popover" className="font-semibold text-gray-900 dark:text-white">
                                    Descargar Formato
                                </h3>
                            </div>
                            <div className="px-3 py-2">
                                <p>
                                    Si no cuenta con el formato de llenado para las firmas puede descargarlo dando clic{" "}
                                    <a
                                        href={formatoPDF}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download="Formato Firmas Equipo.pdf"
                                        className="hover:cursor-pointer text-red-600 underline"
                                    >
                                        aqui
                                    </a>
                                </p>
                            </div>
                        </div>
                    }
                >
                    <Button color="purple">
                        <FaDownload className="self-center mr-3" />
                        Formato
                    </Button>
                </Popover>
                <Button type="submit" color="success">
                    <IoMdCloudUpload className="self-center mr-3" />
                    Subir Firmas
                </Button>
            </div>
        </form>
    );
}

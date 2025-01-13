import { Button, FileInput, Label } from "flowbite-react";
import type { Signatures } from "@/types/Common";
import { IoMdCloudUpload } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { ModalToast } from "../common/ModalToast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LogoPrev from "./LogoPrev";
import { postSignatures } from "@/api/team/Signatures";
import { postLogo } from "@/api/league/FormLeague";

export default function LeagueForm() {
    const [modalOpt, setModalOpt] = useState({
        message: "",
        isError: false,
    });
    const [openModal, setOpenModal] = useState(false);

    const initialValue: Signatures = {
        presidente: null,
        secretario: null,
        logo: null,
    };

    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: initialValue,
    });

    const formValues = watch();
    const isFormValid = Object.values(formValues).every(
        (value) => value !== null
    );

    // Llamada a endpoint de subir firmas
    const { mutate: uploadSignatures } = useMutation({
        mutationFn: postSignatures,
        onSuccess: () => {
            uploadLogo(formValues.logo!);
        },
        onError: (error) => {
            setModalOpt({
                message: error.message || "Error al guardar las firmas",
                isError: true,
            });
            setOpenModal(true);
        },
    });

    // Llamada al endpoint de subir logo
    const { mutate: uploadLogo } = useMutation({
        mutationFn: postLogo,
        onSuccess: () => {
            setModalOpt({
                message: "Información guardada correctamente",
                isError: false,
            });
            setOpenModal(true);
            reset();
        },
        onError: () => {
            setModalOpt({
                message: "Error al guardar el logo",
                isError: true,
            });
            setOpenModal(true);
        },
    });

    const onSubmit = (data: Signatures) => {
        uploadSignatures({
            presidente: data.presidente,
            secretario: data.secretario,
        });
    };

    return (
        <>
            <form
                className="font-robotoMono space-y-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="presidente"
                            value="Firma Presidente"
                            className="font-bold"
                        />
                    </div>
                    <FileInput
                        accept="image/jpeg, image/png, image/jpg"
                        id="presidente"
                        {...register("presidente")}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="secretario"
                            value="Firma Secretario"
                            className="font-bold"
                        />
                    </div>
                    <FileInput
                        accept="image/jpeg, image/png, image/jpg"
                        id="secretario"
                        {...register("secretario")}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="logo"
                            value="Logo"
                            className="font-bold"
                        />
                    </div>
                    <FileInput
                        accept="image/jpeg, image/png, image/jpg"
                        id="logo"
                        {...register("logo")}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Button
                        type="submit"
                        className="font-bold"
                        color="success"
                        disabled={!isFormValid}
                    >
                        <IoMdCloudUpload className="self-center mr-3" />
                        Subir Informacion
                    </Button>
                    <LogoPrev logo={formValues.logo!} />
                </div>
            </form>
            <ModalToast
                openModal={openModal}
                setOpenModal={setOpenModal}
                modalOpt={modalOpt}
            />
        </>
    );
}

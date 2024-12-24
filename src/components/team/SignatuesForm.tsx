import { Button, FileInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { IoMdCloudUpload } from "react-icons/io";
import type { Signatures } from "@/types/Common";
import { ModalToast } from "../common/ModalToast";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postSignatures } from "@/api/team/Signatures";

export default function SignaturesForm() {
    const [modalOpt, setModalOpt] = useState({
        message: "",
        isError: false,
    });
    const [openModal, setOpenModal] = useState(false);

    const initialValue: Signatures = {
        presidente: null,
        secretario: null,
    };

    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: initialValue,
    });

    const formValues = watch();
    const isFormValid = Object.values(formValues).every(
        (value) => value !== null
    );

    // Llamada a endpoint
    const { mutate: uploadSignatures } = useMutation({
        mutationFn: postSignatures,
        onSuccess: (data) => {
            setModalOpt({
                message: data.message,
                isError: false,
            });
            setOpenModal(true);
            reset();
        },
        onError: () => {
            setModalOpt({
                message: "Error al guardar la imagen",
                isError: true,
            });
            setOpenModal(true);
        },
    });

    const onSubmit = (data: Signatures) => {
        uploadSignatures(data);
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
                            value="Frima Presidente"
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
                            value="Frima Secretario"
                            className="font-bold"
                        />
                    </div>
                    <FileInput
                        accept="image/jpeg, image/png, image/jpg"
                        id="secretario"
                        {...register("secretario")}
                    />
                </div>
                <div className="flex items-center justify-end">
                    <Button
                        type="submit"
                        className="font-bold"
                        color="success"
                        disabled={!isFormValid}
                    >
                        <IoMdCloudUpload className="self-center mr-3" />
                        Subir Firmas
                    </Button>
                </div>
            </form>
            <ModalToast
                openModal={openModal}
                setOpenModal={setOpenModal}
                modalOpt={modalOpt}
            />{" "}
        </>
    );
}

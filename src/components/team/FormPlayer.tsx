import { useForm } from "react-hook-form";
import type { PlayerInputForm, PlayerResponse } from "@/types/Player";
import { usePlayer } from "@/context/hooks/usePlayer";
import { registerPlayer, uploadPDF } from "@/api/team/RegisterPlayer";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "@/context/hooks/useUser";
import { ModalToast } from "../common/ModalToast";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { HiMiniUserPlus } from "react-icons/hi2";

export default function FormPlayer() {
    const [enabledFields, setEnabledFields] = useState<{
        [key: string]: boolean;
    }>({
        nombre: false,
        apellido_paterno: false,
        apellido_materno: false,
    });

    const [modalOpt, setModalOpt] = useState({
        message: "",
        isError: false,
    });
    const [openModal, setOpenModal] = useState(false);
    const { playerData, setPlayerData } = usePlayer();
    const { userData } = useUser();

    const initialValues: PlayerInputForm = {
        curp: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        fecha_nacimiento: "",
        foto: null,
        ine: null,
        curpFile: null,
    };

    const { register, handleSubmit, reset, setValue, watch } =
        useForm<PlayerInputForm>({
            defaultValues: initialValues,
        });

    const formValues = watch();
    const isFormValid = Object.values(formValues).every(
        (value) => value !== "" && value !== null
    );

    const {
        mutate: sendPDF,
        data: curpData,
        reset: resetPDF,
    } = useMutation<PlayerResponse, Error, File>({
        mutationFn: uploadPDF,
        onSuccess: (data: PlayerResponse) => {
            setEnabledFields({
                nombre: false,
                apellido_paterno: false,
                apellido_materno: false,
            });
            const {
                curp,
                nombre,
                apellido_materno,
                apellido_paterno,
                fecha_nacimiento,
                edad,
            } = data;
            setModalOpt({
                message: data.message,
                isError: false,
            });
            setOpenModal(true);

            const regex = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/;

            const fullName = {
                nombre,
                apellido_paterno,
                apellido_materno,
            };

            // Validar cada campo del nombre completo
            Object.entries(fullName).forEach(([key, value]) => {
                const isValid = regex.test(value);
                if (!isValid) {
                    setEnabledFields((prev) => ({
                        ...prev,
                        [key]: true, // Habilita el campo con error
                    }));
                    setModalOpt({
                        message:
                            "Uno o más campos contienen caracteres no permitidos. Por favor, remplaza el texto.",
                        isError: true,
                    });
                    setOpenModal(true);
                }
            });

            setValue("curp", curp);
            setValue("nombre", nombre);
            setValue("apellido_paterno", apellido_paterno);
            setValue("apellido_materno", apellido_materno);
            setValue("fecha_nacimiento", fecha_nacimiento);
            setPlayerData({
                ...playerData,
                años_registro: edad,
            });
        },
        onError: () => {
            setModalOpt({
                message: "El documento ingresado no es válido o es apócrifo",
                isError: true,
            });
            setOpenModal(true);
            resetPDF();
            reset();
        },
    });

    const { mutate: createPlayer } = useMutation({
        mutationFn: registerPlayer,
        onSuccess: (data) => {
            setModalOpt({
                message: data.message,
                isError: false,
            });
            setOpenModal(true);
        },
        onError: (error) => {
            setModalOpt({
                message: error.message,
                isError: true,
            });
            setOpenModal(true);
            reset();
        },
    });

    useEffect(() => {
        const updatedData = {
            ...playerData,
            ...formValues,
            carnet: curpData
                ? curpData.abreviatura +
                  userData.n_categoria +
                  String(curpData?.numero_jugadores).padStart(3, "0")
                : "???",
            foto: formValues.foto || null,
        };

        // Solo actualiza el estado si hay cambios
        if (JSON.stringify(playerData) !== JSON.stringify(updatedData)) {
            setPlayerData(updatedData);
        }
    }, [formValues, curpData, playerData, setPlayerData, userData.n_categoria]);

    // Función genérica para manejar cambios de archivos
    const handleFileChange =
        (field: keyof PlayerInputForm) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                setValue(field, file);
                if (field === "foto") {
                    setPlayerData({
                        ...playerData,
                        foto: file,
                    });
                }

                if (field === "curpFile") {
                    sendPDF(file);
                }
            }
        };

    const onSubmit = (data: PlayerInputForm) => {
        createPlayer(data);
        resetPDF();
        reset();
    };

    return (
        <>
            <form
                className="p-12 rounded-xl shadow-lg space-y-3 flex flex-col items-center max-w-lg bg-white"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-center mb-5 text-2xl font-extrabold uppercase pointer-events-none">
                    Formulario de Registro
                </h1>
                <div className="w-full">
                    <div className="block">
                        <Label htmlFor="curp-file" value="CURP" />
                    </div>
                    <FileInput
                        id="curp-file"
                        accept="application/pdf"
                        onChange={handleFileChange("curpFile")}
                    />
                </div>

                <div className="w-full">
                    <div className="block">
                        <Label
                            htmlFor="ine-file"
                            value={
                                playerData?.años_registro >= 18
                                    ? "INE"
                                    : playerData.años_registro === 0
                                    ? "INE"
                                    : "ACTA DE NACIMIENTO"
                            }
                        />
                    </div>
                    <FileInput
                        id="ine-file"
                        accept="application/pdf"
                        onChange={handleFileChange("ine")}
                    />
                </div>
                <div className="w-full">
                    <div className="block">
                        <Label htmlFor="foto-file" value="FOTO" />
                    </div>
                    <FileInput
                        id="foto-file"
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={handleFileChange("foto")}
                    />
                </div>

                <div
                    contentEditable={false}
                    className="w-full pointer-events-none cursor-not-allowed "
                >
                    <Label htmlFor="curp" value="CURP" />
                    <TextInput
                        id="curp"
                        type="text"
                        {...register("curp")}
                        readOnly
                        disabled
                    />
                </div>

                <div className="w-full">
                    <Label htmlFor="nombre" value="Nombre" />
                    <TextInput
                        id="nombre"
                        type="text"
                        {...register("nombre")}
                        readOnly={!enabledFields.nombre}
                        disabled={!enabledFields.nombre}
                        onChange={(e) => {
                            const uppercaseValue = e.target.value.toUpperCase();
                            setValue("nombre", uppercaseValue);
                        }}
                    />
                </div>

                <div className="w-full ">
                    <Label htmlFor="apellido-p" value="Apellido Paterno" />
                    <TextInput
                        id="apellido-p"
                        type="text"
                        {...register("apellido_paterno")}
                        readOnly={!enabledFields.apellido_paterno}
                        disabled={!enabledFields.apellido_paterno}
                        onChange={(e) => {
                            const uppercaseValue = e.target.value.toUpperCase();
                            setValue("apellido_paterno", uppercaseValue);
                        }}
                    />
                </div>

                <div className="w-full ">
                    <Label htmlFor="apellido-m" value="Apellido Materno" />
                    <TextInput
                        id="apellido-m"
                        type="text"
                        {...register("apellido_materno")}
                        readOnly={!enabledFields.apellido_materno}
                        disabled={!enabledFields.apellido_materno}
                        onChange={(e) => {
                            const uppercaseValue = e.target.value.toUpperCase();
                            setValue("apellido_materno", uppercaseValue);
                        }}
                    />
                </div>

                <div
                    contentEditable={false}
                    className="w-full pointer-events-none cursor-not-allowed  "
                >
                    <Label
                        htmlFor="fecha-nacimiento"
                        value="Fecha de Nacimiento"
                    />
                    <TextInput
                        id="fecha-nacimiento"
                        type="text"
                        {...register("fecha_nacimiento")}
                        readOnly
                        disabled
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full font-bold text-white"
                    disabled={!isFormValid}
                    theme={{
                        color: { info: "bg-[#1580AD] hover:bg-[#126385]" },
                    }}
                >
                    <HiMiniUserPlus className="mr-3 text-white self-center h-5 w-5" />
                    Registrar
                </Button>
            </form>

            <ModalToast
                openModal={openModal}
                setOpenModal={setOpenModal}
                modalOpt={modalOpt}
            />
        </>
    );
}

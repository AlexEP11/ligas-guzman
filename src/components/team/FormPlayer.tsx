import { useForm } from "react-hook-form";
import type { PlayerInputForm, PlayerResponse } from "@/types/Player";
import { usePlayer } from "@/context/hooks/usePlayer";
import { registerPlayer, uploadPDF } from "@/api/team/RegisterPlayer";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { useUser } from "@/context/hooks/useUser";

export default function FormPlayer() {
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

    const { register, handleSubmit, reset, setValue, watch } = useForm<PlayerInputForm>({
        defaultValues: initialValues,
    });

    const formValues = watch();
    const isFormValid = Object.values(formValues).every((value) => value !== "" && value !== null);

    const {
        mutate: sendPDF,
        data: curpData,
        reset: resetPDF,
    } = useMutation<PlayerResponse, Error, File>({
        mutationFn: uploadPDF,
        onSuccess: (data: PlayerResponse) => {
            toast.success(data.message);
            setValue("curp", data.curp);
            setValue("nombre", data.nombre);
            setValue("apellido_paterno", data.apellido_paterno);
            setValue("apellido_materno", data.apellido_materno);
            setValue("fecha_nacimiento", data.fecha_nacimiento);
            setPlayerData({
                ...playerData,
                años_registro: data.edad,
            });
        },
        onError: () => {
            toast.error("El documento ingresado no es válido.");
        },
    });

    const { mutate: createPlayer } = useMutation({
        mutationFn: registerPlayer,
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        const updatedData = {
            ...playerData,
            ...formValues,
            carnet: curpData
                ? curpData.abreviatura + userData.n_categoria + String(curpData?.numero_jugadores).padStart(3, "0")
                : "???",
            foto: formValues.foto || null,
        };

        // Solo actualiza el estado si hay cambios
        if (JSON.stringify(playerData) !== JSON.stringify(updatedData)) {
            setPlayerData(updatedData);
        }
    }, [formValues, curpData, playerData, setPlayerData, userData.n_categoria]);

    // Función genérica para manejar cambios de archivos
    const handleFileChange = (field: keyof PlayerInputForm) => (event: ChangeEvent<HTMLInputElement>) => {
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
        console.log("Formulario enviado:", data);
        createPlayer(data);
        resetPDF();
        reset();
    };

    return (
        <form
            className="p-12 rounded-xl shadow-lg space-y-5 flex flex-col items-center max-w-lg bg-white"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className="font-roboto text-center mb-5 text-2xl font-extrabold">Formulario de Registro</h1>
            <div className="form-control w-full">
                <input
                    type="file"
                    accept="application/pdf"
                    className={`input  input-floating peer ${formValues.curpFile && "is-valid"}`}
                    onChange={handleFileChange("curpFile")}
                />
                <label className="input-floating-label">CURP</label>
            </div>

            <div className="form-control w-full">
                <input
                    type="file"
                    accept="application/pdf"
                    className={`input input-floating peer ${formValues.ine && "is-valid"}`}
                    onChange={handleFileChange("ine")}
                />
                <label className="input-floating-label">INE</label>
            </div>

            <div className="form-control w-full">
                <input
                    type="file"
                    accept="image/png"
                    className={`input input-floating peer ${formValues.foto && "is-valid"}`}
                    onChange={handleFileChange("foto")}
                />
                <label className="input-floating-label">Foto</label>
            </div>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">CURP</span>
                </div>
                <input type="text" readOnly className="input" {...register("curp")} />
            </label>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Nombre</span>
                </div>
                <input type="text" readOnly className="input" {...register("nombre")} />
            </label>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Apellido Paterno</span>
                </div>
                <input type="text" readOnly className="input" {...register("apellido_paterno")} />
            </label>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Apellido Materno</span>
                </div>
                <input type="text" readOnly className="input" {...register("apellido_materno")} />
            </label>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Fecha de Nacimiento</span>
                </div>
                <input type="text" readOnly className="input" {...register("fecha_nacimiento")} />
            </label>
            <input
                type="submit"
                value="Registrar"
                className={`btn w-full btn-success${!isFormValid ? "btn-disabled" : ""}`}
                disabled={!isFormValid}
            />
        </form>
    );
}

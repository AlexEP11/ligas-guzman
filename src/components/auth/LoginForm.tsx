// LoginForm.js
import { Label, TextInput, Button } from "flowbite-react";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ModalToast } from "../common/ModalToast";
import { LoginData } from "@/types/Login";
import { authLogin } from "@/api/auth/Login";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@/context/hooks/useUser";

export default function LoginForm() {
    const { setUserData } = useUser();
    const [modalOpt, setModalOpt] = useState({
        message: "",
        isError: false,
    });
    const [openModal, setOpenModal] = useState(false);

    const initialValues = {
        username: "",
        password: "",
    };

    const { register, handleSubmit, reset } = useForm<LoginData>({
        defaultValues: initialValues,
    });

    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: authLogin,
        onSuccess: (decodedToken) => {
            setUserData({
                nombre_equipo: decodedToken.nombre_equipo ?? "Equipo Desconocido",
                user_type: decodedToken.user_type ?? "Usuario desconocido",
                categoria: decodedToken.categoria ?? "Categoría desconocida",
                equipo_id: decodedToken.equipo_id ?? -1,
                n_categoria: decodedToken.n_categoria ?? -1,
            });

            // Redirigir según el tipo de usuario
            if (decodedToken?.user_type === "equipo") {
                navigate("/registrar/credencial");
            } else if (decodedToken?.user_type === "liga") {
                navigate("/liga-dashboard");
            } else if (decodedToken?.user_type === "promo") {
                navigate("/promotoria");
            } else {
                setModalOpt({
                    message: "Tipo de usuario no reconocido. Contacta al administrador.",
                    isError: true,
                });
                setOpenModal(true);
            }

            reset();
        },
        onError: (error: Error) => {
            setModalOpt({
                message: error.message,
                isError: true,
            });
            setOpenModal(true);
            reset();
        },
    });

    const onSubmit = (data: LoginData) => {
        mutate(data);
    };

    return (
        <>
            <div className="flex-col items-center justify-center lg:w-1/2 p-4">
                <h1 className="text-4xl font-bold mb-5">Iniciar Sesión</h1>
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="usuario" value="Usuario" />
                        </div>
                        <TextInput id="usuario" type="text" placeholder="Ej: Leonidas" {...register("username")} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="contraseña" value="Contraseña" />
                        </div>
                        <TextInput
                            id="contraseña"
                            type="password"
                            placeholder="·················"
                            {...register("password")}
                        />
                    </div>
                    <Button type="submit" color="info" className="mt-3 font-bold">
                        <MdOutlineSportsSoccer className="self-center mr-2" />
                        Ingresar
                    </Button>
                </form>
            </div>
            <ModalToast setOpenModal={setOpenModal} openModal={openModal} modalOpt={modalOpt} />
        </>
    );
}

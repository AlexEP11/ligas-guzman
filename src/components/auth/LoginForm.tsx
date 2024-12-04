// LoginForm.js
import { authLogin } from "@/api/auth/Login";
import { LoginData } from "@/types/Login";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/hooks/useUser";

export default function LoginForm() {
    const { setUserData } = useUser();

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
            toast.success("Inicio de sesión exitoso");
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
            } else {
                toast.error("Tipo de usuario no reconocido. Contacta al administrador.");
            }

            reset();
        },
        onError: (error: Error) => {
            toast.error(error.message, {
                position: "bottom-left",
            });
            reset();
        },
    });

    const onSubmit = (data: LoginData) => {
        mutate(data);
    };

    return (
        <div>
            <h1 className="text-4xl font-bold mb-5">Iniciar Sesión</h1>
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-96">
                    <div className="label">
                        <span className="label-text font-bold">Usuario</span>
                    </div>
                    <input type="text" placeholder="Ej: Gavilanes" className="input" {...register("username")} />
                </label>

                <label className="form-control w-96">
                    <div className="label">
                        <span className="label-text font-bold">Contraseña</span>
                    </div>
                    <input
                        type="password"
                        placeholder="·················"
                        className="input"
                        {...register("password")}
                    />
                </label>
                <input type="submit" value="Ingresar" className="btn btn-success w-full " />
            </form>
        </div>
    );
}

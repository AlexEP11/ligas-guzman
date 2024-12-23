// import formatoPDF from "/Formato Firmas Equipo.pdf";
// import { FaDownload } from "react-icons/fa6";
import { Button, FileInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { IoMdCloudUpload } from "react-icons/io";
import type { Signatures } from "@/types/Common";

export default function SignaturesForm() {
    const initialValue: Signatures = {
        firmaPresidente: null,
        firmaSecretario: null,
    };

    const { register, handleSubmit, reset } = useForm({
        defaultValues: initialValue,
    });

    const onSubmit = (e: Signatures) => {
        console.log(e);
    };

    return (
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
                    accept="image/jpeg"
                    id="presidente"
                    {...register("firmaPresidente")}
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
                    accept="image/jpeg"
                    id="secretatio"
                    {...register("firmaSecretario")}
                />
            </div>
            <div className="flex items-center justify-end">
                <Button type="submit" className="font-bold" color="success">
                    <IoMdCloudUpload className="self-center mr-3" />
                    Subir Firmas
                </Button>
            </div>
        </form>
    );
}

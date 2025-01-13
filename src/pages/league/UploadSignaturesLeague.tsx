import LeagueForm from "@/components/league/LeagueForm";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function UploadSignaturesLeague() {
    return (
        <section className="max-w-screen-sm mx-auto p-3">
            <article className="p-5 bg-white rounded-lg shadow-lg border-black">
                <h1 className="text-2xl text-center uppercase font-bold mb-5">
                    Subir Firmas y Logo
                </h1>
                <LeagueForm />
            </article>
            <Alert
                icon={HiInformationCircle}
                theme={{
                    color: { info: "bg-[#131e3b]/90" },
                }}
                className="mt-5 rounded-2xl text-white"
            >
                <span className="font-bold text-lg">
                    Los formatos validos son: PNG, JPG y JPEG
                </span>
            </Alert>
        </section>
    );
}

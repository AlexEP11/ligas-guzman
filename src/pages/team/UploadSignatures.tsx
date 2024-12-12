import SiganturesForm from "@/components/team/SignatuesForm";

export default function UploadSignatures() {
    return (
        <section className="max-w-screen-sm mx-auto p-3">
            <article className="p-5 bg-white rounded-lg shadow-lg border-black">
                <h1 className="text-3xl text-center font-robotoMono font-bold mb-5">Subir Firmas</h1>
                <SiganturesForm />
            </article>
        </section>
    );
}

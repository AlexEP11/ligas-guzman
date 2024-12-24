type LogoPrevProps = {
    logo: FileList | null; // Recibe el archivo
};
export default function LogoPrev({ logo }: LogoPrevProps) {
    const logoUrl = logo?.length ? URL.createObjectURL(logo[0]) : null; // Crea una URL de la imagen
    return (
        <>
            {logoUrl && (
                <img
                    src={logoUrl}
                    alt="Logo Preview"
                    className="max-w-16 max-h-16 animate-pulse"
                />
            )}
        </>
    );
}

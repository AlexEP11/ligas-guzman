export default function Footer() {
    return (
        <footer className="bg-[#10070a] relative text-gray-300 py-6">
            <div className="container mx-auto text-center flex flex-col sm:flex-row items-center justify-between">
                <nav className="space-y-3 sm:space-y-0">
                    <a
                        href="/terminos-condiciones"
                        className="transition-colors text-cyan-600 hover:text-white  duration-300 font-bold mx-4 block sm:inline"
                    >
                        Términos y Condiciones
                    </a>
                    <a
                        href="mailto:ligasfutbolcdguzman@gmail.com"
                        className="transition-colors text-cyan-600 hover:text-white  duration-300 font-bold mx-4 block sm:inline"
                    >
                        Soporte Técnico
                    </a>
                </nav>
                <p className="text-sm text-gray-300 mt-4 sm:mt-0">
                    &copy; {new Date().getFullYear()} Todos los derechos
                    reservados.
                </p>
            </div>
        </footer>
    );
}

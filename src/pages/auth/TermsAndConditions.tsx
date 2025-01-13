export default function TerminosYCondiciones() {
    return (
        <div className="bg-white container mx-auto max-w-screen-xl rounded-2xl p-10 text-gray-800">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-center text-[#04628b] mb-6">
                    Términos y Condiciones
                </h1>
                <div className="text-justify space-y-5 flex flex-col items-center">
                    <section>
                        <h2 className="text-2xl font-semibold text-[#074966]">
                            1. Introducción
                        </h2>
                        <p>
                            Estos términos y condiciones regulan el uso de
                            nuestra plataforma para la generación de
                            credenciales para equipos de fútbol de las ligas de
                            Ciudad Guzmán, Jalisco, México (también conocido
                            como Zapotlán el Grande). Al utilizar nuestra
                            plataforma, aceptas cumplir con estos términos en su
                            totalidad.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-[#074966]">
                            2. Recolección de Información
                        </h2>
                        <p>
                            Para generar las credenciales, solicitamos
                            información personal que incluye: CURPs, INEs o
                            actas de nacimiento, fotos de perfil y firmas. Nos
                            comprometemos a tratar esta información con la
                            máxima confidencialidad y seguridad.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-[#074966]">
                            3. Uso de la Información
                        </h2>
                        <p>
                            La información proporcionada será utilizada
                            exclusivamente para la generación de credenciales y
                            no será compartida con terceros, excepto cuando sea
                            estrictamente necesario para cumplir con la ley. Sin
                            embargo, el acceso a esta información estará
                            disponible para los promotores y los presidentes de
                            cada liga, quienes son responsables de su manejo
                            adecuado. Los desarrolladores de esta plataforma no
                            se hacen responsables por el uso indebido que dichas
                            personas puedan darle a la información.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-[#074966]">
                            4. Pagos y Pasarela de Pago
                        </h2>
                        <p>
                            Nuestra plataforma utiliza Stripe como pasarela de
                            pago para permitir la generación de espacios para
                            almacenar e imprimir credenciales. No almacenamos ni
                            accedemos a la información de las tarjetas de pago;
                            todo el procesamiento de pagos se realiza a través
                            de Stripe, que cumple con los más altos estándares
                            de seguridad (PCI DSS).
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-[#074966]">
                            5. Responsabilidades del Usuario
                        </h2>
                        <p>
                            Es responsabilidad del usuario asegurarse de que los
                            documentos e información proporcionados sean
                            precisos y estén actualizados. La falsificación de
                            documentos está estrictamente prohibida.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-[#074966]">
                            6. Protección de Datos
                        </h2>
                        <p>
                            Implementamos medidas de seguridad técnicas y
                            organizativas para proteger tu información personal.
                            Sin embargo, el usuario entiende que ningún sistema
                            es completamente infalible y asume los riesgos
                            asociados con el uso de servicios en línea.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-[#074966]">
                            7. Modificaciones a los Términos
                        </h2>
                        <p>
                            Nos reservamos el derecho de modificar estos
                            términos en cualquier momento. Las actualizaciones
                            serán notificadas a través de la plataforma. El uso
                            continuado de la plataforma constituye la aceptación
                            de los términos actualizados.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-[#074966]">
                            8. Contacto
                        </h2>
                        <p>
                            Si tienes preguntas o inquietudes sobre estos
                            términos, puedes contactarnos mediante el correo
                            electrónico{" "}
                            <a
                                href="mailto:ligasfutbolcdguzman@gmail.com"
                                className="text-cyan-600 underline font-semibold"
                            >
                                ligasfutbolcdguzman@gmail.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

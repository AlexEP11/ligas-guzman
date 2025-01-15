import { Banner } from "flowbite-react";
import { MdAnnouncement } from "react-icons/md";
import { HiX } from "react-icons/hi";

export default function BannerTerms() {
    return (
        <Banner>
            <div className="flex w-full justify-between border-b rounded-md border-gray-200 bg-gray-50 p-4 mt-5 ">
                <div className="mx-auto flex items-center">
                    <p className="flex items-center text-sm font-normal text-gray-700 ">
                        <MdAnnouncement className="mr-4 h-4 w-4" />
                        <span className="[&_p]:inline">
                            Al iniciar sesión aceptas los&nbsp;
                            <a
                                href="/terminos-condiciones"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline font-medium text-cyan-600 underline decoration-solid underline-offset-2 hover:no-underline "
                            >
                                Terminos y Condiciones
                            </a>
                        </span>
                    </p>
                </div>
                <Banner.CollapseButton
                    color="gray"
                    className="border-0 bg-transparent text-gray-700 "
                >
                    <HiX className="h-4 w-4" />
                </Banner.CollapseButton>
            </div>
        </Banner>
    );
}

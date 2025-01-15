import type { TableInfoPlayer } from "@/types/Player";
import { useUser } from "@/context/hooks/useUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Button, Checkbox, Table } from "flowbite-react";
import { useState, useEffect } from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { ModalToast } from "../common/ModalToast";
import { IoCubeOutline } from "react-icons/io5";
import { FaSackDollar } from "react-icons/fa6";
import CheckoutForm from "../payment/CheckoutForm";
import {
    getActualSpaces,
    getAlignmentPDF,
    getAllPlayers,
    sendCard,
} from "@/api/team/TableInfo";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
    id_liga: number;
};

export default function TableInfoPlayer() {
    const { userData } = useUser();
    const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [openModal, setOpenModal] = useState(false); // Controla el modal de Stripe
    const [openCheckOut, setOpenCheckOut] = useState(false); // Controla el modal de Toast
    const [modalOpt, setModalOpt] = useState({
        message: "",
        isError: false,
    });

    const { data: players = [] } = useQuery({
        queryFn: getAllPlayers,
        queryKey: ["players"],
    });

    const token = localStorage.getItem("accessToken");
    const decodedToken: DecodedToken = jwtDecode(token!);

    const { mutate: aligmentPDF } = useMutation({
        mutationFn: getAlignmentPDF,
        onSuccess: (data) => {
            // Crear un blob con los datos del PDF
            const blob = new Blob([data], { type: "application/pdf" });

            // Crear una URL para el blob
            const url = window.URL.createObjectURL(blob);

            // Crear un enlace para descargar el archivo
            const a = document.createElement("a");
            a.href = url;
            a.download = `Alineacion ${userData.nombre_equipo}.pdf`; // Nombre del archivo descargado
            document.body.appendChild(a);
            a.click(); // Activar la descarga
            document.body.removeChild(a); // Eliminar el enlace
            window.URL.revokeObjectURL(url); // Limpiar la URL
        },
        onError: (error) => {
            setModalOpt({
                message: error.message,
                isError: true,
            });
            setOpenModal(true);
        },
    });

    const { mutate: credentials } = useMutation({
        mutationFn: sendCard,
        onSuccess: (data) => {
            // Crear un blob con los datos del PDF
            const blob = new Blob([data], { type: "application/pdf" });

            // Crear una URL para el blob
            const url = window.URL.createObjectURL(blob);

            // Crear un enlace para descargar el archivo
            const a = document.createElement("a");
            a.href = url;
            a.download = `Credenciales ${userData.nombre_equipo}.pdf`; // Nombre del archivo descargado
            document.body.appendChild(a);
            a.click(); // Activar la descarga
            document.body.removeChild(a); // Eliminar el enlace
            window.URL.revokeObjectURL(url); // Limpiar la URL
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const { data: { credenciales = 0 } = {} } = useQuery({
        queryFn: getActualSpaces,
        queryKey: ["TeamSpaces"],
    });

    useEffect(() => {
        setSelectAll(selectedPlayers.length === players.length);
    }, [selectedPlayers, players.length]);

    const handlePlayerSelect = (playerId: number) => {
        setSelectedPlayers((prevSelected) =>
            prevSelected.includes(playerId)
                ? prevSelected.filter((id) => id !== playerId)
                : [...prevSelected, playerId]
        );
    };

    const handleSelectAllChange = () => {
        setSelectedPlayers(
            selectAll
                ? []
                : players.map((player: TableInfoPlayer) => player.id_jugador)
        );
        setSelectAll(!selectAll);
    };

    const handleCredentials = () => {
        if (credenciales < selectedPlayers.length) {
            setModalOpt({
                message: `No cuentas con los espacios suficientes para generar ${selectedPlayers.length} credenciales`,
                isError: true,
            });
            setOpenModal(true);
            return;
        }
        credentials(selectedPlayers);
    };

    const handleAligment = () => {
        aligmentPDF(selectedPlayers);
    };

    return (
        <>
            <div className="mb-5">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0 lg:space-x-3 text-white">
                    <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
                        {/* Botón para abrir el modal */}
                        {decodedToken.id_liga !== 3 && (
                            <Button
                                onClick={() => setOpenCheckOut(true)}
                                color="success"
                                className="font-bold w-full lg:w-auto"
                            >
                                <FaSackDollar className="self-center mr-3" />
                                Comprar espacios de credenciales
                            </Button>
                        )}
                        <Button
                            className="font-bold w-full lg:w-auto"
                            color="purple"
                            onClick={handleAligment}
                            disabled={selectedPlayers.length === 0}
                        >
                            <IoNewspaperOutline className="self-center mr-3" />
                            Generar Alineacion
                        </Button>
                        <Button
                            className="font-bold w-full lg:w-auto"
                            theme={{
                                color: {
                                    info: "bg-[#1580AD] hover:bg-[#126385]",
                                },
                            }}
                            disabled={selectedPlayers.length === 0}
                            onClick={handleCredentials}
                        >
                            <FaRegAddressCard className="self-center mr-3" />
                            Generar Credenciales
                        </Button>
                    </div>
                    <Alert
                        icon={IoCubeOutline}
                        theme={{
                            color: {
                                info: "bg-white py-3 text-center items-center",
                            },
                        }}
                        className="text-black lg:ml-auto lg:mt-0 mt-5"
                    >
                        <span className="font-bold">
                            Espacios actuales: {credenciales}
                        </span>
                    </Alert>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-sm shadow-white bg-white space-y-5">
                <Table hoverable theme={{ body: { base: "text-sm" } }}>
                    <Table.Head
                        className="text-center text-white"
                        theme={{ cell: { base: "bg-[#1580AD]" } }}
                    >
                        <Table.HeadCell className="p-4">
                            <Checkbox
                                checked={selectAll}
                                onChange={handleSelectAllChange}
                            />
                        </Table.HeadCell>

                        <Table.HeadCell>Carnet</Table.HeadCell>
                        <Table.HeadCell>Nombre</Table.HeadCell>
                        <Table.HeadCell>CURP</Table.HeadCell>
                        <Table.HeadCell>Fecha de Registro</Table.HeadCell>
                        <Table.HeadCell>Edad</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y text-center">
                        {players.map((player: TableInfoPlayer) => (
                            <Table.Row key={player.id_jugador}>
                                <Table.Cell className="p-4">
                                    <Checkbox
                                        value={player.id_jugador}
                                        checked={selectedPlayers.includes(
                                            player.id_jugador
                                        )}
                                        onChange={() =>
                                            handlePlayerSelect(
                                                player.id_jugador
                                            )
                                        }
                                    />
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                    {player.carnet}
                                </Table.Cell>
                                <Table.Cell>{player.nombre}</Table.Cell>
                                <Table.Cell>{player.curp}</Table.Cell>
                                <Table.Cell>{player.fecha_registro}</Table.Cell>
                                <Table.Cell>{player.edad}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <p className="text-sm p-5">
                    Mostrando{" "}
                    <span className="font-bold">{players.length}</span>{" "}
                    jugadores
                </p>
            </div>

            {/* Modal de Stripe */}
            <CheckoutForm
                setOpenModal={setOpenCheckOut}
                openModal={openCheckOut}
            />

            {/* Modal de Toast para notificaciones */}
            <ModalToast
                setOpenModal={setOpenModal}
                openModal={openModal}
                modalOpt={modalOpt}
            />
        </>
    );
}

import type { TableInfoPlayer } from "@/types/Player";
import { getAlignmentPDF, getAllPlayers } from "@/api/team/TableInfo";
import { useUser } from "@/context/hooks/useUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Table } from "flowbite-react";
import { useState, useEffect } from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { ModalToast } from "../common/ModalToast";

export default function TableInfoPlayer() {
    const { userData } = useUser();
    const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [modalOpt, setModalOpt] = useState({
        message: "",
        isError: false,
    });
    const [openModal, setOpenModal] = useState(false);

    const { data: players = [] } = useQuery({
        queryFn: getAllPlayers,
        queryKey: ["players"],
    });

    const { mutate } = useMutation({
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

    useEffect(() => {
        setSelectAll(selectedPlayers.length === players.length);
    }, [selectedPlayers, players.length]);

    const handlePlayerSelect = (playerId: number) => {
        setSelectedPlayers((prevSelected) =>
            prevSelected.includes(playerId) ? prevSelected.filter((id) => id !== playerId) : [...prevSelected, playerId]
        );
    };

    const handleSelectAllChange = () => {
        setSelectedPlayers(selectAll ? [] : players.map((player: TableInfoPlayer) => player.id_jugador));
        setSelectAll(!selectAll);
    };

    const handleOnClick = () => {
        mutate();
    };

    return (
        <>
            <div className="overflow-x-auto rounded-lg shadow-sm bg-white space-y-5">
                <Table hoverable theme={{ body: { base: "text-sm" } }}>
                    <Table.Head className="text-center text-white" theme={{ cell: { base: "bg-[#155e75]" } }}>
                        <Table.HeadCell className="p-4">
                            <Checkbox checked={selectAll} onChange={handleSelectAllChange} />
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
                                        checked={selectedPlayers.includes(player.id_jugador)}
                                        onChange={() => handlePlayerSelect(player.id_jugador)}
                                    />
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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
                    Mostrando <span className="font-bold">{players.length}</span> jugadores
                </p>
            </div>
            <div className="mt-5 flex items-center justify-center md:justify-end">
                <div className="flex gap-5">
                    <Button color="purple" onClick={handleOnClick}>
                        <IoNewspaperOutline className="self-center mr-3" />
                        Generar Alineacion
                    </Button>
                    <Button color="info" disabled={selectedPlayers.length === 0}>
                        <FaRegAddressCard className="self-center mr-3" />
                        Generar Credenciales
                    </Button>
                </div>
            </div>
            <ModalToast setOpenModal={setOpenModal} openModal={openModal} modalOpt={modalOpt} />
        </>
    );
}

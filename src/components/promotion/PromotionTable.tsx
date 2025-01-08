import { Table, TextInput, Label, Checkbox, Button } from "flowbite-react";
import { getAllPlayersPromo, getDocuments } from "@/api/promo/PromoTable";
import { FaUserCircle } from "react-icons/fa";
import { PlayerPromo } from "@/types/Player";
import { FaFilePdf } from "react-icons/fa6";
import { FaIdCard } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ModalToast } from "../common/ModalToast";

export default function PromotionTable() {
    const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
    const [modalOpt, setModalOpt] = useState({ message: "", isError: false });
    const [openModal, setOpenModal] = useState(false);

    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState("");

    const { data } = useQuery<PlayerPromo[]>({
        queryFn: getAllPlayersPromo,
        queryKey: ["promotoriaAll"],
    });

    // Filtrado de jugadores basado en la búsqueda
    const filteredPlayers = (data || []).filter(
        (player) =>
            player.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.liga?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.equipo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.fecha_registro
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    // Selección de jugadores
    const handlePlayerSelect = (playerId: number) => {
        setSelectedPlayers((prevSelected) =>
            prevSelected.includes(playerId)
                ? prevSelected.filter((id) => id !== playerId)
                : [...prevSelected, playerId]
        );
    };

    // Obtencion de documentos
    const handleDownload = async (type: string) => {
        for (const playerId of selectedPlayers) {
            const player = data?.find((p) => p.id_jugador === playerId);
            if (player) {
                try {
                    const fileData = await getDocuments(type, player.curp);
                    const blob = new Blob([fileData]);

                    let extension = "pdf"; // Predeterminado
                    if (type === "foto") {
                        extension = "jpg"; // Cambiar según el formato real de la foto
                    }

                    const link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = `${player.nombre}_${type}.${extension}`;
                    link.click();
                } catch (error) {
                    setModalOpt({
                        message: "Ocurrio un error al obtener el documento",
                        isError: true,
                    });
                    setOpenModal(true);
                    console.log(error);
                }
            }
        }
    };

    return (
        <>
            <div className="mb-5">
                {/* Input de búsqueda */}
                <div className="max-w-md mb-4">
                    <div className="mb-2 block">
                        <Label
                            htmlFor="search"
                            value="Buscar por:"
                            className="font-bold text-white"
                        />
                    </div>
                    <TextInput
                        id="search"
                        addon={<FaSearch />}
                        type="search"
                        placeholder="Nombre, liga, equipo, fecha registro"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="text-white flex gap-4">
                    <Button
                        className="font-bold"
                        color="failure"
                        onClick={() => handleDownload("curp")}
                        disabled={selectedPlayers.length === 0}
                    >
                        <FaFilePdf className="mr-3 self-center hidden md:block" />
                        Descargar CURP
                    </Button>
                    <Button
                        className="font-bold"
                        color="success"
                        onClick={() => handleDownload("ine")}
                        disabled={selectedPlayers.length === 0}
                    >
                        <FaIdCard className="mr-3 self-center hidden md:block" />
                        Descargar INE / Acta
                    </Button>
                    <Button
                        className="font-bold"
                        color="purple"
                        onClick={() => handleDownload("foto")}
                        disabled={selectedPlayers.length === 0}
                    >
                        <FaUserCircle className="mr-3 self-center hidden md:block" />
                        Descargar Foto
                    </Button>
                </div>
            </div>

            {/* Tabla de jugadores */}
            <div className="overflow-x-auto rounded-lg shadow-sm bg-white space-y-5">
                <Table hoverable theme={{ body: { base: "text-sm" } }}>
                    <Table.Head
                        className="text-center text-white"
                        theme={{ cell: { base: "bg-[#1580AD] p-4" } }}
                    >
                        <Table.HeadCell className="p-4"></Table.HeadCell>
                        <Table.HeadCell>Carnet</Table.HeadCell>
                        <Table.HeadCell>Nombre</Table.HeadCell>
                        <Table.HeadCell>CURP</Table.HeadCell>
                        <Table.HeadCell>Liga</Table.HeadCell>
                        <Table.HeadCell>Equipo</Table.HeadCell>
                        <Table.HeadCell>Categoria</Table.HeadCell>
                        <Table.HeadCell>Fecha De Registro</Table.HeadCell>
                        <Table.HeadCell>Fecha De Nacimiento</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y text-center">
                        {filteredPlayers.map((player) => (
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
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {player.carnet}
                                </Table.Cell>
                                <Table.Cell>{player.nombre}</Table.Cell>
                                <Table.Cell>{player.curp}</Table.Cell>
                                <Table.Cell>{player.liga}</Table.Cell>
                                <Table.Cell>{player.equipo}</Table.Cell>
                                <Table.Cell>{player.categoria}</Table.Cell>
                                <Table.Cell>{player.fecha_registro}</Table.Cell>
                                <Table.Cell>
                                    {player.fecha_nacimiento}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {filteredPlayers.length === 0 && (
                            <Table.Row>
                                <Table.Cell
                                    colSpan={9}
                                    className="text-center py-4"
                                >
                                    No se encontraron resultados
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
            <ModalToast
                modalOpt={modalOpt}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </>
    );
}

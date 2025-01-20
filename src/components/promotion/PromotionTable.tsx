import { getDocuments, getPlayersTables } from "@/api/promo/PromoTable";
import { FaUserCircle } from "react-icons/fa";
import { PlayersResponseTable } from "@/types/Player";
import { FaFilePdf } from "react-icons/fa6";
import { FaIdCard } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ModalToast } from "../common/ModalToast";
import { Table, TextInput, Label, Checkbox, Button } from "flowbite-react";

export default function PromotionTable() {
    const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
    const [modalOpt, setModalOpt] = useState({ message: "", isError: false });
    const [openModal, setOpenModal] = useState(false);

    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState("");

    // Estado para manejar las URL de paginación
    const [currentPageUrl, setCurrentPageUrl] = useState<string | null>(null);

    const { data, isFetching } = useQuery<PlayersResponseTable>({
        queryFn: () => getPlayersTables(currentPageUrl, searchTerm),
        queryKey: ["promotoriaAll", currentPageUrl, searchTerm],
        refetchOnWindowFocus: false,
    });

    const players = data?.results ?? [];

    // Obtener las URLs de la siguiente y anterior página
    const nextPage = data?.next;
    const prevPage = data?.previous;

    // Obtener el total de jugadores
    const totalPlayers = data?.count ?? 0;

    // Función para ir a la siguiente página
    const goToNextPage = () => {
        if (nextPage) {
            const nextUrl = new URL(nextPage);
            if (searchTerm) {
                nextUrl.searchParams.set("search", searchTerm);
            }
            setCurrentPageUrl(nextUrl.toString());
        }
    };

    // Función para ir a la página anterior
    const goToPrevPage = () => {
        if (prevPage) {
            const prevUrl = new URL(prevPage);
            if (searchTerm) {
                prevUrl.searchParams.set("search", searchTerm);
            }
            setCurrentPageUrl(prevUrl.toString());
        }
    };

    // Función para manejar el cambio en el término de búsqueda
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);

        setCurrentPageUrl(null); // Reiniciar la paginación
    };

    // Selección de un jugador
    const handlePlayerSelect = (playerId: number) => {
        setSelectedPlayer((prevSelected) =>
            prevSelected === playerId ? null : playerId
        );
    };

    // Obtención de documentos
    const handleDownload = async (type: string) => {
        if (selectedPlayer !== null) {
            const player = data?.results.find(
                (p) => p.id_jugador === selectedPlayer
            );
            if (player) {
                try {
                    const fileData = await getDocuments(type, player.curp);
                    const blob = new Blob([fileData]);

                    let extension = "pdf";
                    if (type === "foto") {
                        extension = "jpg";
                    }

                    const link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = `${player.nombre}_${type}.${extension}`;
                    link.click();
                } catch (error) {
                    setModalOpt({
                        message: "Ocurrió un error al obtener el documento",
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
                        placeholder="Carnet, nombre, curp, liga, equipo, categoria"
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="text-white flex gap-4">
                    <Button
                        className="font-bold"
                        color="failure"
                        onClick={() => handleDownload("curp")}
                        disabled={selectedPlayer === null}
                    >
                        <FaFilePdf className="mr-3 self-center hidden md:block" />
                        Descargar CURP
                    </Button>
                    <Button
                        className="font-bold"
                        color="success"
                        onClick={() => handleDownload("ine")}
                        disabled={selectedPlayer === null}
                    >
                        <FaIdCard className="mr-3 self-center hidden md:block" />
                        Descargar INE / Acta
                    </Button>
                    <Button
                        className="font-bold"
                        color="purple"
                        onClick={() => handleDownload("foto")}
                        disabled={selectedPlayer === null}
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
                        <Table.HeadCell>Edad</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y text-center">
                        {isFetching ? (
                            <Table.Row>
                                <Table.Cell
                                    colSpan={9}
                                    className="text-center py-4"
                                >
                                    Cargando...
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            players.map((player) => (
                                <Table.Row key={player.id_jugador}>
                                    <Table.Cell className="p-4">
                                        <Checkbox
                                            value={player.id_jugador}
                                            checked={
                                                selectedPlayer ===
                                                player.id_jugador
                                            }
                                            onChange={() =>
                                                handlePlayerSelect(
                                                    player.id_jugador
                                                )
                                            }
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{player.carnet}</Table.Cell>
                                    <Table.Cell>{player.nombre}</Table.Cell>
                                    <Table.Cell>{player.curp}</Table.Cell>
                                    <Table.Cell>{player.liga}</Table.Cell>
                                    <Table.Cell>{player.equipo}</Table.Cell>
                                    <Table.Cell>{player.categoria}</Table.Cell>
                                    <Table.Cell>
                                        {player.fecha_registro}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {player.fecha_nacimiento}
                                    </Table.Cell>
                                    <Table.Cell>{player.edad}</Table.Cell>
                                </Table.Row>
                            ))
                        )}
                        {players.length === 0 && !isFetching && (
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
                {/* Controles de paginación */}
                {players.length > 0 && (
                    <div className="flex justify-between items-center p-5">
                        <p className="text-sm">
                            Mostrando{" "}
                            <span className="font-bold">{players.length}</span>{" "}
                            jugadores de{" "}
                            <span className="font-bold">{totalPlayers}</span>{" "}
                            jugadores en total.
                        </p>
                    </div>
                )}
            </div>
            {players.length > 0 && (
                <div className="flex gap-4 flex-wrap mt-10">
                    <Button
                        onClick={goToPrevPage}
                        disabled={!prevPage || isFetching}
                        color="gray"
                        className="font-bold w-full sm:w-auto p-2 text-sm"
                    >
                        Anterior
                    </Button>
                    <Button
                        onClick={goToNextPage}
                        disabled={!nextPage || isFetching}
                        color="gray"
                        className="font-bold w-full sm:w-auto p-2 text-sm"
                    >
                        Siguiente
                    </Button>
                </div>
            )}
            <ModalToast
                modalOpt={modalOpt}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </>
    );
}

import { Table, TextInput, Label } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function PromotionTable() {
    // Ejemplo de datos para los jugadores con liga y equipo
    const players = [
        {
            id_jugador: 1,
            carnet: "A001",
            nombre: "Erling Haaland",
            curp: "HALE000101MDFRLR09",
            edad: 23,
            liga: "Premier League",
            equipo: "Manchester City",
        },
        {
            id_jugador: 2,
            carnet: "A002",
            nombre: "Karim Benzema",
            curp: "BENK881219HDFRNL01",
            edad: 35,
            liga: "La Liga",
            equipo: "Real Madrid",
        },
        {
            id_jugador: 3,
            carnet: "A003",
            nombre: "Lionel Messi",
            curp: "MESS870624MDFRLR03",
            edad: 36,
            liga: "Ligue 1",
            equipo: "PSG",
        },
        {
            id_jugador: 4,
            carnet: "A004",
            nombre: "Kevin De Bruyne",
            curp: "DEBK911028MDFRLR04",
            edad: 32,
            liga: "Premier League",
            equipo: "Manchester City",
        },
        {
            id_jugador: 5,
            carnet: "A005",
            nombre: "Kylian Mbappé",
            curp: "MBAP980120MDFRLR05",
            edad: 25,
            liga: "Ligue 1",
            equipo: "PSG",
        },
    ];

    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState("");

    // Filtrado de jugadores basado en la búsqueda
    const filteredPlayers = players.filter(
        (player) =>
            player.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.liga.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.equipo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Input de búsqueda */}
            <div className="max-w-md mb-4">
                <div className="mb-2 block">
                    <Label htmlFor="search" value="Buscar por:" />
                </div>
                <TextInput
                    id="search"
                    addon={<FaSearch />}
                    type="text"
                    placeholder="Nombre, liga, equipo"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Tabla de jugadores */}
            <div className="overflow-x-auto rounded-lg shadow-sm bg-white space-y-5">
                <Table hoverable theme={{ body: { base: "text-sm" } }}>
                    <Table.Head className="text-center text-white" theme={{ cell: { base: "bg-[#155e75] p-4" } }}>
                        <Table.HeadCell>Carnet</Table.HeadCell>
                        <Table.HeadCell>Nombre</Table.HeadCell>
                        <Table.HeadCell>CURP</Table.HeadCell>
                        <Table.HeadCell>Liga</Table.HeadCell>
                        <Table.HeadCell>Equipo</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y text-center">
                        {filteredPlayers.map((player) => (
                            <Table.Row key={player.id_jugador}>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {player.carnet}
                                </Table.Cell>
                                <Table.Cell>{player.nombre}</Table.Cell>
                                <Table.Cell>{player.curp}</Table.Cell>
                                <Table.Cell>{player.liga}</Table.Cell>
                                <Table.Cell>{player.equipo}</Table.Cell>
                            </Table.Row>
                        ))}
                        {filteredPlayers.length === 0 && (
                            <Table.Row>
                                <Table.Cell colSpan={5} className="text-center py-4">
                                    No se encontraron resultados
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        </>
    );
}

import { getAlignmentPDF, getAllPlayers } from "@/api/team/TableInfo";
import { useUser } from "@/context/hooks/useUser";
import type { TableInfoPlayer } from "@/types/Player";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function TableInfoPlayer() {
    const { userData } = useUser();
    const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

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
            toast.error(error.message);
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
            <div className="w-full p-6 bg-white rounded-xl shadow-lg">
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                    <h1 className="text-lg font-bold text-center sm:text-left">Historial de Credenciales</h1>
                </div>

                <div className="mt-6 overflow-x-auto">
                    <table className="w-full border-collapse border-spacing-0 min-w-[600px]">
                        <thead>
                            <tr className="bg-[#caf3e2]">
                                <th className="p-3 text-center">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-warning checkbox-sm"
                                        aria-label="select all"
                                        checked={selectAll}
                                        onChange={handleSelectAllChange}
                                    />
                                </th>
                                <th className="p-3 text-sm uppercase font-semibold text-gray-700">Carnet</th>
                                <th className="p-3 text-sm uppercase font-semibold text-gray-700">Nombre</th>
                                <th className="p-3 text-sm uppercase font-semibold text-gray-700">CURP</th>
                                <th className="p-3 text-sm uppercase font-semibold text-gray-700">Registro</th>
                                <th className="p-3 text-sm uppercase font-semibold text-gray-700">Edad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player: TableInfoPlayer) => (
                                <tr
                                    key={player.id_jugador}
                                    className="text-center border-b last:border-none hover:bg-gray-100"
                                >
                                    <td className="p-3">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-warning checkbox-sm"
                                            aria-label="select player"
                                            value={player.id_jugador}
                                            checked={selectedPlayers.includes(player.id_jugador)}
                                            onChange={() => handlePlayerSelect(player.id_jugador)}
                                        />
                                    </td>
                                    <td className="p-3 text-sm text-gray-700">{player.carnet}</td>
                                    <td className="p-3 text-sm text-gray-700">{player.nombre}</td>
                                    <td className="p-3 text-sm text-gray-700">{player.curp}</td>
                                    <td className="p-3 text-sm text-gray-700">{player.fecha_registro}</td>
                                    <td className="p-3 text-sm text-gray-700">{player.edad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 py-4">
                        <p className="text-sm text-gray-500">
                            Mostrando <span className="font-semibold text-gray-900">{players.length}</span> jugadores.
                        </p>
                    </div>
                    <div className="flex gap-5">
                        <button className="btn btn-info" onClick={handleOnClick}>
                            Alineación
                        </button>
                        <button className="btn btn-success">Obtener Credenciales</button>
                    </div>
                </div>
            </div>
        </>
    );
}

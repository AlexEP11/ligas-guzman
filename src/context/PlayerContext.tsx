import { createContext, useState } from "react";
import { Player } from "@/types/Player";

type PlayerProviderProps = {
    children: React.ReactNode;
};

type PlayerContextType = {
    playerData: Player;
    setPlayerData: (data: Player) => void;
};

export const PlayerContext = createContext<PlayerContextType>(null!);

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
    const initialValuesPlayer: Player = {
        carnet: "",
        curp: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        fecha_nacimiento: "",
        años_registro: 0,
        foto: null,
        ine: null,
        curpFile: null,
    };
    const [playerData, setPlayerData] = useState<Player>(initialValuesPlayer);

    return <PlayerContext.Provider value={{ playerData, setPlayerData }}>{children}</PlayerContext.Provider>;
};

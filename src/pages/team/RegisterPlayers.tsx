import CardPlayer from "@/components/team/CardPlayer";
import FormPlayer from "@/components/team/FormPlayer";
import { usePlayer } from "@/context/hooks/usePlayer";
import { useUser } from "@/context/hooks/useUser";
import { useEffect } from "react";

export default function RegisterPlayers() {
    const { playerData, setPlayerData } = usePlayer();
    const { userData } = useUser();

    useEffect(() => {
        if (playerData.categoria !== userData.categoria) {
            setPlayerData({ ...playerData, categoria: userData.categoria });
        }
    }, [userData.categoria, playerData, setPlayerData]);

    return (
        <div className="flex flex-col mx-auto lg:flex-row md:gap-32 justify-center items-center px-4">
            <div className="w-full md:w-2/3 mb-8 flex justify-center items-center">
                <FormPlayer />
            </div>
            <div className="hidden md:block">
                <CardPlayer />
            </div>
        </div>
    );
}

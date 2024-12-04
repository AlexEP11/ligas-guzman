export type Player = {
    carnet: string;
    curp: string;
    categoria?: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    fecha_nacimiento: string;
    años_registro: number;
    foto: File | null;
    ine: File | null;
    curpFile: File | null;
};

export type PlayerInputForm = Omit<Player, "carnet" | "años_registro" | "categoria">;

export type PlayerResponse = {
    abreviatura: string;
    curp: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    edad: number;
    fecha_nacimiento: string;
    message: string;
    numero_jugadores: number;
};

export type TableInfoPlayer = {
    id_jugador: number;
    carnet: string;
    curp: string;
    fecha_registro: string;
    edad: number;
    foto: string;
    nombre: string;
};

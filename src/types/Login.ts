export type LoginData = {
    username: string;
    password: string;
};

export type User = {
    user_type: string;
    nombre_equipo: string;
    equipo_id: number;
    n_categoria: number;
    categoria: string;
};

export type DecodedToken = {
    user_type: string;
    equipo_id?: number;
    nombre_equipo?: string;
    categoria?: string;
    n_categoria?: number;
};

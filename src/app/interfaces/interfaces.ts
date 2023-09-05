export interface RespuestaPosts {
    ok: boolean;
    pagina: number;
    posts: Post[];
}

export interface Post {
    imgs?: string[];
    _id?: string;
    mensaje?: string;
    coords?: string;
    usuario?: Usuario;
    created?: string;
}

export interface Usuario {
    avatar?: string;
    _id?: string;
    nombre?: string;
    email?: string;
    password?: string;
}

//TODO: Interfaces por que estoy con capacitor
export interface UserPhoto{
    filepath: string,
    webviewPath?: string;
    data?: string;
    name?: string;
}
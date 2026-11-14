import api from "./api";

// Registrar un usuario
export const registrarUsuario = async (datos) => {
    const respuesta = await api.post("/auth/registro", datos);
    return respuesta.data;
};

// Iniciar sesión
export const iniciarSesion = async (datos) => {
    const respuesta = await api.post("/auth/login", datos);
    return respuesta.data;
};
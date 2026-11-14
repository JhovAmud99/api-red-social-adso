
import api from "./api";

// Consultar publicaciones
export const obtenerPublicaciones = async () => {
    const token = localStorage.getItem("token");

    const respuesta = await api.get("/publicaciones", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return respuesta.data;
};

// Crear una publicación
export const crearPublicacion = async (contenido) => {
    const token = localStorage.getItem("token");

    const respuesta = await api.post(
        "/publicaciones",
        { contenido },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return respuesta.data;
};

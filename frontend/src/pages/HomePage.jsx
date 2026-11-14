
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    obtenerPublicaciones,
    crearPublicacion
} from "../services/publicacionesService";

import "../styles/HomePage.css";

function HomePage() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);
    const [contenido, setContenido] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(true);

    // Consultar el usuario y las publicaciones
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }

        cargarPublicaciones();
    }, []);

    const cargarPublicaciones = async () => {
        try {
            const datos = await obtenerPublicaciones();
            setPublicaciones(datos);
            setMensaje("");
        } catch (error) {
            setMensaje(
                error.response?.data?.mensaje ||
                "No fue posible cargar las publicaciones."
            );
        } finally {
            setCargando(false);
        }
    };

    // Crear una publicación
    const manejarPublicacion = async (e) => {
        e.preventDefault();

        if (!contenido.trim()) {
            setMensaje("Escribe algo antes de publicar.");
            return;
        }

        try {
            await crearPublicacion(contenido);
            setContenido("");
            setMensaje("¡Publicación creada correctamente!");
            await cargarPublicaciones();
        } catch (error) {
            setMensaje(
                error.response?.data?.mensaje ||
                "No fue posible crear la publicación."
            );
        }
    };

    // Cerrar sesión
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/");
    };

    return (
        <main className="home-container">

            <header className="home-header">
                <h1>Mi Red Social</h1>

                <div>
                    <span>
                        {usuario
                            ? `${usuario.nombres} ${usuario.apellidos}`
                            : "Usuario"}
                    </span>

                    <button onClick={cerrarSesion}>
                        Cerrar sesión
                    </button>
                </div>
            </header>

            <section className="home-content">

                <h2>Bienvenido a tu comunidad</h2>
                <p>Conecta, comparte y descubre.</p>

                <form
                    className="publication-form"
                    onSubmit={manejarPublicacion}
                >
                    <h3>¿Qué estás pensando?</h3>

                    <textarea
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        placeholder="Comparte algo con tu comunidad..."
                        rows="4"
                    />

                    <button type="submit">
                        Publicar
                    </button>
                </form>

                {mensaje && (
                    <p className="home-message">{mensaje}</p>
                )}

                <section className="publication-list">
                    <h2>Publicaciones recientes</h2>

                    {cargando ? (
                        <p>Cargando publicaciones...</p>
                    ) : publicaciones.length === 0 ? (
                        <p>Aún no hay publicaciones. ¡Sé el primero en compartir!</p>
                    ) : (
                        publicaciones.map((publicacion) => (
                            <article
                                className="publication-card"
                                key={publicacion.id_publicacion}
                            >
                                <h3>
                                    {publicacion.nombres} {publicacion.apellidos}
                                </h3>

                                <p>{publicacion.contenido}</p>
                            </article>
                        ))
                    )}
                </section>

            </section>
        </main>
    );
}

export default HomePage;


import { useState } from "react";
import { iniciarSesion } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const manejarLogin = async (e) => {
        e.preventDefault();
        setMensaje("");
        setCargando(true);

        try {
            const datos = await iniciarSesion({
                correo,
                password
            });

            localStorage.setItem("token", datos.token);
            localStorage.setItem(
                "usuario",
                JSON.stringify(datos.usuario)
            );

            navigate("/inicio");

            // Más adelante redirigiremos al inicio de la red social.
        } catch (error) {
            setMensaje(
                error.response?.data?.mensaje ||
                "No fue posible conectar con el servidor."
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <main className="login-container">
            <section className="login-card">
                <h1>Mi Red Social</h1>
                <p>Conecta, comparte y descubre.</p>



                <form onSubmit={manejarLogin}>
                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={cargando}>
                        {cargando ? "Ingresando..." : "Iniciar sesión"}
                    </button>

                    <p className="register-link">
                        ¿No tienes una cuenta? <a href="/registro">Regístrate aquí</a>
                    </p>
                </form>

                {mensaje && <p className="mensaje">{mensaje}</p>}
            </section>
        </main>
    );
}

export default LoginPage;

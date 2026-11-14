
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrarUsuario } from "../services/authService";
import "../styles/RegisterPage.css";

function RegisterPage() {
    const navigate = useNavigate();

    const [formulario, setFormulario] = useState({
        nombres: "",
        apellidos: "",
        correo: "",
        password: "",
        confirmarPassword: ""
    });

    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);

    const manejarCambio = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const manejarRegistro = async (e) => {
        e.preventDefault();
        setMensaje("");

        if (formulario.password.length < 8) {
            setMensaje("La contraseña debe tener mínimo 8 caracteres.");
            return;
        }

        if (formulario.password !== formulario.confirmarPassword) {
            setMensaje("Las contraseñas no coinciden.");
            return;
        }

        setCargando(true);

        try {
            await registrarUsuario({
                nombres: formulario.nombres,
                apellidos: formulario.apellidos,
                correo: formulario.correo,
                password: formulario.password
            });

            setMensaje("¡Usuario registrado correctamente!");

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (error) {
            setMensaje(
                error.response?.data?.mensaje ||
                "No fue posible registrar el usuario."
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <main className="register-container">
            <section className="register-card">

                <h1>Crear cuenta</h1>
                <p>Únete a nuestra red social.</p>

                <form onSubmit={manejarRegistro}>

                    <label>Nombres</label>
                    <input
                        type="text"
                        name="nombres"
                        value={formulario.nombres}
                        onChange={manejarCambio}
                        placeholder="Ingresa tus nombres"
                        required
                    />

                    <label>Apellidos</label>
                    <input
                        type="text"
                        name="apellidos"
                        value={formulario.apellidos}
                        onChange={manejarCambio}
                        placeholder="Ingresa tus apellidos"
                        required
                    />

                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        name="correo"
                        value={formulario.correo}
                        onChange={manejarCambio}
                        placeholder="ejemplo@gmail.com"
                        required
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={formulario.password}
                        onChange={manejarCambio}
                        placeholder="Mínimo 8 caracteres"
                        minLength={8}
                        required
                    />

                    <label>Confirmar contraseña</label>
                    <input
                        type="password"
                        name="confirmarPassword"
                        value={formulario.confirmarPassword}
                        onChange={manejarCambio}
                        placeholder="Repite tu contraseña"
                        required
                    />

                    <button type="submit" disabled={cargando}>
                        {cargando ? "Registrando..." : "Crear cuenta"}
                    </button>

                </form>

                {mensaje && <p className="register-message">{mensaje}</p>}

                <p className="register-login">
                    ¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link>
                </p>

            </section>
        </main>
    );
}

export default RegisterPage;

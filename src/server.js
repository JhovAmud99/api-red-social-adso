require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const socialRoutes = require("./routes/social.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Ruta inicial para comprobar que el servidor está activo.
app.get("/", (req, res) => res.json({ mensaje: "API de la red social ADSO funcionando." }));

app.use("/api/auth", authRoutes);
app.use("/api", socialRoutes);

// Respuesta para rutas inexistentes.
app.use((req, res) => res.status(404).json({ mensaje: "Ruta no encontrada." }));

const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("Conexión con MySQL establecida.");
    app.listen(PORT, () => console.log(`Servidor disponible en http://localhost:${PORT}`));
  } catch (error) {
    console.error("No se pudo conectar con MySQL:", error.message);
    process.exit(1);
  }
})();

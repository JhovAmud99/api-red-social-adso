const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const router = express.Router();

// POST /api/auth/registro - crea una cuenta y guarda la contraseña cifrada.
router.post("/registro", async (req, res) => {
  try {
    const { nombres, apellidos, correo, password } = req.body;
    if (!nombres || !apellidos || !correo || !password) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios." });
    }
    if (password.length < 8) {
      return res.status(400).json({ mensaje: "La contraseña debe tener mínimo 8 caracteres." });
    }

    const [usuarios] = await db.execute("SELECT id_usuario, nombres, apellidos, correo, password_hash FROM usuario WHERE correo = ?",[correo]);
    if (usuarios.length) return res.status(409).json({ mensaje: "El correo ya está registrado." });

    const hash = await bcrypt.hash(password, 10);
    const [resultado] = await db.execute(
      "INSERT INTO usuario (nombres, apellidos, correo, password_hash) VALUES (?, ?, ?, ?)",
      [nombres, apellidos, correo, hash]
    );
    return res.status(201).json({ mensaje: "Usuario registrado correctamente.", id_usuario: resultado.insertId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error interno al registrar el usuario." });
  }
});

// POST /api/auth/login - valida credenciales y entrega un JWT.
router.post("/login", async (req, res) => {
  try {
    const { correo, password } = req.body;
    if (!correo || !password) return res.status(400).json({ mensaje: "Correo y contraseña son obligatorios." });

    const [usuarios] = await db.execute(
      "SELECT id_usuario, nombres, apellidos, correo, password_hash FROM usuario WHERE correo = ?",
      [correo]
    );
    if (!usuarios.length) return res.status(401).json({ mensaje: "Credenciales incorrectas." });

    const usuario = usuarios[0];
    const coincide = await bcrypt.compare(password, usuario.password_hash);
    if (!coincide) return res.status(401).json({ mensaje: "Credenciales incorrectas." });

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({
      mensaje: "Autenticación satisfactoria.",
      token,
      usuario: { id_usuario: usuario.id_usuario, nombres: usuario.nombres, apellidos: usuario.apellidos, correo: usuario.correo }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error interno al iniciar sesión." });
  }
});

module.exports = router;

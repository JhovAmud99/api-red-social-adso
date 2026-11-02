
const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

// CONSULTAR TODAS LAS PUBLICACIONES
router.get("/publicaciones", auth, async (req, res) => {
  try {
    const [publicaciones] = await db.execute(
      `SELECT
        p.id_publicacion,
        p.contenido,
        u.id_usuario,
        u.nombres,
        u.apellidos
       FROM publicacion p
       INNER JOIN usuario u
       ON p.id_usuario = u.id_usuario
       ORDER BY p.id_publicacion DESC`
    );

    res.json(publicaciones);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "No fue posible consultar las publicaciones."
    });
  }
});

// CREAR UNA PUBLICACIÓN
router.post("/publicaciones", auth, async (req, res) => {
  try {
    const { contenido } = req.body;

    if (!contenido || !contenido.trim()) {
      return res.status(400).json({
        mensaje: "El contenido es obligatorio."
      });
    }

    const [resultado] = await db.execute(
      "INSERT INTO publicacion (contenido, id_usuario) VALUES (?, ?)",
      [contenido.trim(), req.usuario.id_usuario]
    );

    res.status(201).json({
      mensaje: "Publicación creada correctamente.",
      id_publicacion: resultado.insertId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "No fue posible crear la publicación."
    });
  }
});

// EDITAR UNA PUBLICACIÓN PROPIA
router.put("/publicaciones/:id", auth, async (req, res) => {
  try {
    const { contenido } = req.body;

    if (!contenido || !contenido.trim()) {
      return res.status(400).json({
        mensaje: "El contenido es obligatorio."
      });
    }

    const [resultado] = await db.execute(
      `UPDATE publicacion
       SET contenido = ?
       WHERE id_publicacion = ? AND id_usuario = ?`,
      [
        contenido.trim(),
        req.params.id,
        req.usuario.id_usuario
      ]
    );

    if (!resultado.affectedRows) {
      return res.status(404).json({
        mensaje: "Publicación no encontrada o no pertenece al usuario."
      });
    }

    res.json({
      mensaje: "Publicación actualizada correctamente."
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "No fue posible actualizar la publicación."
    });
  }
});

// ELIMINAR UNA PUBLICACIÓN PROPIA
router.delete("/publicaciones/:id", auth, async (req, res) => {
  try {
    const [resultado] = await db.execute(
      `DELETE FROM publicacion
       WHERE id_publicacion = ? AND id_usuario = ?`,
      [req.params.id, req.usuario.id_usuario]
    );

    if (!resultado.affectedRows) {
      return res.status(404).json({
        mensaje: "Publicación no encontrada o no pertenece al usuario."
      });
    }

    res.json({
      mensaje: "Publicación eliminada correctamente."
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "No fue posible eliminar la publicación."
    });
  }
});

module.exports = router;

const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const encabezado = req.headers.authorization || "";

  console.log("Método:", req.method);
  console.log("Ruta:", req.originalUrl);
  console.log("¿Se recibió Authorization?:", !!encabezado);

  const token = encabezado.startsWith("Bearer ")
    ? encabezado.slice(7).trim()
    : null;

  console.log("¿Se recibió token?:", !!token);

  if (!token) {
    return res.status(401).json({
      mensaje: "Token no proporcionado."
    });
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token validado correctamente.");
    next();
  } catch (error) {
    console.log("Error JWT:", error.name, error.message);

    return res.status(401).json({
      mensaje: "Token inválido o vencido."
    });
  }
}

module.exports = verificarToken;
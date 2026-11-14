-- Red Social ADSO - esquema reproducible de los modulos IMPLEMENTADOS
-- Ejecutar en una instancia de prueba o en una base nueva.
-- No contiene usuarios, contrasenas ni datos reales.
CREATE DATABASE IF NOT EXISTS red_social
  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE red_social;

CREATE TABLE IF NOT EXISTS usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_usuario),
  UNIQUE KEY uq_usuario_correo (correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS publicacion (
  id_publicacion INT NOT NULL AUTO_INCREMENT,
  contenido TEXT DEFAULT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_publicacion),
  KEY id_usuario (id_usuario),
  CONSTRAINT publicacion_ibfk_1 FOREIGN KEY (id_usuario)
    REFERENCES usuario (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- No se crean tablas para modulos sin endpoints confirmados.
-- CREATE TABLE IF NOT EXISTS NO valida ni migra tablas preexistentes.

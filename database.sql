
-- RED SOCIAL ADSO
-- Script de instalación de la base de datos
-- Módulos: autenticación y publicaciones

CREATE DATABASE IF NOT EXISTS red_social
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE red_social;

-- USUARIOS
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT NOT NULL AUTO_INCREMENT,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,

    PRIMARY KEY (id_usuario),
    CONSTRAINT uq_usuario_correo UNIQUE (correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- PUBLICACIONES
CREATE TABLE IF NOT EXISTS publicacion (
    id_publicacion INT NOT NULL AUTO_INCREMENT,
    contenido TEXT DEFAULT NULL,
    id_usuario INT NOT NULL,

    PRIMARY KEY (id_publicacion),

    CONSTRAINT fk_publicacion_usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuario(id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

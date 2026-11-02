CREATE DATABASE IF NOT EXISTS red_social_adso
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE red_social_adso;

CREATE TABLE usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(80) NOT NULL,
  apellidos VARCHAR(80) NOT NULL,
  correo VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE publicaciones (
  id_publicacion INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  contenido TEXT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE comentarios (
  id_comentario INT AUTO_INCREMENT PRIMARY KEY,
  id_publicacion INT NOT NULL,
  id_usuario INT NOT NULL,
  contenido TEXT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id_publicacion) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE reacciones (
  id_reaccion INT AUTO_INCREMENT PRIMARY KEY,
  id_publicacion INT NOT NULL,
  id_usuario INT NOT NULL,
  tipo VARCHAR(30) NOT NULL DEFAULT 'me_gusta',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_reaccion_usuario_publicacion (id_publicacion, id_usuario),
  FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id_publicacion) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE amistades (
  id_amistad INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario_origen INT NOT NULL,
  id_usuario_destino INT NOT NULL,
  estado ENUM('pendiente','aceptada','rechazada') DEFAULT 'pendiente',
  fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario_origen) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario_destino) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE mensajes (
  id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario_origen INT NOT NULL,
  id_usuario_destino INT NOT NULL,
  contenido TEXT NOT NULL,
  fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario_origen) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario_destino) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

CREATE TABLE notificaciones (
  id_notificacion INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  leida BOOLEAN DEFAULT FALSE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

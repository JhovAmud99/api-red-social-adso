# API Red Social ADSO

API REST desarrollada con Node.js, Express y MySQL para el proyecto formativo de una red social tipo Facebook.

## 1. Requisitos
- Node.js 18 o superior.
- MySQL 8 o compatible.
- Postman.
- Git.

## 2. Instalación
1. Descomprimir el proyecto y abrir la carpeta en Visual Studio Code.
2. Abrir una terminal en esa carpeta.
3. Ejecutar `npm install`.
4. Crear la base de datos ejecutando el archivo `database.sql` en MySQL Workbench.
5. Copiar `.env.example` y nombrar la copia `.env`.
6. Completar en `.env` los datos de conexión de MySQL y cambiar `JWT_SECRET` por una clave privada.
7. Ejecutar `npm run dev`.
8. Abrir `http://localhost:3000`.

No subir el archivo `.env` a GitHub: contiene credenciales privadas.

## 3. Autenticación
Las rutas protegidas requieren el encabezado:
`Authorization: Bearer TOKEN`

### Servicios

| Método | Ruta | Descripción | Protección |
|---|---|---|---|
| GET | `/` | Verificar estado de API | No |
| POST | `/api/auth/registro` | Registrar usuario | No |
| POST | `/api/auth/login` | Iniciar sesión y obtener JWT | No |
| GET | `/api/publicaciones` | Listar publicaciones | Sí |
| POST | `/api/publicaciones` | Crear publicación | Sí |
| PUT | `/api/publicaciones/:id` | Editar publicación propia | Sí |
| DELETE | `/api/publicaciones/:id` | Eliminar publicación propia | Sí |
| GET | `/api/publicaciones/:id/comentarios` | Listar comentarios | Sí |
| POST | `/api/publicaciones/:id/comentarios` | Crear comentario | Sí |
| POST | `/api/publicaciones/:id/reacciones` | Crear/actualizar reacción | Sí |
| DELETE | `/api/publicaciones/:id/reacciones` | Quitar reacción propia | Sí |
| POST | `/api/amistades` | Enviar solicitud | Sí |
| PATCH | `/api/amistades/:id/aceptar` | Aceptar solicitud recibida | Sí |
| POST | `/api/mensajes` | Enviar mensaje | Sí |
| GET | `/api/mensajes/:id_usuario` | Consultar conversación | Sí |
| GET | `/api/notificaciones` | Consultar notificaciones propias | Sí |
| PATCH | `/api/notificaciones/:id/leida` | Marcar notificación como leída | Sí |

## 4. Ejemplos de solicitudes

### Registro
`POST http://localhost:3000/api/auth/registro`
```json
{
  "nombres": "Ana",
  "apellidos": "Pérez",
  "correo": "ana@example.com",
  "password": "ClaveSegura123"
}
```

### Inicio de sesión
`POST http://localhost:3000/api/auth/login`
```json
{
  "correo": "ana@example.com",
  "password": "ClaveSegura123"
}
```
La respuesta contiene el token JWT. Copiarlo en Postman y usarlo como Bearer Token para las rutas protegidas.

### Crear publicación
`POST http://localhost:3000/api/publicaciones`
```json
{ "contenido": "Mi primera publicación" }
```

### Crear comentario
`POST http://localhost:3000/api/publicaciones/1/comentarios`
```json
{ "contenido": "¡Qué buena publicación!" }
```

### Reacción
`POST http://localhost:3000/api/publicaciones/1/reacciones`
```json
{ "tipo": "me_gusta" }
```

### Enviar solicitud de amistad
`POST http://localhost:3000/api/amistades`
```json
{ "id_usuario_destino": 2 }
```

### Enviar mensaje
`POST http://localhost:3000/api/mensajes`
```json
{
  "id_usuario_destino": 2,
  "contenido": "Hola, ¿cómo estás?"
}
```

## 5. Respuestas HTTP principales
- `200`: solicitud procesada correctamente.
- `201`: recurso creado.
- `400`: datos faltantes o incorrectos.
- `401`: falta token o credenciales inválidas.
- `404`: recurso o ruta no encontrada.
- `409`: correo ya registrado.
- `500`: error interno del servidor.

## 6. Versionamiento con Git
Desde la carpeta del proyecto:
```bash
git init
git add .
git commit -m "Estructura inicial de API para red social ADSO"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/api-red-social-adso.git
git push -u origin main
```
Después de cada avance:
```bash
git add .
git commit -m "Descripción del cambio realizado"
git push
```

## 7. Consideraciones
- Las contraseñas se almacenan usando hash bcrypt; nunca se guarda la contraseña original.
- JWT protege los servicios que requieren usuario autenticado.
- Las consultas SQL utilizan parámetros para reducir el riesgo de inyección SQL.
- Este proyecto es una base académica funcional. Antes de producción se recomienda agregar límites de solicitudes, validación avanzada, políticas de privacidad y pruebas automatizadas.
- La tabla y los campos de `database.sql` deben coincidir con la base de datos utilizada en MySQL Workbench.

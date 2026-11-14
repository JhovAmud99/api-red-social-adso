# Endpoints verificados - Red Social ADSO

Base URL local: `http://localhost:3000`. JSON salvo indicacion distinta.

| Metodo | Ruta | Entrada | Salida esperada / observada | JWT |
|---|---|---|---|---|
| POST | `/api/auth/registro` | `{nombres,apellidos,correo,password}` | 201, mensaje e `id_usuario` | No |
| POST | `/api/auth/login` | `{correo,password}` | 200, `token`, `usuario` | No |
| GET | `/api/publicaciones` | Sin body | 200, arreglo de publicaciones con autor | Si |
| POST | `/api/publicaciones` | `{contenido}` | 201, confirmacion de creacion | Si |
| PUT | `/api/publicaciones/:id` | `{contenido}` | 200, confirmacion de actualizacion | Si, propietario |
| DELETE | `/api/publicaciones/:id` | Sin body | Respuesta satisfactoria; ausencia comprobada mediante GET | Si, propietario |

## Pruebas reportadas por el aprendiz

- Registro: 201 Created.
- Inicio de sesion: 200 OK y JWT.
- GET publicaciones: lista recuperada correctamente.
- POST publicaciones: 201 Created.
- PUT publicacion 4: 200 OK reportado.
- DELETE publicacion 4: eliminacion inferida de GET posterior (solo quedo publicacion 3). El estado exacto de DELETE no fue compartido.

Estos resultados corresponden a la instalacion existente. La prueba en base limpia aun esta pendiente.

## No documentados como implementados

Comentarios, reacciones, amistades, mensajes, notificaciones, perfil y otros modulos no se acreditan sin rutas y pruebas confirmadas.

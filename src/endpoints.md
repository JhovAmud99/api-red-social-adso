# Documentación de Endpoints
## API – Red Social ADSO

**Tecnología:** Node.js y Express  
**Base de datos:** MySQL  
**Herramienta de pruebas:** Postman  
**URL base:** http://localhost:3000

### 1. Autenticación

**Endpoint: Registrar usuario**

- Método: POST
- Ruta: `/api/auth/registro`
- Función: Registrar un nuevo usuario.
- Datos requeridos: nombres, apellidos, correo y password.
- Respuesta esperada: Confirmación del registro.

**Endpoint: Iniciar sesión**

- Método: POST
- Ruta: `/api/auth/login`
- Función: Verificar las credenciales del usuario.
- Datos requeridos: correo y password.
- Respuesta esperada: Mensaje de autenticación satisfactoria y token JWT.

### 2. Gestión de publicaciones

**Endpoint: Crear publicación**

- Método: POST
- Ruta: `/api/publicaciones`
- Autenticación: Requiere token JWT.
- Dato requerido: contenido.
- Función: Crear una publicación asociada al usuario autenticado.

**Endpoint: Consultar publicaciones**

- Método: GET
- Ruta: `/api/publicaciones`
- Autenticación: Requiere token JWT.
- Función: Consultar las publicaciones registradas.

**Endpoint: Actualizar publicación**

- Método: PUT
- Ruta: `/api/publicaciones/:id`
- Autenticación: Requiere token JWT.
- Dato requerido: contenido.
- Función: Actualizar una publicación propia.

**Endpoint: Eliminar publicación**

- Método: DELETE
- Ruta: `/api/publicaciones/:id`
- Autenticación: Requiere token JWT.
- Función: Eliminar una publicación propia.

### 3. Seguridad

La API utiliza JSON Web Token (JWT) para proteger las rutas que requieren autenticación. Además, las contraseñas se almacenan mediante hash utilizando bcryptjs.

### 4. Estado de implementación

Los servicios de registro, inicio de sesión y gestión de publicaciones fueron implementados y probados mediante Postman.
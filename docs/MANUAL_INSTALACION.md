# Manual de instalacion y reproduccion - Red Social ADSO

## Requisitos
Node.js y npm, MySQL, Postman. Backend Express con `mysql2/promise`, `dotenv`, `bcryptjs` y `jsonwebtoken`.

## Instalacion limpia segura
1. Hacer respaldo de la base de datos actual. **No borrar `red_social`**.
2. En MySQL Workbench, abrir `sql/database_prueba.sql` y ejecutarlo. Crea `red_social_adso_prueba` con tablas `usuario` y `publicacion`.
3. Confirmar `SHOW TABLES FROM red_social_adso_prueba;`.
4. En una **copia independiente** del backend, ejecutar `npm install`.
5. Crear `.env` local (NO incluirlo en Git ni ZIP):

```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_USER=USUARIO_MYSQL
DB_PASSWORD=CLAVE_MYSQL
DB_NAME=red_social_adso_prueba
JWT_SECRET=GENERAR_SECRETO_ALEATORIO_LARGO
PORT=3000
```

6. Verificar que el puerto 3000 este libre. Ejecutar `npm start` desde la raiz del backend.
7. Abrir `http://localhost:3000`; comprobar el mensaje de API funcionando.
8. Importar los dos archivos de `postman/` en Postman y seleccionar el entorno local.
9. Ejecutar las solicitudes en orden: registro, login, GET, POST, GET de comprobacion, PUT, DELETE, GET final. Revisar el orden y las pruebas de la coleccion antes de ejecutarlas.
10. Registrar capturas y resultados reales; no publicar tokens ni credenciales.

## Frontend
En la carpeta `frontend`, ejecutar `npm install`, configurar `VITE_API_URL=http://localhost:3000/api`, `npm run build` y `npm run preview`. La carpeta `dist/` contiene el compilado. El backend y MySQL deben estar encendidos para funciones con datos.

## Advertencias
- `database.sql` crea la base de produccion local `red_social` solo cuando no existe; para pruebas aisladas utilizar `database_prueba.sql`.
- `CREATE TABLE IF NOT EXISTS` no migra ni corrige tablas existentes.
- El script de prueba se preparó para el esquema confirmado, pero **no se ha ejecutado en el equipo del aprendiz**.
- La tabla antigua `usuarios` de la base existente no se elimina ni migra; contiene datos que deben conservarse hasta verificar su origen.
- No hay URL publica de despliegue verificada; `localhost` es local.

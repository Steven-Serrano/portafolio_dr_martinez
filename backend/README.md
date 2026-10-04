# Backend - Dr. José Ignacio Martínez Suárez

API REST para el portafolio médico profesional.

## Requisitos

- Node.js 18+
- MongoDB (local o Atlas)

## Instalación

1. Instalar dependencias:
\\\ash
npm install
\\\

2. Configurar variables de entorno:
\\\ash
cp .env.example .env
\\\

Edita \.env\ y cambia:
- \MONGODB_URI\: Tu URI de MongoDB
- \JWT_SECRET\: Una cadena aleatoria larga
- \FRONTEND_URL\: URL de tu frontend

3. Iniciar MongoDB (si es local):
\\\ash
mongod
\\\

4. Crear usuario administrador:
\\\ash
npm run seed
\\\

Credenciales admin por defecto:
- Email: \dmin@drmartinez.com\
- Password: \72231948\

⚠️ **CAMBIA LA CONTRASEÑA INMEDIATAMENTE**

5. Iniciar servidor:
\\\ash
npm run dev    # Desarrollo (con nodemon)
npm start      # Producción
\\\

La API estará en: \http://localhost:3000/api\

## Endpoints

### Autenticación
- \POST /api/auth/registro\ - Registrar usuario
- \POST /api/auth/login\ - Iniciar sesión
- \GET /api/auth/perfil\ - Obtener perfil (requiere auth)

### Publicaciones
- \GET /api/publicaciones\ - Listar publicadas
- \GET /api/publicaciones/:id\ - Obtener una
- \POST /api/publicaciones\ - Crear (admin)
- \PUT /api/publicaciones/:id\ - Editar (admin)
- \DELETE /api/publicaciones/:id\ - Eliminar (admin)
- \POST /api/publicaciones/:id/like\ - Dar/quitar like

### Comentarios
- \GET /api/comentarios/publicacion/:id\ - Listar
- \POST /api/comentarios\ - Crear (requiere auth)
- \POST /api/comentarios/:id/respuesta\ - Responder (admin)
- \POST /api/comentarios/:id/like\ - Dar/quitar like
- \DELETE /api/comentarios/:id\ - Eliminar (admin)

### Usuarios
- \GET /api/usuarios\ - Listar (admin)
- \PUT /api/usuarios/:id/estado\ - Activar/desactivar (admin)

## Estructura

\\\
backend/
├── config/          # Configuración de BD
├── models/          # Modelos Mongoose
── routes/          # Rutas de la API
├── controllers/     # Lógica de negocio
├── middleware/      # Auth y admin
├── scripts/         # Scripts de utilidad
├── uploads/         # Archivos subidos
├── server.js        # Entry point
└── .env             # Variables de entorno
\\\

## Seguridad

- ✅ Contraseñas encriptadas con bcrypt
- ✅ Autenticación JWT
- ✅ Middleware de autorización
- ✅ Variables sensibles en .env
- ✅ CORS configurado
- ✅ Helmet para headers de seguridad

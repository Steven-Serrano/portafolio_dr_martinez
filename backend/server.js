const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
const connectDB = require('./config/database');
connectDB();

const app = express();

// Middlewares de seguridad
app.use(helmet());
app.use(morgan('dev'));

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Carpeta de uploads estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/publicaciones', require('./routes/publicaciones'));
app.use('/api/comentarios', require('./routes/comentarios'));

// Ruta de salud
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'API funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        message: 'API del Dr. José Ignacio Martínez Suárez',
        version: '1.0.0',
        docs: '/api/health'
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(\🚀 Servidor corriendo en puerto \\);
    console.log(\📡 API: http://localhost:\/api\);
    console.log(\🌍 Entorno: \\);
});

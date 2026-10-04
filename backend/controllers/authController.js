const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Generar token JWT
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};

// @desc    Registrar usuario
// @route   POST /api/auth/registro
exports.registrar = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body;

        // Verificar si el email ya existe
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                success: false,
                message: 'Este correo ya está registrado.'
            });
        }

        // Crear usuario
        const usuario = await Usuario.create({
            nombre,
            apellido,
            email,
            password,
            rol: 'usuario'
        });

        const token = generarToken(usuario._id);

        res.status(201).json({
            success: true,
            message: 'Registro exitoso.',
            token,
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en el registro.',
            error: error.message
        });
    }
};

// @desc    Login usuario
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Por favor ingresa correo y contraseña.'
            });
        }

        const usuario = await Usuario.findOne({ email }).select('+password');

        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas.'
            });
        }

        if (!usuario.activo) {
            return res.status(401).json({
                success: false,
                message: 'Cuenta desactivada.'
            });
        }

        const passwordCorrecta = await usuario.compararPassword(password);

        if (!passwordCorrecta) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas.'
            });
        }

        const token = generarToken(usuario._id);

        res.json({
            success: true,
            message: 'Inicio de sesión exitoso.',
            token,
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en el inicio de sesión.',
            error: error.message
        });
    }
};

// @desc    Obtener perfil del usuario autenticado
// @route   GET /api/auth/perfil
exports.obtenerPerfil = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario._id);
        res.json({
            success: true,
            usuario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener perfil.'
        });
    }
};

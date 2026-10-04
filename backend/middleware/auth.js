const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const proteger = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No autorizado. Token no proporcionado.'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = await Usuario.findById(decoded.id);

        if (!req.usuario) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no encontrado.'
            });
        }

        if (!req.usuario.activo) {
            return res.status(401).json({
                success: false,
                message: 'Cuenta desactivada.'
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado.'
        });
    }
};

module.exports = { proteger };

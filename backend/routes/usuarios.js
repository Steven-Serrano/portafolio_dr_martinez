const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const { proteger } = require('../middleware/auth');
const { soloAdmin } = require('../middleware/admin');

// @desc    Obtener todos los usuarios (admin)
// @route   GET /api/usuarios
router.get('/', proteger, soloAdmin, async (req, res) => {
    try {
        const usuarios = await Usuario.find()
            .select('-password')
            .sort({ fechaRegistro: -1 });

        res.json({
            success: true,
            total: usuarios.length,
            usuarios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuarios.',
            error: error.message
        });
    }
});

// @desc    Desactivar/activar usuario (admin)
// @route   PUT /api/usuarios/:id/estado
router.put('/:id/estado', proteger, soloAdmin, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado.'
            });
        }

        if (usuario._id.toString() === req.usuario._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'No puedes desactivar tu propia cuenta.'
            });
        }

        usuario.activo = !usuario.activo;
        await usuario.save();

        res.json({
            success: true,
            message: \Usuario \.\,
            usuario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar usuario.',
            error: error.message
        });
    }
});

module.exports = router;

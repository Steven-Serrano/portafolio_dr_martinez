const express = require('express');
const router = express.Router();
const {
    obtenerPublicaciones,
    obtenerPublicacion,
    crearPublicacion,
    actualizarPublicacion,
    eliminarPublicacion,
    toggleLike,
    obtenerTodasAdmin
} = require('../controllers/publicacionesController');
const { proteger } = require('../middleware/auth');
const { soloAdmin } = require('../middleware/admin');

// Rutas públicas
router.get('/', obtenerPublicaciones);
router.get('/:id', obtenerPublicacion);

// Rutas autenticadas
router.post('/:id/like', proteger, toggleLike);

// Rutas admin
router.get('/admin/todas', proteger, soloAdmin, obtenerTodasAdmin);
router.post('/', proteger, soloAdmin, crearPublicacion);
router.put('/:id', proteger, soloAdmin, actualizarPublicacion);
router.delete('/:id', proteger, soloAdmin, eliminarPublicacion);

module.exports = router;

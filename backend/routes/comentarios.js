const express = require('express');
const router = express.Router();
const {
    obtenerComentarios,
    crearComentario,
    responderComentario,
    eliminarComentario,
    toggleLike
} = require('../controllers/comentariosController');
const { proteger } = require('../middleware/auth');
const { soloAdmin } = require('../middleware/admin');

router.get('/publicacion/:id', obtenerComentarios);
router.post('/', proteger, crearComentario);
router.post('/:id/respuesta', proteger, soloAdmin, responderComentario);
router.post('/:id/like', proteger, toggleLike);
router.delete('/:id', proteger, soloAdmin, eliminarComentario);

module.exports = router;

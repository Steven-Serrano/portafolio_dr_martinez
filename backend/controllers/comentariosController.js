const Comentario = require('../models/Comentario');

// @desc    Obtener comentarios de una publicación
// @route   GET /api/comentarios/publicacion/:id
exports.obtenerComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.find({
            publicacion: req.params.id,
            activo: true
        })
            .populate('usuario', 'nombre apellido')
            .populate('respondidoPor', 'nombre apellido rol')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            comentarios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener comentarios.',
            error: error.message
        });
    }
};

// @desc    Crear comentario (usuario autenticado)
// @route   POST /api/comentarios
exports.crearComentario = async (req, res) => {
    try {
        const { publicacion, contenido } = req.body;

        const comentario = await Comentario.create({
            usuario: req.usuario._id,
            publicacion,
            contenido
        });

        const poblado = await Comentario.findById(comentario._id)
            .populate('usuario', 'nombre apellido');

        res.status(201).json({
            success: true,
            message: 'Comentario publicado.',
            comentario: poblado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear comentario.',
            error: error.message
        });
    }
};

// @desc    Responder comentario (solo admin)
// @route   POST /api/comentarios/:id/respuesta
exports.responderComentario = async (req, res) => {
    try {
        const { respuesta } = req.body;

        const comentario = await Comentario.findById(req.params.id);

        if (!comentario) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado.'
            });
        }

        comentario.respuesta = respuesta;
        comentario.respondidoPor = req.usuario._id;
        comentario.fechaRespuesta = new Date();

        await comentario.save();

        const poblado = await Comentario.findById(comentario._id)
            .populate('usuario', 'nombre apellido')
            .populate('respondidoPor', 'nombre apellido rol');

        res.json({
            success: true,
            message: 'Respuesta enviada.',
            comentario: poblado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al responder.',
            error: error.message
        });
    }
};

// @desc    Eliminar comentario (admin)
// @route   DELETE /api/comentarios/:id
exports.eliminarComentario = async (req, res) => {
    try {
        const comentario = await Comentario.findById(req.params.id);

        if (!comentario) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado.'
            });
        }

        await comentario.deleteOne();

        res.json({
            success: true,
            message: 'Comentario eliminado.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar.',
            error: error.message
        });
    }
};

// @desc    Toggle like en comentario
// @route   POST /api/comentarios/:id/like
exports.toggleLike = async (req, res) => {
    try {
        const comentario = await Comentario.findById(req.params.id);
        if (!comentario) {
            return res.status(404).json({ success: false, message: 'Comentario no encontrado.' });
        }

        const usuarioId = req.usuario._id;
        const index = comentario.likes.indexOf(usuarioId);

        if (index === -1) {
            comentario.likes.push(usuarioId);
        } else {
            comentario.likes.splice(index, 1);
        }

        await comentario.save();

        res.json({
            success: true,
            likes: comentario.likes.length,
            liked: index === -1
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al dar like.', error: error.message });
    }
};

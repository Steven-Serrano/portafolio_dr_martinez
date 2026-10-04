const Publicacion = require('../models/Publicacion');
const Comentario = require('../models/Comentario');

// @desc    Obtener todas las publicaciones publicadas
// @route   GET /api/publicaciones
exports.obtenerPublicaciones = async (req, res) => {
    try {
        const { pagina = 1, limite = 12, categoria, buscar } = req.query;
        const filtro = { estado: 'publicado' };

        if (categoria) filtro.categoria = categoria;
        if (buscar) {
            filtro.$text = { $search: buscar };
        }

        const publicaciones = await Publicacion.find(filtro)
            .populate('autor', 'nombre apellido')
            .sort({ fechaPublicacion: -1 })
            .limit(limite * 1)
            .skip((pagina - 1) * limite);

        const total = await Publicacion.countDocuments(filtro);

        res.json({
            success: true,
            publicaciones,
            paginacion: {
                total,
                pagina: parseInt(pagina),
                paginas: Math.ceil(total / limite)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener publicaciones.',
            error: error.message
        });
    }
};

// @desc    Obtener una publicación por ID o slug
// @route   GET /api/publicaciones/:id
exports.obtenerPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const filtro = id.match(/^[0-9a-fA-F]{24}$/)
            ? { _id: id, estado: 'publicado' }
            : { slug: id, estado: 'publicado' };

        const publicacion = await Publicacion.findOne(filtro)
            .populate('autor', 'nombre apellido');

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada.'
            });
        }

        publicacion.visitas += 1;
        await publicacion.save();

        const comentarios = await Comentario.find({
            publicacion: publicacion._id,
            activo: true
        })
            .populate('usuario', 'nombre apellido')
            .populate('respondidoPor', 'nombre apellido rol')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            publicacion,
            comentarios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener publicación.',
            error: error.message
        });
    }
};

// @desc    Crear publicación (admin)
// @route   POST /api/publicaciones
exports.crearPublicacion = async (req, res) => {
    try {
        const publicacion = await Publicacion.create({
            ...req.body,
            autor: req.usuario._id
        });

        res.status(201).json({
            success: true,
            message: 'Publicación creada exitosamente.',
            publicacion
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear publicación.',
            error: error.message
        });
    }
};

// @desc    Actualizar publicación (admin)
// @route   PUT /api/publicaciones/:id
exports.actualizarPublicacion = async (req, res) => {
    try {
        const publicacion = await Publicacion.findById(req.params.id);

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada.'
            });
        }

        const actualizada = await Publicacion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Publicación actualizada.',
            publicacion: actualizada
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar.',
            error: error.message
        });
    }
};

// @desc    Eliminar publicación (admin)
// @route   DELETE /api/publicaciones/:id
exports.eliminarPublicacion = async (req, res) => {
    try {
        const publicacion = await Publicacion.findById(req.params.id);

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada.'
            });
        }

        await publicacion.deleteOne();
        await Comentario.deleteMany({ publicacion: req.params.id });

        res.json({
            success: true,
            message: 'Publicación eliminada.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar.',
            error: error.message
        });
    }
};

// @desc    Toggle like en publicación
// @route   POST /api/publicaciones/:id/like
exports.toggleLike = async (req, res) => {
    try {
        const publicacion = await Publicacion.findById(req.params.id);
        if (!publicacion) {
            return res.status(404).json({ success: false, message: 'Publicación no encontrada.' });
        }

        const usuarioId = req.usuario._id;
        const index = publicacion.likes.indexOf(usuarioId);

        if (index === -1) {
            publicacion.likes.push(usuarioId);
        } else {
            publicacion.likes.splice(index, 1);
        }

        await publicacion.save();

        res.json({
            success: true,
            likes: publicacion.likes.length,
            liked: index === -1
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al dar like.', error: error.message });
    }
};

// @desc    Obtener todas las publicaciones (admin - incluye borradores)
// @route   GET /api/publicaciones/admin/todas
exports.obtenerTodasAdmin = async (req, res) => {
    try {
        const publicaciones = await Publicacion.find()
            .populate('autor', 'nombre apellido')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            publicaciones
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener publicaciones.',
            error: error.message
        });
    }
};

const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    publicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publicacion',
        required: true
    },
    contenido: {
        type: String,
        required: [true, 'El comentario no puede estar vacío'],
        trim: true,
        maxlength: 1000,
        minlength: 3
    },
    respuesta: {
        type: String,
        default: null,
        maxlength: 1000
    },
    respondidoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        default: null
    },
    fechaRespuesta: {
        type: Date,
        default: null
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

comentarioSchema.index({ publicacion: 1, createdAt: -1 });

module.exports = mongoose.model('Comentario', comentarioSchema);

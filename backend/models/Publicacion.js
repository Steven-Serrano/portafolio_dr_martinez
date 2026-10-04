const mongoose = require('mongoose');

const publicacionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        maxlength: 200
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    contenido: {
        type: String,
        required: [true, 'El contenido es obligatorio']
    },
    resumen: {
        type: String,
        maxlength: 300
    },
    imagen: {
        type: String,
        default: null
    },
    imagenes: [{
        url: String,
        descripcion: String
    }],
    video: {
        type: String,
        default: null
    },
    videoEsIA: {
        type: Boolean,
        default: false
    },
    categoria: {
        type: String,
        enum: [
            'Ortopedia Infantil',
            'Traumatología',
            'Prevención',
            'Educación al paciente',
            'Consejos generales',
            'Investigación',
            'Noticias profesionales',
            'Videos educativos'
        ],
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: String,
        enum: ['borrador', 'publicado'],
        default: 'borrador'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    visitas: {
        type: Number,
        default: 0
    },
    contenidoSensible: {
        type: Boolean,
        default: false
    },
    disclaimerMedico: {
        type: String,
        default: null
    },
    fechaPublicacion: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Generar slug automáticamente
publicacionSchema.pre('save', function(next) {
    if (this.isModified('titulo')) {
        this.slug = this.titulo
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            + '-' + Date.now().toString(36);
    }
    next();
});

// Índices
publicacionSchema.index({ titulo: 'text', contenido: 'text' });
publicacionSchema.index({ estado: 1, fechaPublicacion: -1 });
publicacionSchema.index({ categoria: 1 });

module.exports = mongoose.model('Publicacion', publicacionSchema);

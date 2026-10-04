const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        maxlength: 50
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Correo electrónico inválido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: 6,
        select: false
    },
    rol: {
        type: String,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    },
    activo: {
        type: Boolean,
        default: true
    },
    avatar: {
        type: String,
        default: null
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Encriptar contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas
usuarioSchema.methods.compararPassword = async function(passwordIngresado) {
    return await bcrypt.compare(passwordIngresado, this.password);
};

// No devolver password en JSON
usuarioSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports = mongoose.model('Usuario', usuarioSchema);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Usuario = require('../models/Usuario');

dotenv.config({ path: '../.env' });

const crearAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB');

        const adminExiste = await Usuario.findOne({ rol: 'admin' });
        if (adminExiste) {
            console.log('⚠️  Ya existe un administrador.');
            process.exit(0);
        }

        const admin = await Usuario.create({
            nombre: 'José Ignacio',
            apellido: 'Martínez Suárez',
            email: 'admin@drmartinez.com',
            password: '72231948',
            rol: 'admin'
        });

        console.log('✅ Administrador creado:');
        console.log('   Email: admin@drmartinez.com');
        console.log('   Password: 72231948');
        console.log('⚠️  CAMBIA LA CONTRASEÑA INMEDIATAMENTE.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

crearAdmin();

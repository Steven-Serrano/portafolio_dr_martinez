const soloAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'admin') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Acceso restringido. Se requieren permisos de administrador.'
        });
    }
};

module.exports = { soloAdmin };

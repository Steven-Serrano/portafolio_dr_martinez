/* =========================================================
   PERFIL.JS - Gestión de Perfil de Usuario
   Dr. José Ignacio Martínez Suárez
   ========================================================= */

// ============================================
// VERIFICAR AUTENTICACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('drmartinez_isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    // Cargar datos del usuario
    cargarDatosUsuario();
    
    // Inicializar navegación
    initNavegacion();
    
    // Inicializar formularios
    initFormInformacion();
    initFormPassword();
    initNotificaciones();
    initPrivacidad();
    initEliminarCuenta();
    initTogglePasswords();
    initPasswordStrength();
});

// ============================================
// CARGAR DATOS DEL USUARIO
// ============================================
function cargarDatosUsuario() {
    const userName = localStorage.getItem('drmartinez_userName') || 'Usuario';
    const userEmail = localStorage.getItem('drmartinez_userEmail') || '';
    const userRole = localStorage.getItem('drmartinez_userRole') || 'user';

    // Actualizar hero
    document.getElementById('perfilNombre').textContent = userName;
    document.getElementById('perfilEmail').textContent = userEmail;
    document.getElementById('perfilRol').textContent = userRole === 'admin' ? 'Administrador' : 'Usuario';

    // Actualizar avatar
    const initials = userName
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
    document.getElementById('avatarInitials').textContent = initials;

    // Cargar datos en formulario
    const nombreCompleto = userName.split(' ');
    document.getElementById('infoNombre').value = nombreCompleto[0] || '';
    document.getElementById('infoApellido').value = nombreCompleto[1] || '';
    document.getElementById('infoEmail').value = userEmail;

    // Cargar datos guardados (simulados)
    const perfilData = JSON.parse(localStorage.getItem('drmartinez_perfilData') || '{}');
    if (perfilData.telefono) document.getElementById('infoTelefono').value = perfilData.telefono;
    if (perfilData.bio) document.getElementById('infoBio').value = perfilData.bio;
}

// ============================================
// NAVEGACIÓN ENTRE SECCIONES
// ============================================
function initNavegacion() {
    const navItems = document.querySelectorAll('.perfil-nav-item[data-section]');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remover active de todos
            navItems.forEach(n => n.classList.remove('active'));
            document.querySelectorAll('.perfil-section').forEach(s => s.classList.remove('active'));

            // Agregar active al seleccionado
            item.classList.add('active');
            const sectionId = item.dataset.section;
            document.getElementById(`section-${sectionId}`).classList.add('active');
        });
    });
}

// ============================================
// FORMULARIO DE INFORMACIÓN
// ============================================
function initFormInformacion() {
    const form = document.getElementById('formInformacion');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('infoNombre').value.trim();
        const apellido = document.getElementById('infoApellido').value.trim();
        const email = document.getElementById('infoEmail').value.trim();
        const telefono = document.getElementById('infoTelefono').value.trim();
        const bio = document.getElementById('infoBio').value.trim();

        if (!nombre || !apellido || !email) {
            showToast('Por favor completa todos los campos obligatorios', 'danger');
            return;
        }

        // Guardar datos
        const fullName = `${nombre} ${apellido}`;
        localStorage.setItem('drmartinez_userName', fullName);
        localStorage.setItem('drmartinez_userEmail', email);

        const perfilData = { telefono, bio };
        localStorage.setItem('drmartinez_perfilData', JSON.stringify(perfilData));

        // Actualizar UI
        document.getElementById('perfilNombre').textContent = fullName;
        document.getElementById('perfilEmail').textContent = email;

        const initials = fullName
            .split(' ')
            .map(n => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
        document.getElementById('avatarInitials').textContent = initials;

        showToast('Información actualizada exitosamente', 'success');
    });
}

// ============================================
// FORMULARIO DE CONTRASEÑA
// ============================================
function initFormPassword() {
    const form = document.getElementById('formPassword');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorDiv = document.getElementById('passwordMatchError');

        errorDiv.textContent = '';

        if (newPassword.length < 8) {
            errorDiv.textContent = 'La contraseña debe tener al menos 8 caracteres';
            return;
        }

        if (newPassword !== confirmPassword) {
            errorDiv.textContent = 'Las contraseñas no coinciden';
            return;
        }

        // Simular cambio de contraseña
        const btnSubmit = form.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerHTML;
        btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Actualizando...';
        btnSubmit.disabled = true;

        setTimeout(() => {
            showToast('Contraseña actualizada exitosamente', 'success');
            form.reset();
            document.getElementById('strengthFill').className = 'strength-fill';
            document.getElementById('strengthText').textContent = 'Ingresa una contraseña';
            btnSubmit.innerHTML = originalText;
            btnSubmit.disabled = false;
        }, 1500);
    });
}

// ============================================
// INDICADOR DE FORTALEZA DE CONTRASEÑA
// ============================================
function initPasswordStrength() {
    const passwordInput = document.getElementById('newPassword');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    if (!passwordInput) return;

    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        if (password.length === 0) {
            strengthFill.className = 'strength-fill';
            strengthText.textContent = 'Ingresa una contraseña';
            return;
        }

        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) {
            strengthFill.className = 'strength-fill weak';
            strengthText.textContent = 'Muy débil';
        } else if (score === 3) {
            strengthFill.className = 'strength-fill fair';
            strengthText.textContent = 'Débil';
        } else if (score === 4) {
            strengthFill.className = 'strength-fill good';
            strengthText.textContent = 'Buena';
        } else {
            strengthFill.className = 'strength-fill strong';
            strengthText.textContent = 'Muy segura';
        }
    });
}

// ============================================
// TOGGLE PASSWORDS
// ============================================
function initTogglePasswords() {
    document.querySelectorAll('.btn-toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const input = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bi-eye', 'bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('bi-eye-slash', 'bi-eye');
            }
        });
    });
}

// ============================================
// NOTIFICACIONES
// ============================================
function initNotificaciones() {
    const btnGuardar = document.getElementById('btnGuardarNotificaciones');
    if (!btnGuardar) return;

    // Cargar preferencias guardadas
    const prefs = JSON.parse(localStorage.getItem('drmartinez_notificaciones') || '{}');
    if (prefs.respuestas !== undefined) document.getElementById('notifRespuestas').checked = prefs.respuestas;
    if (prefs.publicaciones !== undefined) document.getElementById('notifPublicaciones').checked = prefs.publicaciones;
    if (prefs.likes !== undefined) document.getElementById('notifLikes').checked = prefs.likes;
    if (prefs.email !== undefined) document.getElementById('notifEmail').checked = prefs.email;

    btnGuardar.addEventListener('click', () => {
        const prefs = {
            respuestas: document.getElementById('notifRespuestas').checked,
            publicaciones: document.getElementById('notifPublicaciones').checked,
            likes: document.getElementById('notifLikes').checked,
            email: document.getElementById('notifEmail').checked
        };

        localStorage.setItem('drmartinez_notificaciones', JSON.stringify(prefs));
        showToast('Preferencias de notificaciones guardadas', 'success');
    });
}

// ============================================
// PRIVACIDAD
// ============================================
function initPrivacidad() {
    const btnGuardar = document.getElementById('btnGuardarPrivacidad');
    if (!btnGuardar) return;

    // Cargar preferencias
    const prefs = JSON.parse(localStorage.getItem('drmartinez_privacidad') || '{}');
    if (prefs.perfilPublico !== undefined) document.getElementById('privPerfilPublico').checked = prefs.perfilPublico;
    if (prefs.mostrarActividad !== undefined) document.getElementById('privMostrarActividad').checked = prefs.mostrarActividad;
    if (prefs.mensajes !== undefined) document.getElementById('privMensajes').checked = prefs.mensajes;

    btnGuardar.addEventListener('click', () => {
        const prefs = {
            perfilPublico: document.getElementById('privPerfilPublico').checked,
            mostrarActividad: document.getElementById('privMostrarActividad').checked,
            mensajes: document.getElementById('privMensajes').checked
        };

        localStorage.setItem('drmartinez_privacidad', JSON.stringify(prefs));
        showToast('Configuración de privacidad guardada', 'success');
    });
}

// ============================================
// ELIMINAR CUENTA
// ============================================
function initEliminarCuenta() {
    const btnEliminar = document.getElementById('btnEliminarCuenta');
    const btnConfirmar = document.getElementById('btnConfirmarEliminar');

    if (btnEliminar) {
        btnEliminar.addEventListener('click', () => {
            const modal = new bootstrap.Modal(document.getElementById('modalEliminarCuenta'));
            modal.show();
        });
    }

    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', () => {
            const email = document.getElementById('confirmDeleteEmail').value.trim();
            const userEmail = localStorage.getItem('drmartinez_userEmail');

            if (email !== userEmail) {
                showToast('El correo no coincide con el de tu cuenta', 'danger');
                return;
            }

            // Simular eliminación
            btnConfirmar.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Eliminando...';
            btnConfirmar.disabled = true;

            setTimeout(() => {
                localStorage.clear();
                showToast('Cuenta eliminada exitosamente', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }, 1500);
        });
    }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${type} border-0 show`;
    toast.setAttribute('role', 'alert');
    
    const icon = type === 'success' ? 'check-circle-fill' : 'exclamation-triangle-fill';
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="bi bi-${icon} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
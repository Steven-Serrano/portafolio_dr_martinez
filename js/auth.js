/* =========================================================
   AUTH.JS - Sistema de Autenticación Profesional
   Dr. José Ignacio Martínez Suárez
   ========================================================= */

// ============================================
// CONFIGURACIÓN DE USUARIOS MOCK
// ============================================
const AUTH_CONFIG = {
    admin: {
        email: "admin@drmartinez.com",
        password: "72231948",
        role: "admin",
        name: "Dr. José Ignacio Martínez",
        cedula: "72.231.948"
    },
    sessionKeys: {
        isLoggedIn: 'drmartinez_isLoggedIn',
        userRole: 'drmartinez_userRole',
        userName: 'drmartinez_userName',
        userEmail: 'drmartinez_userEmail',
        userCedula: 'drmartinez_userCedula'
    }
};

// ============================================
// UTILIDADES
// ============================================
const AuthUtils = {
    // Validar email
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    // Validar teléfono colombiano
    isValidPhone(phone) {
        if (!phone) return true; // Opcional
        const regex = /^(\+57)?[3][0-9]{9}$/;
        return regex.test(phone.replace(/\s/g, ''));
    },

    // Calcular fortaleza de contraseña
    getPasswordStrength(password) {
        let score = 0;
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };

        Object.values(checks).forEach(check => {
            if (check) score++;
        });

        if (score <= 2) return { level: 'weak', text: 'Muy débil', color: 'weak' };
        if (score === 3) return { level: 'fair', text: 'Débil', color: 'fair' };
        if (score === 4) return { level: 'good', text: 'Buena', color: 'good' };
        return { level: 'strong', text: 'Muy segura', color: 'strong' };
    },

    // Guardar sesión
    saveSession(user) {
        Object.keys(AUTH_CONFIG.sessionKeys).forEach(key => {
            localStorage.setItem(AUTH_CONFIG.sessionKeys[key], user[key]);
        });
    },

    // Cerrar sesión
    clearSession() {
        Object.values(AUTH_CONFIG.sessionKeys).forEach(key => {
            localStorage.removeItem(key);
        });
    },

    // Verificar si está logueado
    isLoggedIn() {
        return localStorage.getItem(AUTH_CONFIG.sessionKeys.isLoggedIn) === 'true';
    },

    // Obtener usuario actual
    getCurrentUser() {
        return {
            isLoggedIn: this.isLoggedIn(),
            role: localStorage.getItem(AUTH_CONFIG.sessionKeys.userRole),
            name: localStorage.getItem(AUTH_CONFIG.sessionKeys.userName),
            email: localStorage.getItem(AUTH_CONFIG.sessionKeys.userEmail)
        };
    }
};

// ============================================
// VALIDACIONES DE FORMULARIO
// ============================================
const FormValidator = {
    showError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        if (input) input.classList.add('error');
        if (error) error.textContent = message;
    },

    clearError(inputId, errorId) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        if (input) input.classList.remove('error');
        if (error) error.textContent = '';
    },

    markSuccess(inputId) {
        const input = document.getElementById(inputId);
        if (input) {
            input.classList.remove('error');
            input.classList.add('success');
        }
    },

    clearAllErrors(form) {
        form.querySelectorAll('.form-input').forEach(input => {
            input.classList.remove('error', 'success');
        });
        form.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
    }
};

// ============================================
// TOGGLE PASSWORD
// ============================================
function initTogglePassword() {
    document.querySelectorAll('.toggle-password-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
            } else {
                input.type = 'password';
                icon.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
            }
        });
    });
}

// ============================================
// INDICADOR DE FORTALEZA DE CONTRASEÑA
// ============================================
function initPasswordStrength() {
    const passwordInput = document.getElementById('regPassword');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    if (!passwordInput || !strengthFill || !strengthText) return;

    passwordInput.addEventListener('input', function() {
        const password = this.value;
        
        if (password.length === 0) {
            strengthFill.className = 'strength-fill';
            strengthText.textContent = 'Ingresa una contraseña';
            return;
        }

        const strength = AuthUtils.getPasswordStrength(password);
        strengthFill.className = `strength-fill ${strength.color}`;
        strengthText.textContent = strength.text;
    });
}

// ============================================
// LOGIN
// ============================================
function initLogin() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        FormValidator.clearAllErrors(form);

        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        const alertDiv = document.getElementById('loginAlert');
        const successDiv = document.getElementById('loginSuccess');
        const submitBtn = document.getElementById('loginSubmitBtn');

        // Ocultar alertas previas
        alertDiv.style.display = 'none';
        successDiv.style.display = 'none';

        // Validaciones
        let hasError = false;

        if (!email) {
            FormValidator.showError('loginEmail', 'loginEmailError', 'El correo es obligatorio');
            hasError = true;
        } else if (!AuthUtils.isValidEmail(email)) {
            FormValidator.showError('loginEmail', 'loginEmailError', 'Ingresa un correo válido');
            hasError = true;
        }

        if (!password) {
            FormValidator.showError('loginPassword', 'loginPasswordError', 'La contraseña es obligatoria');
            hasError = true;
        }

        if (hasError) return;

        // Simular carga
        const btnContent = submitBtn.querySelector('.btn-content');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        btnContent.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;

        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Validar credenciales
        if (email === AUTH_CONFIG.admin.email && password === AUTH_CONFIG.admin.password) {
            // Login como ADMIN
            AuthUtils.saveSession({
                isLoggedIn: 'true',
                userRole: AUTH_CONFIG.admin.role,
                userName: AUTH_CONFIG.admin.name,
                userEmail: AUTH_CONFIG.admin.email,
                userCedula: AUTH_CONFIG.admin.cedula
            });

            successDiv.querySelector('#loginSuccessMessage').textContent = 
                `¡Bienvenido, ${AUTH_CONFIG.admin.name}! Redirigiendo...`;
            successDiv.style.display = 'flex';

            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1000);
        } else {
            // Login como usuario normal (simulado)
            AuthUtils.saveSession({
                isLoggedIn: 'true',
                userRole: 'user',
                userName: 'Usuario Demo',
                userEmail: email,
                userCedula: ''
            });

            successDiv.querySelector('#loginSuccessMessage').textContent = 
                '¡Inicio de sesión exitoso! Redirigiendo...';
            successDiv.style.display = 'flex';

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }

        btnContent.style.display = 'flex';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    });
}

// ============================================
// REGISTRO
// ============================================
function initRegistro() {
    const form = document.getElementById('registroForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        FormValidator.clearAllErrors(form);

        const nombre = document.getElementById('regNombre').value.trim();
        const apellido = document.getElementById('regApellido').value.trim();
        const email = document.getElementById('regEmail').value.trim().toLowerCase();
        const telefono = document.getElementById('regTelefono').value.trim();
        const password = document.getElementById('regPassword').value;
        const passwordConfirm = document.getElementById('regPasswordConfirm').value;
        const terms = document.getElementById('regTerms').checked;

        const alertDiv = document.getElementById('registroAlert');
        const successDiv = document.getElementById('registroSuccess');
        const submitBtn = document.getElementById('registroSubmitBtn');

        // Ocultar alertas previas
        alertDiv.style.display = 'none';
        successDiv.style.display = 'none';

        // Validaciones
        let hasError = false;

        if (!nombre) {
            FormValidator.showError('regNombre', 'regNombreError', 'El nombre es obligatorio');
            hasError = true;
        } else if (nombre.length < 2) {
            FormValidator.showError('regNombre', 'regNombreError', 'El nombre debe tener al menos 2 caracteres');
            hasError = true;
        }

        if (!apellido) {
            FormValidator.showError('regApellido', 'regApellidoError', 'El apellido es obligatorio');
            hasError = true;
        } else if (apellido.length < 2) {
            FormValidator.showError('regApellido', 'regApellidoError', 'El apellido debe tener al menos 2 caracteres');
            hasError = true;
        }

        if (!email) {
            FormValidator.showError('regEmail', 'regEmailError', 'El correo es obligatorio');
            hasError = true;
        } else if (!AuthUtils.isValidEmail(email)) {
            FormValidator.showError('regEmail', 'regEmailError', 'Ingresa un correo válido');
            hasError = true;
        }

        if (telefono && !AuthUtils.isValidPhone(telefono)) {
            FormValidator.showError('regTelefono', 'regTelefonoError', 'Ingresa un teléfono válido (ej: 3001234567)');
            hasError = true;
        }

        if (!password) {
            FormValidator.showError('regPassword', 'regPasswordError', 'La contraseña es obligatoria');
            hasError = true;
        } else if (password.length < 8) {
            FormValidator.showError('regPassword', 'regPasswordError', 'La contraseña debe tener al menos 8 caracteres');
            hasError = true;
        }

        if (!passwordConfirm) {
            FormValidator.showError('regPasswordConfirm', 'regPasswordConfirmError', 'Confirma tu contraseña');
            hasError = true;
        } else if (password !== passwordConfirm) {
            FormValidator.showError('regPasswordConfirm', 'regPasswordConfirmError', 'Las contraseñas no coinciden');
            hasError = true;
        }

        if (!terms) {
            FormValidator.showError('regTerms', 'regTermsError', 'Debes aceptar los términos y condiciones');
            hasError = true;
        }

        if (hasError) return;

        // Simular carga
        const btnContent = submitBtn.querySelector('.btn-content');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        btnContent.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;

        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Guardar sesión de usuario nuevo
        AuthUtils.saveSession({
            isLoggedIn: 'true',
            userRole: 'user',
            userName: `${nombre} ${apellido}`,
            userEmail: email,
            userCedula: ''
        });

        successDiv.querySelector('#registroSuccessMessage').textContent = 
            `¡Cuenta creada exitosamente! Bienvenido ${nombre}. Redirigiendo al login...`;
        successDiv.style.display = 'flex';

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

        btnContent.style.display = 'flex';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTogglePassword();
    initPasswordStrength();
    initLogin();
    initRegistro();

    // Si ya está logueado y está en login/registro, redirigir
    if (AuthUtils.isLoggedIn()) {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'login.html' || currentPage === 'registro.html') {
            const user = AuthUtils.getCurrentUser();
            if (user.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'index.html';
            }
        }
    }
});

// Exportar para uso global
window.AuthUtils = AuthUtils;
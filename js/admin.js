/* =========================================================
   ADMIN.JS - Panel Administrativo
   Dr. José Ignacio Martínez Suárez
   ========================================================= */

// ============================================
// NAVEGACIÓN ENTRE SECCIONES
// ============================================
function navigateToSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar sección seleccionada
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Actualizar sidebar
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`.sidebar-link[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Actualizar título
    const titles = {
        'dashboard': ['Dashboard', 'Resumen general de la plataforma'],
        'publicaciones': ['Publicaciones', 'Gestiona todas las publicaciones'],
        'crear-publicacion': ['Crear Publicación', 'Nueva publicación para la plataforma'],
        'comentarios': ['Comentarios', 'Modera y responde comentarios'],
        'usuarios': ['Usuarios', 'Gestiona los usuarios registrados'],
        'configuracion': ['Configuración', 'Ajustes generales del sitio']
    };

    const [title, subtitle] = titles[sectionId] || ['Panel', ''];
    document.getElementById('pageTitle').textContent = title;
    document.getElementById('pageSubtitle').textContent = subtitle;

    // Cerrar sidebar en móvil
    if (window.innerWidth <= 1024) {
        document.getElementById('adminSidebar').classList.remove('open');
    }
}

// ============================================
// INICIALIZAR NAVEGACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Click en sidebar links
    document.querySelectorAll('.sidebar-link[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            navigateToSection(section);
        });
    });

    // Toggle sidebar en móvil
    const btnToggle = document.getElementById('btnToggleSidebar');
    const sidebar = document.getElementById('adminSidebar');

    if (btnToggle && sidebar) {
        btnToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Cerrar sidebar al hacer click fuera en móvil
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 && 
            sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            !btnToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    // Logout
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
                localStorage.removeItem('drmartinez_isLoggedIn');
                localStorage.removeItem('drmartinez_userRole');
                localStorage.removeItem('drmartinez_userName');
                localStorage.removeItem('drmartinez_userEmail');
                window.location.href = 'login.html';
            }
        });
    }

    // Verificar autenticación
    const isLoggedIn = localStorage.getItem('drmartinez_isLoggedIn') === 'true';
    const userRole = localStorage.getItem('drmartinez_userRole');

    if (!isLoggedIn || userRole !== 'admin') {
        window.location.href = 'login.html';
        return;
    }

    // Cargar nombre del admin
    const adminName = localStorage.getItem('drmartinez_userName');
    if (adminName) {
        document.getElementById('adminName').textContent = adminName;
    }

    // Inicializar estadísticas
    loadStats();

    // Inicializar formulario de publicación
    initPublicacionForm();

    // Inicializar filtros de comentarios
    initCommentFilters();

    // Inicializar búsqueda de usuarios
    initUserSearch();
});

// ============================================
// CARGAR ESTADÍSTICAS
// ============================================
function loadStats() {
    // Simular datos (en producción vendrían del backend)
    const stats = {
        publicaciones: 12,
        comentarios: 48,
        usuarios: 156,
        visitas: 3420
    };

    // Animar números
    animateNumber('statPublicaciones', stats.publicaciones);
    animateNumber('statComentarios', stats.comentarios);
    animateNumber('statUsuarios', stats.usuarios);
    animateNumber('statVisitas', stats.visitas);

    // Actualizar badge de comentarios
    document.getElementById('badgeComentarios').textContent = '5';
}

function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// ============================================
// FORMULARIO DE PUBLICACIÓN
// ============================================
function initPublicacionForm() {
    const form = document.getElementById('formPublicacion');
    if (!form) return;

    // Upload de imagen/video
    const btnUploadImage = document.getElementById('btnUploadImage');
    const btnUploadVideo = document.getElementById('btnUploadVideo');
    const btnYoutubeUrl = document.getElementById('btnYoutubeUrl');
    const fileInput = document.getElementById('fileInput');
    const youtubeUrl = document.getElementById('youtubeUrl');
    const mediaPreview = document.getElementById('mediaPreview');
    const btnRemoveMedia = document.getElementById('btnRemoveMedia');

    if (btnUploadImage) {
        btnUploadImage.addEventListener('click', () => {
            fileInput.accept = 'image/*';
            fileInput.click();
        });
    }

    if (btnUploadVideo) {
        btnUploadVideo.addEventListener('click', () => {
            fileInput.accept = 'video/*';
            fileInput.click();
        });
    }

    if (btnYoutubeUrl) {
        btnYoutubeUrl.addEventListener('click', () => {
            youtubeUrl.style.display = youtubeUrl.style.display === 'none' ? 'block' : 'none';
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                mediaPreview.style.display = 'flex';
                document.getElementById('mediaPreviewText').textContent = file.name;
            }
        });
    }

    if (btnRemoveMedia) {
        btnRemoveMedia.addEventListener('click', () => {
            mediaPreview.style.display = 'none';
            fileInput.value = '';
            youtubeUrl.value = '';
            youtubeUrl.style.display = 'none';
        });
    }

    // Submit form
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const titulo = document.getElementById('pubTitulo').value.trim();
        const categoria = document.getElementById('pubCategoria').value;
        const contenido = document.getElementById('pubContenido').value.trim();
        const estado = document.getElementById('pubEstado').value;

        if (!titulo || !categoria || !contenido) {
            showToast('Por favor completa todos los campos obligatorios', 'danger');
            return;
        }

        // Simular guardado
        const btnSubmit = form.querySelector('button[type="submit"]');
        const originalText = btnSubmit.innerHTML;
        btnSubmit.innerHTML = '<span class="auth-spinner"></span> Publicando...';
        btnSubmit.disabled = true;

        setTimeout(() => {
            showToast(`Publicación "${titulo}" ${estado === 'published' ? 'publicada' : 'guardada como borrador'} exitosamente`, 'success');
            form.reset();
            mediaPreview.style.display = 'none';
            youtubeUrl.style.display = 'none';
            btnSubmit.innerHTML = originalText;
            btnSubmit.disabled = false;

            setTimeout(() => {
                navigateToSection('publicaciones');
            }, 1500);
        }, 1500);
    });
}

// ============================================
// FILTROS DE COMENTARIOS
// ============================================
function initCommentFilters() {
    const filterBtns = document.querySelectorAll('.btn-filter');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            const comments = document.querySelectorAll('.comment-admin-item');

            comments.forEach(comment => {
                const status = comment.querySelector('.badge-status');
                if (!status) return;

                if (filter === 'all') {
                    comment.style.display = 'block';
                } else if (filter === 'pending' && status.classList.contains('badge-pending')) {
                    comment.style.display = 'block';
                } else if (filter === 'responded' && status.classList.contains('badge-responded')) {
                    comment.style.display = 'block';
                } else {
                    comment.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// BÚSQUEDA DE USUARIOS
// ============================================
function initUserSearch() {
    const searchInput = document.getElementById('searchUsers');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#usuariosTable tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? '' : 'none';
        });
    });
}

// ============================================
// MODAL DE RESPUESTA
// ============================================
function openReplyModal(btn) {
    const commentItem = btn.closest('.comment-admin-item');
    const userName = commentItem.querySelector('.comment-admin-user strong').textContent;
    const commentText = commentItem.querySelector('.comment-admin-content p').textContent;

    const commentOriginal = document.getElementById('commentOriginal');
    commentOriginal.innerHTML = `
        <strong>${userName}</strong>
        <p>${commentText}</p>
    `;

    const modal = new bootstrap.Modal(document.getElementById('replyModal'));
    modal.show();

    // Guardar referencia al botón
    document.getElementById('btnSendReply').dataset.commentId = commentItem.dataset.id || Date.now();
}

// Enviar respuesta
document.addEventListener('DOMContentLoaded', () => {
    const btnSendReply = document.getElementById('btnSendReply');
    if (btnSendReply) {
        btnSendReply.addEventListener('click', () => {
            const replyText = document.getElementById('replyText').value.trim();
            
            if (!replyText) {
                showToast('Por favor escribe una respuesta', 'danger');
                return;
            }

            // Simular envío
            btnSendReply.innerHTML = '<span class="auth-spinner"></span> Enviando...';
            btnSendReply.disabled = true;

            setTimeout(() => {
                showToast('Respuesta enviada exitosamente', 'success');
                document.getElementById('replyText').value = '';
                
                const modal = bootstrap.Modal.getInstance(document.getElementById('replyModal'));
                modal.hide();

                btnSendReply.innerHTML = '<i class="bi bi-send"></i> Enviar respuesta';
                btnSendReply.disabled = false;
            }, 1000);
        });
    }
});

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

// Hacer funciones globales
window.navigateToSection = navigateToSection;
window.openReplyModal = openReplyModal;
window.showToast = showToast;
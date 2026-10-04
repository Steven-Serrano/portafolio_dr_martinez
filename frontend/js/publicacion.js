/* =========================================================
   PUBLICACION.JS - Página Individual de Publicación
   ========================================================= */

// Datos de ejemplo (en producción vendrían del backend)
const publicacionData = {
    id: 1,
    titulo: "El Método Ponseti: Tratamiento del pie equinovaro en niños",
    categoria: "Ortopedia Infantil",
    fecha: "28 de septiembre de 2026",
    imagen: "assets/img/ortopedia-infantil.jpg",
    video: null,
    videoEsIA: false,
    contenido: `
        <p>El pie equinovaro es una condición congénita que afecta aproximadamente a 1 de cada 1000 recién nacidos a nivel mundial. Esta deformidad se caracteriza por la inversión del pie, flexión plantar del tobillo y aducción del antepié.</p>
        
        <h2>¿Qué es el Método Ponseti?</h2>
        <p>El Método Ponseti es el estándar de oro mundial para el tratamiento del pie equinovaro congénito. Desarrollado por el Dr. Ignacio Ponseti en la Universidad de Iowa, este método ha revolucionado el tratamiento de esta condición, evitando en la mayoría de los casos la necesidad de cirugía extensa.</p>
        
        <blockquote>
            "El tratamiento temprano y adecuado del pie equinovaro puede cambiar completamente la vida de un niño, permitiéndole caminar y correr como cualquier otro."
        </blockquote>
        
        <h3>Fases del tratamiento</h3>
        <ul>
            <li><strong>Fase de corrección:</strong> Se realizan manipulaciones suaves y aplicación de yesos seriados, generalmente cada semana durante 5-8 semanas.</li>
            <li><strong>Tenotomía del Aquiles:</strong> En el 90% de los casos se requiere este procedimiento menor para completar la corrección.</li>
            <li><strong>Fase de mantenimiento:</strong> Uso de férula de abducción (botas y barra) durante 3 años para prevenir recurrencias.</li>
        </ul>
        
        <h3>Resultados esperados</h3>
        <p>Con el tratamiento adecuado y la adherencia al protocolo de mantenimiento, más del 95% de los niños logran un pie funcional, indoloro y plantígrado, permitiéndoles participar en actividades deportivas y llevar una vida normal.</p>
        
        <p>Es fundamental que los padres comprendan la importancia de seguir todas las fases del tratamiento, especialmente la fase de mantenimiento, que es donde ocurren la mayoría de las recurrencias por abandono del tratamiento.</p>
    `,
    tags: ["ortopedia infantil", "pie equinovaro", "método Ponseti", "tratamiento"],
    likes: 124,
    comentarios: [
        {
            id: 1,
            usuario: "María González",
            avatar: "MG",
            fecha: "Hace 2 días",
            contenido: "Excelente información doctor. Mi bebé fue diagnosticado con pie equinovaro y estamos comenzando el tratamiento. ¿A qué edad es ideal iniciar?",
            respuesta: {
                usuario: "Dr. José Ignacio Martínez",
                avatar: "JM",
                fecha: "Hace 1 día",
                contenido: "Hola María. El tratamiento ideal comienza desde la primera o segunda semana de vida. Cuanto antes se inicie, mejores resultados se obtienen. No te preocupes, el método Ponseti es muy efectivo cuando se aplica tempranamente."
            }
        },
        {
            id: 2,
            usuario: "Carlos Ramírez",
            avatar: "CR",
            fecha: "Hace 5 días",
            contenido: "¿Cuánto tiempo dura aproximadamente todo el tratamiento?",
            respuesta: null
        }
    ]
};

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    cargarPublicacion();
    cargarComentarios();
    initLikeButton();
    initNavbar();
});

// ============================================
// CARGAR PUBLICACIÓN
// ============================================
function cargarPublicacion() {
    document.getElementById('breadcrumbTitle').textContent = publicacionData.titulo.substring(0, 50) + '...';
    document.getElementById('pubCategoria').textContent = publicacionData.categoria;
    document.getElementById('pubFecha').textContent = publicacionData.fecha;
    document.getElementById('pubTitulo').textContent = publicacionData.titulo;
    document.getElementById('likeCount').textContent = publicacionData.likes;
    
    // Imagen
    if (publicacionData.imagen) {
        document.getElementById('pubImagen').style.display = 'block';
        document.getElementById('pubImagenSrc').src = publicacionData.imagen;
        document.getElementById('pubImagenSrc').alt = publicacionData.titulo;
    }
    
    // Video
    if (publicacionData.video) {
        document.getElementById('pubVideo').style.display = 'block';
        document.getElementById('pubVideoSrc').src = publicacionData.video;
        if (publicacionData.videoEsIA) {
            document.getElementById('pubAIBadge').style.display = 'flex';
        }
    }
    
    // Contenido
    document.getElementById('pubContenido').innerHTML = publicacionData.contenido;
    
    // Tags
    const tagsContainer = document.getElementById('pubTags');
    publicacionData.tags.forEach(tag => {
        const tagElement = document.createElement('a');
        tagElement.href = `publicaciones.html?tag=${tag}`;
        tagElement.className = 'tag';
        tagElement.textContent = `#${tag}`;
        tagsContainer.appendChild(tagElement);
    });
    
    // Título de la página
    document.title = `${publicacionData.titulo} | Dr. José Ignacio Martínez Suárez`;
}

// ============================================
// CARGAR COMENTARIOS
// ============================================
function cargarComentarios() {
    const comentariosList = document.getElementById('comentariosList');
    const emptyState = document.getElementById('emptyState');
    const comentariosCount = document.getElementById('comentariosCount');
    
    comentariosCount.textContent = `${publicacionData.comentarios.length} comentarios`;
    
    if (publicacionData.comentarios.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    publicacionData.comentarios.forEach(comentario => {
        const comentarioHTML = crearComentarioHTML(comentario);
        comentariosList.insertAdjacentHTML('beforeend', comentarioHTML);
    });
}

function crearComentarioHTML(comentario) {
    let respuestaHTML = '';
    
    if (comentario.respuesta) {
        respuestaHTML = `
            <div class="comentario-respuesta">
                <div class="respuesta-header">
                    <span class="respuesta-badge">Respuesta del administrador</span>
                    <strong>${comentario.respuesta.usuario}</strong>
                    <small>${comentario.respuesta.fecha}</small>
                </div>
                <p>${comentario.respuesta.contenido}</p>
            </div>
        `;
    }
    
    return `
        <div class="comentario-item">
            <div class="comentario-header">
                <div class="comentario-avatar">${comentario.avatar}</div>
                <div class="comentario-meta">
                    <strong>${comentario.usuario}</strong>
                    <small>${comentario.fecha}</small>
                </div>
            </div>
            <div class="comentario-body">
                ${comentario.contenido}
            </div>
            <div class="comentario-actions">
                <button onclick="responderComentario(${comentario.id})">
                    <i class="bi bi-reply"></i>
                    Responder
                </button>
            </div>
            ${respuestaHTML}
        </div>
    `;
}

// ============================================
// LIKE BUTTON
// ============================================
function initLikeButton() {
    const btnLike = document.getElementById('btnLike');
    let liked = false;
    
    btnLike.addEventListener('click', () => {
        liked = !liked;
        const likeCount = document.getElementById('likeCount');
        let count = parseInt(likeCount.textContent);
        
        if (liked) {
            btnLike.classList.add('liked');
            btnLike.querySelector('i').classList.replace('bi-heart', 'bi-heart-fill');
            likeCount.textContent = count + 1;
        } else {
            btnLike.classList.remove('liked');
            btnLike.querySelector('i').classList.replace('bi-heart-fill', 'bi-heart');
            likeCount.textContent = count - 1;
        }
    });
}

// ============================================
// PUBLICAR COMENTARIO
// ============================================
function publicarComentario() {
    const texto = document.getElementById('comentarioTexto').value.trim();
    const errorDiv = document.getElementById('comentarioError');
    
    if (!texto) {
        errorDiv.textContent = 'Por favor escribe un comentario';
        errorDiv.classList.add('show');
        return;
    }
    
    if (texto.length < 10) {
        errorDiv.textContent = 'El comentario debe tener al menos 10 caracteres';
        errorDiv.classList.add('show');
        return;
    }
    
    errorDiv.classList.remove('show');
    
    // Simular publicación
    const nuevoComentario = {
        id: publicacionData.comentarios.length + 1,
        usuario: "Tú",
        avatar: "TU",
        fecha: "Ahora mismo",
        contenido: texto,
        respuesta: null
    };
    
    publicacionData.comentarios.unshift(nuevoComentario);
    
    const comentariosList = document.getElementById('comentariosList');
    const comentarioHTML = crearComentarioHTML(nuevoComentario);
    comentariosList.insertAdjacentHTML('afterbegin', comentarioHTML);
    
    document.getElementById('comentarioTexto').value = '';
    document.getElementById('comentariosCount').textContent = `${publicacionData.comentarios.length} comentarios`;
    
    showToast('Comentario publicado exitosamente', 'success');
}

// ============================================
// RESPONDER COMENTARIO
// ============================================
function responderComentario(id) {
    const isLoggedIn = localStorage.getItem('drmartinez_isLoggedIn') === 'true';
    const userRole = localStorage.getItem('drmartinez_userRole');
    
    if (!isLoggedIn) {
        showToast('Debes iniciar sesión para responder', 'warning');
        window.location.href = 'login.html';
        return;
    }
    
    if (userRole !== 'admin') {
        showToast('Solo el administrador puede responder comentarios', 'warning');
        return;
    }
    
    const respuesta = prompt('Escribe tu respuesta:');
    if (respuesta && respuesta.trim()) {
        const comentario = publicacionData.comentarios.find(c => c.id === id);
        if (comentario) {
            comentario.respuesta = {
                usuario: "Dr. José Ignacio Martínez",
                avatar: "JM",
                fecha: "Ahora mismo",
                contenido: respuesta.trim()
            };
            
            // Recargar comentarios
            document.getElementById('comentariosList').innerHTML = '';
            cargarComentarios();
            
            showToast('Respuesta publicada exitosamente', 'success');
        }
    }
}

// ============================================
// SCROLL A COMENTARIOS
// ============================================
function scrollToComments() {
    document.getElementById('comentariosSection').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// COMPARTIR
// ============================================
function compartirPublicacion() {
    const url = window.location.href;
    const titulo = publicacionData.titulo;
    
    if (navigator.share) {
        navigator.share({
            title: titulo,
            text: `Mira esta publicación del Dr. Martínez: ${titulo}`,
            url: url
        }).catch(err => console.log('Error al compartir:', err));
    } else {
        navigator.clipboard.writeText(url).then(() => {
            showToast('Enlace copiado al portapapeles', 'success');
        });
    }
}

// ============================================
// NAVBAR DINÁMICA
// ============================================
function initNavbar() {
    const isLoggedIn = localStorage.getItem('drmartinez_isLoggedIn') === 'true';
    const userName = localStorage.getItem('drmartinez_userName');
    const userRole = localStorage.getItem('drmartinez_userRole');
    
    const navbarActions = document.getElementById('navbarActions');
    
    if (isLoggedIn && userName) {
        const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        
        let adminOption = '';
        if (userRole === 'admin') {
            adminOption = `<li><a class="dropdown-item" href="admin.html"><i class="bi bi-shield-lock me-2"></i>Panel Admin</a></li>`;
        }
        
        navbarActions.innerHTML = `
            <div class="user-dropdown-wrapper">
                <button class="btn-user-menu" id="btnUserMenu">
                    <div class="user-avatar-small">${initials}</div>
                    <span class="user-name-display">${userName.split(' ')[0]}</span>
                    <i class="bi bi-chevron-down user-chevron"></i>
                </button>
                <div class="user-dropdown-menu" id="userDropdownMenu">
                    <div class="user-dropdown-header">
                        <div class="user-avatar-large">${initials}</div>
                        <div>
                            <strong>${userName}</strong>
                            <small>${localStorage.getItem('drmartinez_userEmail')}</small>
                        </div>
                    </div>
                    <ul class="user-dropdown-list">
                        ${adminOption}
                        <li><a class="dropdown-item" href="perfil.html"><i class="bi bi-person me-2"></i>Mi Perfil</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#" id="btnLogout"><i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión</a></li>
                    </ul>
                </div>
            </div>
        `;
        
        const btnMenu = document.getElementById('btnUserMenu');
        const dropdown = document.getElementById('userDropdownMenu');
        
        btnMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !btnMenu.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
        
        document.getElementById('btnLogout').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('drmartinez_isLoggedIn');
            localStorage.removeItem('drmartinez_userRole');
            localStorage.removeItem('drmartinez_userName');
            localStorage.removeItem('drmartinez_userEmail');
            window.location.reload();
        });
        
        // Actualizar formulario de comentario
        document.getElementById('userAvatar').textContent = initials;
        document.getElementById('userName').textContent = userName;
    } else {
        navbarActions.innerHTML = `
            <a href="login.html" class="btn btn-outline-custom">
                <i class="bi bi-person-circle me-1"></i>Iniciar sesión
            </a>
        `;
        
        document.getElementById('comentarioForm').style.display = 'none';
        document.getElementById('loginRequired').style.display = 'block';
    }
}

// ============================================
// TOAST
// ============================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${type} border-0 show`;
    
    const icon = type === 'success' ? 'check-circle-fill' : type === 'warning' ? 'exclamation-triangle-fill' : 'info-circle-fill';
    
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
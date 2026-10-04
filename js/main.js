/* =========================================================
   MAIN.JS - Interacciones y animaciones
   ========================================================= */

(function() {
    'use strict';

    // ============================================
    // CONFIGURACIÓN
    // ============================================
    const whatsappNumber = ""; // Configurar cuando se tenga el número

    // ============================================
    // 1. LOADER INICIAL
    // ============================================
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('pageLoader');
            if (loader) {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 600);
            }
        }, 2000);
    });

    // ============================================
    // 2. SCROLL PROGRESS BAR
    // ============================================
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        if (!scrollProgress) return;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // ============================================
    // 3. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('mainNavbar');

    function handleNavbarScroll() {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // ============================================
    // 4. MENÚ MÓVIL - CERRAR AL HACER CLIC
    // ============================================
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarContent');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });

    // ============================================
    // 5. NAVEGACIÓN ACTIVA SEGÚN SECCIÓN
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.navbar-nav a[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ============================================
    // 6. REVEAL ANIMATIONS (IntersectionObserver)
    // ============================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, parseInt(delay));
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // ============================================
    // 7. CONTADORES ANIMADOS
    // ============================================
    const counterElements = document.querySelectorAll('[data-count]');
    const countedSet = new Set();

    function animateCounter(element) {
        if (countedSet.has(element)) return;

        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            countedSet.add(element);
            const target = parseInt(element.getAttribute('data-count'), 10);
            let current = 0;
            const duration = 2000;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, stepTime);
        }
    }

    function checkCounters() {
        counterElements.forEach(animateCounter);
    }

    window.addEventListener('scroll', checkCounters, { passive: true });
    window.addEventListener('load', checkCounters);

    // ============================================
    // 8. TILT EFFECT EN CARDS
    // ============================================
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;

            // Mover glow
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.left = `${x - rect.width}px`;
                glow.style.top = `${y - rect.height}px`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ============================================
    // 9. WHATSAPP FLOTANTE
    // ============================================
    function setupWhatsApp() {
        const waFloat = document.getElementById('whatsappFloat');
        const waCta = document.getElementById('ctaWhatsapp');

        if (!whatsappNumber) {
            [waFloat, waCta].forEach(el => {
                if (el) {
                    el.addEventListener('click', (e) => {
                        e.preventDefault();
                        alert('Número de WhatsApp próximamente disponible.');
                    });
                }
            });
            return;
        }

        const message = encodeURIComponent('Hola, me gustaría solicitar una cita con el Dr. José Ignacio Martínez Suárez.');
        const url = `https://wa.me/${whatsappNumber}?text=${message}`;

        if (waFloat) waFloat.href = url;
        if (waCta) waCta.href = url;
    }

    setupWhatsApp();

    // ============================================
    // 10. LIGHTBOX GALERÍA
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.dataset.img;
            if (lightboxImage && lightboxModal) {
                lightboxImage.src = imgSrc;
                const modal = new bootstrap.Modal(lightboxModal);
                modal.show();
            }
        });
    });

    // ============================================
    // 11. BACK TO TOP
    // ============================================
    const backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // 12. FORMULARIO DE CONTACTO
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                return;
            }

            // Validación personalizada del teléfono
            const telefono = document.getElementById('telefono').value.trim();
            const telefonoRegex = /^[0-9+\-\s()]{7,20}$/;
            if (!telefonoRegex.test(telefono)) {
                document.getElementById('telefono').setCustomValidity('Teléfono inválido');
                contactForm.classList.add('was-validated');
                return;
            }

            // Mostrar mensaje de éxito
            if (formSuccess) {
                formSuccess.hidden = false;
                contactForm.reset();
                contactForm.classList.remove('was-validated');

                setTimeout(() => {
                    formSuccess.hidden = true;
                }, 6000);

                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        // Limpiar error personalizado
        const telefonoInput = document.getElementById('telefono');
        if (telefonoInput) {
            telefonoInput.addEventListener('input', () => {
                telefonoInput.setCustomValidity('');
            });
        }
    }

    // ============================================
    // 13. SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================
    // 14. PARALLAX SUAVE EN HERO
    // ============================================
    const heroOrbs = document.querySelectorAll('.hero-gradient-orb');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < 800) {
            heroOrbs.forEach((orb, index) => {
                const speed = 0.1 + (index * 0.05);
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    }, { passive: true });

    // ============================================
    // 15. EFECTO MOUSE EN HERO
    // ============================================
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const floatElements = heroSection.querySelectorAll('.hero-float-element');
            floatElements.forEach((el, index) => {
                const speed = (index + 1) * 10;
                el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }

    // ============================================
    // 16. EFECTO DE TYPING EN HERO (opcional)
    // ============================================
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease';
            heroTitle.style.opacity = '1';
        }, 500);
    }


    // ============================================
    // 17. CONSOLE LOG
    // ============================================
    console.log('%c Portafolio Dr. José Ignacio Martínez Suárez ',
        'background: linear-gradient(135deg, #0B3954, #087E8B); color: #fff; padding: 8px 16px; border-radius: 6px; font-weight: bold; font-size: 14px;');
    console.log('%c Diseño visual y animado ',
        'color: #087E8B; font-weight: bold;');

})();
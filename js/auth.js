
async function verificarAutenticacion() {
    const token = sessionStorage.getItem('accessToken');
    // Si no hay token, redirigir al login.
    if (!token) {
        if (!window.location.pathname.endsWith('login.html')) {
            window.location.href = 'login.html';
        }
        return;
    }
    // Si hay token, configurar la página autenticada (sin validar contra la API)
    configurarPaginaAutenticada(sessionStorage.getItem('username') || 'Usuario');
    document.body.style.visibility = 'visible';
}

/**
 * Construye los elementos dinámicos de la página, como el menú y el saludo.
 * @param {string} username - El nombre del usuario para mostrar.
 */
function configurarPaginaAutenticada(username) {
    document.body.style.visibility = 'visible'; // Hacemos visible el body
    
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        welcomeMessage.textContent = `¡Hola, ${username}!`;
    }

    const adminNavLinks = document.getElementById('admin-nav-links');
    if (adminNavLinks) {
        const currentPage = window.location.pathname.split('/').pop();
        const links = [
            { href: 'dashboard.html', text: 'Dashboard', icon: 'fa-tachometer-alt' },
            { href: 'dashboardSalones.html', text: 'Salones', icon: 'fa-place-of-worship' },
            { href: 'dashboardServicios.html', text: 'Servicios', icon: 'fa-concierge-bell' },
            { href: 'dashboardUsuarios.html', text: 'Usuarios', icon: 'fa-users' },
            { href: 'dashboardReservas.html', text: 'Reservas', icon: 'fa-calendar-check' }
        ];

        let navHTML = '';
        links.forEach(link => {
            const isActive = currentPage === link.href ? 'active' : '';
            navHTML += `<li class="nav-item"><a class="nav-link px-3 py-2 rounded-5 ${isActive}" href="${link.href}"><i class="fas ${link.icon} me-2"></i>${link.text}</a></li>`;
        });
        
        navHTML += `<li class="nav-item ms-lg-3"><a class="nav-link px-3 py-2 rounded-5 btn btn-outline-danger text-white" href="#" id="logout-btn"><i class="fas fa-sign-out-alt me-2"></i>Cerrar Sesión</a></li>`;
            
        adminNavLinks.innerHTML = navHTML;
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
    }
}

// Para evitar el "parpadeo", ocultamos el body inicialmente con CSS
// y solo lo mostramos cuando la autenticación es exitosa.
// Si no hay token, la redirección es casi instantánea.
document.body.style.visibility = 'hidden';
verificarAutenticacion();
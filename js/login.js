document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessageDiv = document.getElementById('error-message');

    // Credenciales para el Logueo del administraddor 
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = '1234';

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const username = usernameInput.value;
            const password = passwordInput.value;

            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                
                sessionStorage.setItem('isAdminLoggedIn', 'true'); 
                window.location.href = 'adminAltaSalon.html';
            } else {
                // aca es el mensaje de error cuando los credenciales son incorrectas
                errorMessageDiv.textContent = 'Usuario o contraseña incorrectos.';
                errorMessageDiv.classList.remove('d-none'); 
            }
        });
    }
});
 

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessageDiv = document.getElementById('error-message');
    const submitButton = loginForm.querySelector('button[type="submit"]');
    const spinner = submitButton.querySelector('.spinner-border');
    const loginText = submitButton.querySelector('.login-text');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        errorMessageDiv.classList.add('d-none');
        spinner.classList.remove('d-none');
        loginText.textContent = 'Ingresando...';
        submitButton.disabled = true;

        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: usernameInput.value,
                    password: passwordInput.value,
                    expiresInMins: 60, // El token durará 60 minutos
                })
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('accessToken', data.token);
                sessionStorage.setItem('username', data.username);
                window.location.href = 'dashboard.html';
            } else {
                errorMessageDiv.textContent = data.message || 'Error: Credenciales inválidas.';
                errorMessageDiv.classList.remove('d-none');
            }
        } catch (error) {
            errorMessageDiv.textContent = 'Error de conexión. Por favor, intente más tarde.';
            errorMessageDiv.classList.remove('d-none');
        } finally {
            spinner.classList.add('d-none');
            loginText.textContent = 'Iniciar Sesión';
            submitButton.disabled = false;
        }
    });
});
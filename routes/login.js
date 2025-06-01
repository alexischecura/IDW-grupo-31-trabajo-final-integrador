export function renderLogin(container) {
    container.innerHTML = `
      <div class="login-container">
        <div class="login-icon" aria-label="Icono de administrador" title="Administrador">🎈</div>
        <h2>Ingreso Administrador</h2>
        <form id="loginForm">
          <input type="text" id="username" placeholder="Usuario" required autocomplete="username" />
          <input type="password" id="password" placeholder="Contraseña" required autocomplete="current-password" />
          <button type="submit">Ingresar</button>
        </form>
        <p id="loginError" class="error-msg" role="alert" aria-live="assertive"></p>
      </div>
    `;
  
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
  
      const usuario = document.getElementById('username').value.trim();
      const contrasena = document.getElementById('password').value.trim();
  
      if (usuario === 'admin' && contrasena === 'admin123') {
        localStorage.setItem('auth', 'true');
        window.location.hash = '#/admin';
      } else {
        const errorElem = document.getElementById('loginError');
        errorElem.textContent = 'Usuario o contraseña incorrectos';
        errorElem.focus();
      }
    });
  }  
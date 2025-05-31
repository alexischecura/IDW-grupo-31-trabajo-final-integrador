export function renderLogin(container) {
    container.innerHTML = `
      <style>
        .login-container {
          max-width: 350px;
          margin: 4rem auto;
          padding: 2rem 2.5rem;
          background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .login-container h2 {
          margin-bottom: 1rem;
          color: #333;
          font-weight: 700;
          font-size: 1.8rem;
          letter-spacing: 1.5px;
        }
        .login-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        input[type="text"],
        input[type="password"] {
          padding: 0.7rem 1rem;
          border: 1.8px solid #aaa;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        input[type="text"]:focus,
        input[type="password"]:focus {
          border-color: #667eea;
          outline: none;
          box-shadow: 0 0 8px rgba(102,126,234, 0.5);
        }
        button {
          padding: 0.75rem;
          background-color: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.25s ease;
        }
        button:hover {
          background-color: #5563c1;
        }
        .error-msg {
          margin-top: 0.8rem;
          color: #d93025;
          font-weight: 600;
          font-size: 0.9rem;
          min-height: 1.2rem;
        }
      </style>
  
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
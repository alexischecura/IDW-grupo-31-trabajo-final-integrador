import { renderHome } from './routes/home.js';
import { renderContacto } from './routes/contacto.js';
import { renderNotFound } from './routes/notfound.js';
import { renderNosotros } from './routes/nosotros.js';
import { renderModal } from './routes/modal.js';

const app = document.getElementById('app');
const navbar = document.getElementById('navbar');

let dataGlobal = [];

function getPath() {
  return window.location.hash.slice(2) || '';
}

async function fetchData() {
  try {
    const res = await fetch('./data/salones.json');
    if (!res.ok) throw new Error('Error cargando los datos');

    dataGlobal = await res.json();

    const guardados = JSON.parse(localStorage.getItem('eventos'));
    if (guardados && Array.isArray(guardados)) {
      dataGlobal = guardados;
    }

    setupNavbar();
    route();
  } catch (error) {
    app.innerHTML = `<p>Error cargando datos: ${error.message}</p>`;
  }
}

function ocultarTodo() {
  const secciones = document.querySelectorAll('[data-section]');
  secciones.forEach(section => {
    section.style.display = 'none';
  });
}

function mostrarSolo(id) {
  ocultarTodo();
  const target = document.querySelector(`[data-section="${id}"]`);
  if (target) {
    target.style.display = 'block';
  }
}

function setupNavbar() {
  navbar.innerHTML = `
    <div class="navbar-container">
      <div class="navbar-left">
        <span class="logo" id="logo">🎈 MiSalón</span>
      </div>
      <div class="navbar-center">
        <input type="text" id="searchInput" placeholder="Buscar..." />
        <button data-filtro="todos">Todos</button>
        <button data-filtro="salon">Salones</button>
        <button data-filtro="servicio">Servicios</button>
        <button data-filtro="contacto">Contacto</button>
        <button data-filtro="nosotros">Nosotros</button>
      </div>
      <div class="navbar-right">
        <button id="loginBtn" title="Iniciar sesión">🔒</button>
      </div>
    </div>
  `;

  navbar.querySelector('#logo').addEventListener('click', () => {
    window.location.hash = '#/';
  });

  navbar.querySelectorAll('button[data-filtro]').forEach(btn => {
    btn.addEventListener('click', () => {
      const filtro = btn.getAttribute('data-filtro');
      let nuevoHash = filtro === 'todos' ? '#/' : `#/${filtro}`;

      if (filtro === 'contacto' || filtro === 'nosotros') {
        nuevoHash = `#/${filtro}`;
      }

      if (window.location.hash === nuevoHash) {
        route(filtro === 'todos' ? '' : filtro);
      } else {
        window.location.hash = nuevoHash;
      }

      if (filtro !== 'contacto' && filtro !== 'nosotros') {
        navbar.querySelector('#searchInput').value = '';
      }
    });
  });

  navbar.querySelector('#searchInput').addEventListener('input', (e) => {
    const texto = e.target.value.trim().toLowerCase();
    if (texto === '') {
      const path = getPath();
      if (path === 'contacto' || path === 'nosotros') {
        route();
      } else {
        route(path || 'todos');
      }
    } else {
      filtrarTarjetas(texto);
    }
  });

  navbar.querySelector('#loginBtn').addEventListener('click', () => {
    window.location.hash = '#/login';
  });
}

function filtrarTarjetas(texto) {
  const grid = app.querySelector('.grid-container');
  if (!grid) return;

  const cards = Array.from(grid.children);
  let hayVisible = false;

  cards.forEach(card => {
    const nombre = card.querySelector('h5').textContent.toLowerCase();
    const descripcion = card.querySelector('p').textContent.toLowerCase();
    if (nombre.includes(texto) || descripcion.includes(texto)) {
      card.style.display = 'block';
      hayVisible = true;
    } else {
      card.style.display = 'none';
    }
  });

  const mensaje = app.querySelector('.sin-resultados');
  if (!hayVisible) {
    if (!mensaje) {
      const nuevo = document.createElement('p');
      nuevo.className = 'sin-resultados';
      nuevo.textContent = `No se encontraron resultados para "${texto}".`;
      app.appendChild(nuevo);
    }
  } else {
    if (mensaje) mensaje.remove();
  }
}

async function route(path = null) {
  if (!path) path = getPath();
  console.log('Ruta detectada:', path);

  if (path === '' || path === 'todos') {
    mostrarSolo('inicio');
    await renderWithFade(renderHome, app, dataGlobal, 'todos');
  } else if (path === 'salon' || path === 'servicio') {
    mostrarSolo('inicio');
    await renderWithFade(renderHome, app, dataGlobal, path);
  } else if (path.startsWith('detalles/')) {
    mostrarSolo('inicio');
    const id = parseInt(path.split('/')[1]);
    const item = dataGlobal.find(d => d.id === id);
    if (item) {
      renderModal(item);
    } else {
      await renderWithFade(renderNotFound, app);
    }
  } else if (path.startsWith('contacto')) {
    mostrarSolo('contacto');
    let queryParams = {};
    if (path.includes('?')) {
      const queryString = path.split('?')[1];
      queryParams = Object.fromEntries(new URLSearchParams(queryString));
    }
    await renderWithFade(renderContacto, app, queryParams);
  } else if (path === 'nosotros') {
    mostrarSolo('nosotros');
    await renderWithFade(renderNosotros, app);
  } else if (path === 'login') {
    const { renderLogin } = await import('./routes/login.js');
    await renderWithFade(renderLogin, app);
  } else if (path === 'admin') {
    const { renderAdminPanel } = await import('./routes/admin.js');
    const auth = localStorage.getItem('auth') === 'true';
    if (auth) {
      await renderWithFade(renderAdminPanel, app, dataGlobal);
    } else {
      window.location.hash = '#/login';
    }
  } else {
    await renderWithFade(renderNotFound, app);
  }
}

function fadeOut(element) {
  return new Promise(resolve => {
    element.classList.add('fade-exit');
    requestAnimationFrame(() => {
      element.classList.add('fade-exit-active');
      element.addEventListener('transitionend', () => {
        element.classList.remove('fade-exit', 'fade-exit-active');
        resolve();
      }, { once: true });
    });
  });
}

function fadeIn(element) {
  return new Promise(resolve => {
    element.classList.add('fade-enter');
    requestAnimationFrame(() => {
      element.classList.add('fade-enter-active');
      element.addEventListener('transitionend', () => {
        element.classList.remove('fade-enter', 'fade-enter-active');
        resolve();
      }, { once: true });
    });
  });
}

async function renderWithFade(renderFn, container, ...args) {
  await fadeOut(container);
  container.innerHTML = '';
  await renderFn(container, ...args);
  await fadeIn(container);
}

window.addEventListener('hashchange', () => route());

fetchData();
export function renderAdminPanel(container, data) {
    container.innerHTML = `
      <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0">Panel de Administración</h2>
          <button id="logout" class="btn btn-outline-danger">Cerrar sesión</button>
        </div>
  
        <form id="addForm" class="row g-3 mb-4">
          <div class="col-md-6">
            <input type="text" id="nombre" class="form-control" placeholder="Nombre del evento" required />
          </div>
          <div class="col-md-6">
            <input type="text" id="descripcion" class="form-control" placeholder="Descripción" required />
          </div>
          <div class="col-md-6">
            <input type="text" id="imagen" placeholder="URL de imagen" class="form-control mb-2" required />
            <div class="mb-3 text-center">
              <img id="preview" src="" alt="Vista previa" class="img-fluid rounded shadow" style="max-height: 200px; display: none;" />
            </div>
          </div>
          <div class="col-md-4">
            <select id="categoria" class="form-select" required>
              <option value="" disabled selected>Categoría</option>
              <option value="salon">Salón</option>
              <option value="servicio">Servicio</option>
            </select>
          </div>
          <div class="col-md-2 d-grid">
            <button type="submit" class="btn btn-primary">Agregar</button>
          </div>
        </form>
  
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Eventos actuales</h5>
          </div>
          <ul class="list-group list-group-flush" id="listaEventos"></ul>
        </div>
      </div>
    `;
  
    const lista = container.querySelector('#listaEventos');
  
    const mostrarEventos = () => {
        lista.innerHTML = '';
        data.forEach((item, index) => {
          const li = document.createElement('li');
          li.className = 'list-group-item';
      
          li.innerHTML = `
            <div class="d-flex align-items-center gap-3">
              <img src="${item.imagen || 'https://via.placeholder.com/100'}" alt="${item.nombre}" class="rounded shadow" style="width: 100px; height: 100px; object-fit: cover;">
              <div class="flex-grow-1">
                <h5 class="mb-1">${item.nombre}</h5>
                <p class="mb-1 text-muted small">${item.descripcion}</p>
                <span class="badge bg-secondary text-capitalize">${item.tipo}</span>
              </div>
              <button class="btn btn-sm btn-danger ms-3" data-index="${index}">Eliminar</button>
            </div>
          `;
          lista.appendChild(li);
        });
      
        lista.querySelectorAll('button[data-index]').forEach(btn => {
          btn.addEventListener('click', () => {
            const index = Number(btn.getAttribute('data-index'));
            data.splice(index, 1);
            localStorage.setItem('eventos', JSON.stringify(data));
            mostrarEventos();
          });
        });
      };      
  
    container.querySelector('#addForm').addEventListener('submit', e => {
      e.preventDefault();
      const nuevo = {
        id: Date.now(),
        nombre: container.querySelector('#nombre').value.trim(),
        descripcion: container.querySelector('#descripcion').value.trim(),
        imagen: container.querySelector('#imagen').value.trim(),
        categoria: container.querySelector('#categoria').value,
      };
      data.push(nuevo);
      localStorage.setItem('eventos', JSON.stringify(data));
      mostrarEventos();
      e.target.reset();
      previewImg.src = '';
      previewImg.style.display = 'none';
    });
  
    container.querySelector('#logout').addEventListener('click', () => {
      localStorage.removeItem('auth');
      window.location.hash = '#/';
    });
  
    const imagenInput = container.querySelector('#imagen');
    const previewImg = container.querySelector('#preview');
    imagenInput.addEventListener('input', () => {
      const url = imagenInput.value.trim();
      if (url) {
        previewImg.src = url;
        previewImg.style.display = 'block';
      } else {
        previewImg.style.display = 'none';
      }
    });
  
    mostrarEventos();
  }
  
export function renderAdminPanel(container, data) {
  let editIndex = null;

  container.innerHTML = `
    <div class="admin-container">
  <div class="admin-header">
    <h2>Panel de Administración</h2>
    <button id="logout" class="btn btn-danger-outline">Cerrar sesión</button>
  </div>

  <div class="admin-card">
    <div class="admin-card-header bg-primary text-white">
      <h5>Agregar nuevo evento o servicio</h5>
    </div>
    <div class="admin-card-body">
      <form id="addForm" class="form-grid">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" placeholder="Nombre del evento" required />
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <input type="text" id="descripcion" placeholder="Descripción" required />
        </div>

        <div class="form-group">
          <label for="imagen">Imagen (URL)</label>
          <input type="text" id="imagen" placeholder="URL de imagen" required />
          <div class="img-preview" style="display: none;">
            <img id="preview" src="" alt="Vista previa" />
          </div>
        </div>

        <div class="form-group">
          <label for="tipo">Tipo</label>
          <select id="tipo" required>
            <option value="" disabled selected>Seleccionar tipo</option>
            <option value="salon">Salón</option>
            <option value="servicio">Servicio</option>
          </select>
        </div>

        <div class="form-group align-bottom">
          <button type="submit" class="btn btn-success">Agregar</button>
        </div>
      </form>
    </div>
  </div>

  <div class="admin-card">
    <div class="admin-card-header">
      <h5>Eventos actuales</h5>
    </div>
    <ul class="event-list" id="listaEventos"></ul>
  </div>
</div>

  `;

  const form = container.querySelector('#addForm');
  const nombre = container.querySelector('#nombre');
  const descripcion = container.querySelector('#descripcion');
  const imagen = container.querySelector('#imagen');
  const tipo = container.querySelector('#tipo');
  const previewImg = container.querySelector('#preview');
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
          <div class="d-flex flex-column gap-2">
            <button class="btn btn-sm btn-warning btn-editar" data-index="${index}">Editar</button>
            <button class="btn btn-sm btn-danger btn-eliminar" data-index="${index}">Eliminar</button>
          </div>
        </div>
      `;
      lista.appendChild(li);
    });

    lista.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = Number(btn.dataset.index);
        if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
          data.splice(index, 1);
          localStorage.setItem('eventos', JSON.stringify(data));
          mostrarEventos();
        }
      });
    });

    lista.querySelectorAll('.btn-editar').forEach(btn => {
      btn.addEventListener('click', () => {
        editIndex = Number(btn.dataset.index);
        const evento = data[editIndex];
        nombre.value = evento.nombre;
        descripcion.value = evento.descripcion;
        imagen.value = evento.imagen;
        tipo.value = evento.tipo;
        previewImg.src = evento.imagen;
        previewImg.style.display = 'block';
        form.querySelector('button[type="submit"]').textContent = editIndex !== null ? 'Actualizar' : 'Agregar';
      });
    });
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nuevoEvento = {
      id: editIndex !== null ? data[editIndex].id : Date.now(),
      nombre: nombre.value.trim(),
      descripcion: descripcion.value.trim(),
      imagen: imagen.value.trim(),
      tipo: tipo.value,
    };

    if (editIndex !== null) {
      data[editIndex] = nuevoEvento;
      editIndex = null;
    } else {
      data.push(nuevoEvento);
    }

    localStorage.setItem('eventos', JSON.stringify(data));
    form.reset();
    previewImg.src = '';
    previewImg.style.display = 'none';
    form.querySelector('button[type="submit"]').textContent = 'Agregar';
    mostrarEventos();
  });

  imagen.addEventListener('input', () => {
    const url = imagen.value.trim();
    previewImg.src = url;
    previewImg.style.display = url ? 'block' : 'none';
  });

  container.querySelector('#logout').addEventListener('click', () => {
    localStorage.removeItem('auth');
    window.location.hash = '#/';
  });

  mostrarEventos();
}

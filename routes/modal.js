export function renderModal(item) {
  console.log('renderModal llamado para:', item.nombre);
  const modal = document.createElement('div');
  modal.className = 'custom-modal';

  modal.innerHTML = `
    <div class="custom-modal-content container">
      <span class="modal-close">&times;</span>
      <div class="row">
        <!-- Imagen -->
        <div class="col-md-6 mb-3 mb-md-0 text-center">
          <img src="${item.imagen}" alt="${item.nombre}" class="img-fluid rounded detalle-img" style="max-height: 300px; object-fit: cover;" />
        </div>
        <!-- Información -->
        <div class="col-md-6">
          <h4 class="mb-3">${item.nombre}</h4>
          <p><strong>Tipo:</strong> ${item.tipo}</p>
          <p>${item.descripcion}</p>
          <p><strong>Capacidad:</strong> ${item.capacidad || 'No especificado'}</p>
          <p><strong>Precio:</strong> ${item.precio ? '$' + item.precio : 'Consultar'}</p>
          <button class="btn btn-primary btn-solicitar mt-3">
            Solicitar información <i class="fas fa-envelope ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  console.log('Modal añadido al DOM');

  modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  modal.querySelector('.btn-solicitar').addEventListener('click', () => {
    const mensaje = encodeURIComponent(`Hola, me gustaría recibir información sobre "${item.nombre}".`);
    window.location.hash = `#/contacto?mensaje=${mensaje}`;
    modal.remove();
  });
}
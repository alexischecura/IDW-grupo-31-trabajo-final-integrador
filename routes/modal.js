export function renderModal(item) {
    console.log('renderModal llamado para:', item.nombre);
    const modal = document.createElement('div');
    modal.className = 'modal';
  
    modal.innerHTML = `
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>${item.nombre}</h2>
        <img src="${item.imagen}" alt="${item.nombre}" class="detalle-img" />
        <p><strong>Tipo:</strong> ${item.tipo}</p>
        <p>${item.descripcion}</p>
        <p><strong>Capacidad:</strong> ${item.capacidad || 'No especificado'}</p>
        <p><strong>Precio:</strong> ${item.precio ? '$' + item.precio : 'Consultar'}</p>
        <button class="btn-solicitar">Solicitar información</button>
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
  
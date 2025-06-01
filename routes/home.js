import { renderModal } from './modal.js'

export function renderHome(container, data, filtro = 'todos') {
  let titulo = 'Salones y Servicios';
  if (filtro === 'testimonio') titulo = 'Testimonios';
  else if (filtro === 'salon') titulo = 'Salones';
  else if (filtro === 'servicio') titulo = 'Servicios';

  container.innerHTML = `<h2>${titulo}</h2>`;

  const filtrados = filtro === 'todos' ? data : data.filter(item => item.tipo === filtro);

  if (filtrados.length === 0) {
    container.innerHTML += `<p>No se encontraron resultados para "${filtro}".</p>`;
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'grid-container';

  filtrados.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    card.setAttribute('data-tipo', item.tipo);

    card.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}" class="card-img" />
      <h5>${item.nombre}</h5>
      <p>${item.descripcion.slice(0, 60)}...</p>
      <button class="btn-detalle">Ver detalle</button>
    `;

    card.querySelector('.btn-detalle').addEventListener('click', () => {
      renderModal(item);
    });

    grid.appendChild(card);
  });

  container.appendChild(grid);
}
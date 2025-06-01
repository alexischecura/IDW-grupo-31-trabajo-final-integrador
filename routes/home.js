import { renderModal } from './modal.js';

export function renderHome(container, data, filtro = 'todos') {

  const carruselHTML = `
<div id="carouselEventos" class="carousel slide mb-4" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselEventos" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselEventos" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselEventos" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner rounded">
    <div class="carousel-item active">
      <img src="https://kidiverso.mx/wp-content/uploads/2023/03/kidiverso-salon-fiestas-infantiles.png" class="d-block w-100" alt="Kidiverso">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
        <h5>Fiestas temáticas</h5>
        <p>Aquí es donde la magia sucede, ven y crea recuerdos.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://www.tufieston.com/dynamic/gallery/1936/salon-fiestas-infantiles-mayitos-3.jpg" class="d-block w-100" alt="Mayitos 3">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
        <h5>Servicios personalizados</h5>
        <p>Haz que cada detalle sea especial.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://www.momadvisor.com.mx/wp-content/uploads/2018/11/14312_laberinto-magico-salon-de-fiestas-infantiles.jpg" class="d-block w-100" alt="Laberinto Mágico">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
        <h5>Momentos inolvidables</h5>
        <p>Con nosotros, tu evento es único.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://rivadavia.com.ar/media/k2/items/cache/7776e9668d7192450d67b1d14410f108_L.webp" class="d-block w-100" alt="Laberinto Mágico">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
        <h5>Explora nuestros salones</h5>
        <p>Haz de tus fiestas un momento inolvidables.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://www.tufieston.com/dynamic/gallery/1936/salon-fiestas-infantiles-mayitos-2.jpg" class="d-block w-100" alt="Laberinto Mágico">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
        <h5>Diversión asegurada</h5>
        <p>Ven y disfruta de un día maravilloso.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselEventos" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Anterior</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselEventos" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Siguiente</span>
  </button>
</div>
`;

  let titulo = 'Salones y Servicios';
  if (filtro === 'testimonio') titulo = 'Testimonios';
  else if (filtro === 'salon') titulo = 'Salones';
  else if (filtro === 'servicio') titulo = 'Servicios';

  container.innerHTML = carruselHTML + `
  <h2 class="display-5 fw-bold mb-4 position-relative pb-2">
    ${titulo}
    <span class="position-absolute bottom-0 start-0 bg-primary rounded" style="height: 4px; width: 80px;"></span>
  </h2>
`;

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
      <p>${item.descripcion.slice(0, 30)}...</p>
      <button class="btn-detalle">Ver detalle</button>
    `;

    card.querySelector('.btn-detalle').addEventListener('click', () => {
      renderModal(item);
    });

    grid.appendChild(card);
  });

  container.appendChild(grid);
}
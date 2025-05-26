export function renderSalonesDesdeLocalStorage() {
  const container = document.querySelector(".container-salones");
  const salones = JSON.parse(localStorage.getItem("salones")) || [];

  if (!container) return;

  const row = document.createElement("div");
  row.className = "row g-4";

  salones.forEach((salon) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";

    col.innerHTML = `
      <div class="shadow-sm border-0 h-100 overflow-hidden transition-all card">
        <img src="${salon.imagen}" class="card-img-top object-fit-cover" style="height: 200px;" alt="${salon.nombre}" loading="lazy">
        <div class="d-flex flex-column text-center card-body">
          <h5 class="card-title fs-4">${salon.nombre}</h5>
          <p class="mb-2 text-muted">${salon.direccion}</p>
          <p class="mb-3 card-text">${salon.descripcion}</p>
          <p class="mb-3 text-primary fw-bold fs-5">$${salon.precio.toLocaleString()} por evento</p>
          <a href="#" class="align-self-center px-4 py-2 rounded-pill btn btn-primary">Reservar</a>
        </div>
      </div>
    `;

    row.appendChild(col);
  });

  container.innerHTML = "";
  container.appendChild(row);
}

export function renderFooter(container) {
    container.innerHTML = `
      <footer class="bg-light text-dark pt-5 pb-4 mt-5 border-top border-3 border-primary-subtle">
        <div class="container">
          <div class="row">
            <div class="col-md-3 mb-4">
              <div class="navbar-left mb-2">
                <span class="logo fs-4 fw-bold text-primary">🎈 MiSalón</span>
              </div>
              <p class="small">Creamos momentos mágicos para los más pequeños.</p>
            </div>
  
            <div class="col-md-3 mb-4">
              <h6 class="fw-bold mb-3 text-primary">Navegación</h6>
              <ul class="list-unstyled">
                <li><button class="btn btn-link text-dark p-0 enlace-menu" data-target="home">Inicio</button></li>
                <li><button class="btn btn-link text-dark p-0 enlace-menu" data-target="nosotros">Nosotros</button></li>
                <li><button class="btn btn-link text-dark p-0 enlace-menu" data-target="contacto">Contacto</button></li>
              </ul>
            </div>
  
            <div class="col-md-3 mb-4">
              <h6 class="fw-bold mb-3 text-primary">Contacto</h6>
              <p class="mb-1"><i class="fas fa-map-marker-alt me-2 text-primary"></i>Av. Siempre Viva 742</p>
              <p class="mb-1"><i class="fas fa-phone me-2 text-primary"></i>+54 11 1234-5678</p>
              <p class="mb-0"><i class="fas fa-envelope me-2 text-primary"></i>info@idwsa.com</p>
            </div>
  
            <div class="col-md-3">
              <h6 class="fw-bold mb-3 text-primary">Seguinos</h6>
              <div class="d-flex mb-3 fs-5">
                <a href="#" class="text-primary me-3"><i class="fab fa-facebook"></i></a>
                <a href="#" class="text-danger me-3"><i class="fab fa-instagram"></i></a>
                <a href="#" class="text-success"><i class="fab fa-whatsapp"></i></a>
              </div>
              <p class="small">Recibí nuestras novedades:</p>
              <form id="form-suscripcion" class="d-flex">
                <input type="email" class="form-control me-2" placeholder="Tu correo" required>
                <button type="submit" class="btn btn-outline-primary">Suscribir</button>
              </form>
            </div>
          </div>
  
          <hr>
          <div class="text-center">
            <p class="mb-0 small text-secondary">&copy; 2025 MiSalón - Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
  
      <div class="modal fade" id="modalSuscripcion" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 rounded-4 shadow">
            <div class="modal-header bg-primary text-white rounded-top-4">
              <h5 class="modal-title">🎉 ¡Gracias por suscribirte!</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-center p-4">
              <i class="fas fa-paper-plane fa-3x text-primary mb-3"></i>
              <p class="fs-5 mb-0">Muy pronto recibirás todas nuestras novedades y promociones.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  
    container.querySelectorAll('.enlace-menu').forEach(btn => {
      btn.addEventListener('click', () => {
        const destino = btn.getAttribute('data-target');
        window.location.hash = destino === 'home' ? '#/' : `#/${destino}`;
      });
    });
  
    const form = container.querySelector('#form-suscripcion');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const modal = new bootstrap.Modal(document.getElementById('modalSuscripcion'));
      modal.show();
      form.reset();
    });
  }  
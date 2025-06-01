export function renderContacto(container) {
  container.innerHTML = `
    <section class="contact container mt-4">
      <div class="row mb-5">
        <!-- Datos de contacto -->
        <div class="col-md-6 mb-4">
          <h3 class="mb-3">Información de contacto</h3>
          <p><i class="fas fa-map-marker-alt me-2"></i>Av. Siempre Viva 742, Springfield</p>
          <p><i class="fas fa-phone me-2"></i>+54 11 1234-5678</p>
          <p><i class="fas fa-envelope me-2"></i>info@idwsa.com</p>
        </div>

        <!-- Mapa -->
        <div class="col-md-6 mb-4">
          <div class="map-container" style="border-radius:8px; overflow:hidden; width:100%; height:250px;">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.1234567890123!2d-58.381592684785!3d-34.60368458046068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca154e224aab%3A0x123456789abcdef0!2sAv.%20Siempre%20Viva%20742!5e0!3m2!1ses!2sar!4v1687859440850!5m2!1ses!2sar"
              width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>

      <!-- Formulario de contacto -->
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h2 class="section-title mb-4">Contáctanos</h2>
          <form id="contactForm" class="contact-form">
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre completo</label>
              <input type="text" id="nombre" name="nombre" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Correo electrónico</label>
              <input type="email" id="email" name="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="telefono" class="form-label">Teléfono (opcional)</label>
              <input type="tel" id="telefono" name="telefono" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="mensaje" class="form-label">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows="5" class="form-control" required></textarea>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-primary">
                Enviar mensaje <i class="fas fa-paper-plane ms-2"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;

  const params = new URLSearchParams(window.location.search);
  const mensaje = params.get('mensaje') || '';
  const textarea = container.querySelector('#mensaje');
  if (textarea) textarea.value = mensaje;

  const form = container.querySelector('#contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('¡Mensaje enviado! Gracias por contactarnos.');
    form.reset();
  });
}
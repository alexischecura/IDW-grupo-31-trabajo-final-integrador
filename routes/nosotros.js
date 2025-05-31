export function renderNosotros(container) {
    container.innerHTML = `
      <section class="about">
        <div class="container">
          <h2 class="section-title">Sobre Nosotros</h2>
          
          <div class="about-content d-flex flex-wrap align-items-center gap-4">
            <div class="about-text flex-grow-1">
              <h3>Nuestra Historia</h3>
              <p>Desde 2010, en <strong>IDW S.A</strong> nos especializamos en crear fiestas infantiles inolvidables. Lo que comenzó como un pequeño salón en el centro de la ciudad, hoy es una red de espacios temáticos en todo el país.</p>
              
              <h3>Misión</h3>
              <p>Convertir los sueños de los más pequeños en realidad, ofreciendo salones únicos y servicios personalizados que hacen de cada cumpleaños una experiencia mágica.</p>
              
              <h3>Valores</h3>
              <ul class="values-list list-unstyled">
                <li><i class="fas fa-check-circle text-primary me-2"></i>Creatividad e innovación</li>
                <li><i class="fas fa-check-circle text-primary me-2"></i>Seguridad garantizada</li>
                <li><i class="fas fa-check-circle text-primary me-2"></i>Atención personalizada</li>
              </ul>
            </div>
            
            <div class="about-image flex-shrink-0" style="max-width: 400px;">
              <img src="images/equipo.jpg" alt="Nuestro equipo" loading="lazy" class="img-fluid rounded shadow" />
            </div>
          </div>
          
          <div class="stats d-flex justify-content-around text-center mt-5">
            <div class="stat-item">
              <span class="stat-number fs-3 fw-bold">13+</span>
              <br>
              <span class="stat-label">Años de experiencia</span>
            </div>
            <div class="stat-item">
              <span class="stat-number fs-3 fw-bold">50+</span>
              <br>
              <span class="stat-label">Salones temáticos</span>
            </div>
            <div class="stat-item">
              <span class="stat-number fs-3 fw-bold">10,000+</span>
              <br>
              <span class="stat-label">Fiestas realizadas</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }
  
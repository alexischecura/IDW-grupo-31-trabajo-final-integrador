

import { obtenerSalones } from './salones.js';
import { obtenerServicios } from './servicios.js';

import { agregarPresupuesto, obtenerPresupuestos } from './presupuestos.js';

document.addEventListener('DOMContentLoaded', () => {
    const salonContainer = document.getElementById('salon-seleccionado-container');
    const serviciosContainer = document.getElementById('servicios-container');
    const valorTotalEl = document.getElementById('valor-total');
    const formPresupuesto = document.getElementById('formulario-presupuesto');
    const btnMostrarServicios = document.getElementById('btn-mostrar-servicios');

    const urlParams = new URLSearchParams(window.location.search);
    const salonId = parseInt(urlParams.get('salonId'));

    const todosLosSalones = obtenerSalones();
    const todosLosServicios = obtenerServicios();
    const salonSeleccionado = todosLosSalones.find(s => s.id === salonId);
    
    if (!salonSeleccionado) {
        document.querySelector('main .container').innerHTML = 
            '<div class="alert alert-danger">Error: Salón no encontrado. Por favor, <a href="index.html" class="alert-link">vuelva a la página de inicio</a> y seleccione un salón.</div>';
        return;
    }

    // Confeti animado (librería simple)
    function lanzarConfeti() {
        const confettiColors = ['#ff69b4', '#ffd700', '#00cfff', '#ff6347', '#7fff00'];
        for (let i = 0; i < 120; i++) {
            const conf = document.createElement('div');
            conf.className = 'confetti';
            conf.style.position = 'fixed';
            conf.style.zIndex = 9999;
            conf.style.width = '12px';
            conf.style.height = '12px';
            conf.style.borderRadius = '50%';
            conf.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            conf.style.left = Math.random() * 100 + 'vw';
            conf.style.top = '-20px';
            conf.style.opacity = 0.8;
            conf.style.transition = 'top 2.2s cubic-bezier(.23,1.01,.98,.68), opacity 2.2s';
            document.body.appendChild(conf);
            setTimeout(() => {
                conf.style.top = 100 + Math.random() * 20 + 'vh';
                conf.style.opacity = 0;
            }, 10);
            setTimeout(() => conf.remove(), 2300);
        }
    }

    function getSrcImgServicio(servicio) {
        if (!servicio.imagen) return 'https://placehold.co/60x60/cccccc/333333?text=No+Img';
        if (servicio.imagen.startsWith('data:image')) return servicio.imagen;
        if (servicio.imagen.startsWith('http://') || servicio.imagen.startsWith('https://')) return servicio.imagen;
        return `imageservicios/${servicio.imagen}`;
    }

    function renderizarSalon() {
        let srcImg = 'https://placehold.co/800x250/cccccc/333333?text=Sin+Imagen';
        if (salonSeleccionado.imagen) {
            if (salonSeleccionado.imagen.startsWith('data:image')) {
                srcImg = salonSeleccionado.imagen;
            } else if (salonSeleccionado.imagen.startsWith('http://') || salonSeleccionado.imagen.startsWith('https://')) {
                srcImg = salonSeleccionado.imagen;
            } else {
                srcImg = `images/${salonSeleccionado.imagen}`;
            }
        }
        salonContainer.innerHTML = `
            <img src="${srcImg}" class="card-img-top object-fit-cover" style="height: 250px;" alt="Imagen de ${salonSeleccionado.nombre}" onerror="this.onerror=null;this.src='https://placehold.co/800x250/cccccc/333333?text=Sin+Imagen';">
            <div class="card-body">
                <h4 class="card-title">${salonSeleccionado.nombre}</h4>
                <p class="card-text text-muted"><i class="fas fa-map-marker-alt me-2"></i>${salonSeleccionado.direccion}</p>
                <p class="card-text">${salonSeleccionado.descripcion}</p>
                <p class="card-text fs-5 fw-bold">Precio base: $${salonSeleccionado.precio.toLocaleString('es-AR')}</p>
            </div>`;
    }

    function renderizarServicios() {
        serviciosContainer.innerHTML = '';
        todosLosServicios.forEach(servicio => {
            const srcImg = getSrcImgServicio(servicio);
            serviciosContainer.innerHTML += `
                <label class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-3">
                        <img src="${srcImg}" alt="${servicio.nombre}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" onerror="this.onerror=null;this.src='https://placehold.co/60x60/cccccc/333333?text=No+Img';">
                        <div>
                            <h6 class="mb-1">${servicio.nombre}</h6>
                            <small class="text-muted">${servicio.descripcion}</small>
                        </div>
                    </div>
                    <div class="text-end">
                        <span class="fw-bold me-3">$${servicio.precio.toLocaleString('es-AR')}</span>
                        <input class="form-check-input" type="checkbox" value="${servicio.id}" data-precio="${servicio.precio}">
                    </div>
                </label>`;
        });
    }
    
    function actualizarTotal() {
        let total = salonSeleccionado.precio;
        document.querySelectorAll('#servicios-container input[type="checkbox"]:checked').forEach(checkbox => {
            total += parseFloat(checkbox.dataset.precio);
        });
        valorTotalEl.textContent = `$${total.toLocaleString('es-AR')}`;
    }

    btnMostrarServicios.addEventListener('click', () => {
        serviciosContainer.classList.toggle('d-none');
        const icono = btnMostrarServicios.querySelector('i');
        const isHidden = serviciosContainer.classList.contains('d-none');
        icono.className = isHidden ? 'fas fa-plus-circle me-2' : 'fas fa-minus-circle me-2';
    });
    
    // Mostrar modal de confirmación visual antes de guardar
    const modalConfirmacion = new bootstrap.Modal(document.getElementById('modalConfirmacionReserva'));
    const resumenReservaVisual = document.getElementById('resumen-reserva-visual');
    const btnConfirmarReservaFinal = document.getElementById('btn-confirmar-reserva-final');
    let datosReservaPendiente = null;

    formPresupuesto.addEventListener('submit', (event) => {
        event.preventDefault();
        const nombreApellido = document.getElementById('nombre-apellido').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const email = document.getElementById('email').value;
        const fechaEvento = document.getElementById('fecha-evento').value;
        const horaInicio = document.getElementById('hora-inicio').value;
        const horaFin = document.getElementById('hora-fin').value;
        const tematica = document.getElementById('tematica').value;
        if(!nombreApellido || !whatsapp || !email || !fechaEvento || !horaInicio || !horaFin || !tematica) {
            alert('Por favor, completá todos los campos del formulario para continuar.');
            return;
        }
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresá un correo electrónico válido.');
            return;
        }
        if (horaFin <= horaInicio) {
            alert('La hora de fin debe ser mayor que la hora de inicio.');
            return;
        }
        // Validar superposición de reservas
        const reservas = obtenerPresupuestos();
        const conflicto = reservas.some(r =>
            r.salon && r.salon.id === salonSeleccionado.id &&
            r.fechaEvento === fechaEvento &&
            ((horaInicio < r.horaFin && horaFin > r.horaInicio) || (horaInicio === r.horaInicio && horaFin === r.horaFin))
        );
        if (conflicto) {
            alert('¡El salón ya está reservado en ese horario! Por favor, elige otro horario.');
            return;
        }
        const serviciosSeleccionados = [];
        document.querySelectorAll('#servicios-container input[type="checkbox"]:checked').forEach(checkbox => {
            const servicio = todosLosServicios.find(s => s.id === parseInt(checkbox.value));
            if(servicio) serviciosSeleccionados.push(servicio);
        });
        const valorTotalFinal = parseFloat(valorTotalEl.textContent.replace(/\$|\./g, '').replace(',', '.'));
        datosReservaPendiente = {
            nombreApellido,
            whatsapp,
            email,
            fechaEvento,
            horaInicio,
            horaFin,
            tematica,
            salon: { id: salonSeleccionado.id, nombre: salonSeleccionado.nombre, precio: salonSeleccionado.precio, imagen: salonSeleccionado.imagen, direccion: salonSeleccionado.direccion, descripcion: salonSeleccionado.descripcion },
            servicios: serviciosSeleccionados,
            valorTotal: valorTotalFinal,
            fechaCreacion: new Date().toISOString()
        };
        // Renderizar resumen visual
        let srcImgSalon = 'https://placehold.co/120x120/cccccc/333333?text=No+Img';
        if (salonSeleccionado.imagen) {
            if (salonSeleccionado.imagen.startsWith('data:image')) srcImgSalon = salonSeleccionado.imagen;
            else if (salonSeleccionado.imagen.startsWith('http://') || salonSeleccionado.imagen.startsWith('https://')) srcImgSalon = salonSeleccionado.imagen;
            else srcImgSalon = `images/${salonSeleccionado.imagen}`;
        }
        resumenReservaVisual.innerHTML = `
          <div class="row g-4">
            <div class="col-md-4 text-center">
              <img src="${srcImgSalon}" alt="${salonSeleccionado.nombre}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 12px;" class="mb-2 shadow">
              <h5 class="fw-bold mt-2">${salonSeleccionado.nombre}</h5>
              <p class="text-muted small mb-1"><i class="fas fa-map-marker-alt me-2"></i>${salonSeleccionado.direccion}</p>
              <p class="small">${salonSeleccionado.descripcion}</p>
            </div>
            <div class="col-md-8">
              <h6 class="fw-bold mb-2">Servicios Seleccionados:</h6>
              <div class="row g-2">
                ${serviciosSeleccionados.length === 0 ? '<div class="col-12 text-muted">Sin servicios adicionales.</div>' :
                  serviciosSeleccionados.map(s => `
                    <div class="col-12 d-flex align-items-center gap-3 mb-2">
                      <img src="${getSrcImgServicio(s)}" alt="${s.nombre}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 8px;" onerror="this.onerror=null;this.src='https://placehold.co/48x48/cccccc/333333?text=No+Img';">
                      <div>
                        <div class="fw-bold">${s.nombre}</div>
                        <div class="text-muted small">$${s.precio.toLocaleString('es-AR')}</div>
                      </div>
                    </div>
                  `).join('')
                }
              </div>
              <hr>
              <div class="mb-2"><strong>Fecha del Evento:</strong> ${fechaEvento}</div>
              <div class="mb-2"><strong>Horario:</strong> ${horaInicio} - ${horaFin}</div>
              <div class="mb-2"><strong>Temática:</strong> ${tematica}</div>
              <div class="mb-2"><strong>Cliente:</strong> ${nombreApellido} <span class="text-muted small">(${whatsapp} | ${email})</span></div>
              <div class="mb-2 fs-5 fw-bold text-success">Total: $${valorTotalFinal.toLocaleString('es-AR')}</div>
            </div>
          </div>
        `;
        modalConfirmacion.show();
    });

    btnConfirmarReservaFinal.addEventListener('click', () => {
        if (!datosReservaPendiente) return;
        agregarPresupuesto(datosReservaPendiente);
        modalConfirmacion.hide();
        lanzarConfeti();
        // Mensaje alegre pop-up con todos los datos
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(0,0,0,0.6)';
        overlay.style.zIndex = 99999;
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.transition = 'opacity 0.5s';
        const divFelicidades = document.createElement('div');
        divFelicidades.style.background = '#fff';
        divFelicidades.style.borderRadius = '18px';
        divFelicidades.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)';
        divFelicidades.style.padding = '1.2rem 1rem';
        divFelicidades.style.textAlign = 'center';
        divFelicidades.style.maxWidth = '340px';
        divFelicidades.style.fontSize = '1rem';
        divFelicidades.style.animation = 'popUpScale 0.5s cubic-bezier(.23,1.01,.98,.68)';
        // Renderizar datos de la reserva
        let srcImgSalon = 'https://placehold.co/120x120/cccccc/333333?text=No+Img';
        const salon = datosReservaPendiente.salon;
        if (salon.imagen) {
            if (salon.imagen.startsWith('data:image')) srcImgSalon = salon.imagen;
            else if (salon.imagen.startsWith('http://') || salon.imagen.startsWith('https://')) srcImgSalon = salon.imagen;
            else srcImgSalon = `images/${salon.imagen}`;
        }
        const servicios = datosReservaPendiente.servicios || [];
        divFelicidades.innerHTML = `
          <div style="font-size: 1.3rem; font-weight: bold;">🎉🥳 ¡Reserva confirmada! 🥳🎉</div>
          <div class="mt-2 mb-2" style="font-size: 1rem;">¡Gracias por confiar en <span class='fw-bold text-primary'>IDW S.A</span>!<br>En breve nos comunicaremos con vos por <b>email</b> o <b>WhatsApp</b>.<br>¡Estate atento!<br><span style="font-size:1.3rem;">🎈🎂🎊</span></div>
          <hr>
          <div class="text-start mb-2" style="font-size: 0.95rem;">
            <div class="d-flex align-items-center gap-2 mb-2">
              <img src="${srcImgSalon}" alt="${salon.nombre}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 8px;">
              <div>
                <div class="fw-bold">${salon.nombre}</div>
                <div class="text-muted small"><i class="fas fa-map-marker-alt me-2"></i>${salon.direccion}</div>
              </div>
            </div>
            <div class="mb-1"><strong>Fecha:</strong> ${datosReservaPendiente.fechaEvento}</div>
            <div class="mb-1"><strong>Horario:</strong> ${formatHora24(datosReservaPendiente.horaInicio)} - ${formatHora24(datosReservaPendiente.horaFin)}</div>
            <div class="mb-1"><strong>Temática:</strong> ${datosReservaPendiente.tematica}</div>
            <div class="mb-1"><strong>Cliente:</strong> ${datosReservaPendiente.nombreApellido}</div>
            <div class="mb-1"><strong>WhatsApp:</strong> ${datosReservaPendiente.whatsapp}</div>
            <div class="mb-1"><strong>Email:</strong> ${datosReservaPendiente.email}</div>
            <div class="mb-1"><strong>Servicios:</strong></div>
            <div class="mb-1">
              ${servicios.length === 0 ? '<span class="text-muted">Sin servicios adicionales.</span>' :
                servicios.map(s => `<div class="d-flex align-items-center gap-1 mb-1"><img src="${getSrcImgServicio(s)}" alt="${s.nombre}" style="width: 24px; height: 24px; object-fit: cover; border-radius: 6px;"><span>${s.nombre}</span></div>`).join('')
              }
            </div>
            <div class="mb-1 fw-bold text-success">Total: $${datosReservaPendiente.valorTotal.toLocaleString('es-AR')}</div>
          </div>
          <button id="btn-volver-inicio-popup" class="btn btn-primary mt-2 w-100" style="font-size: 1rem; padding: 0.4rem 0.8rem;">Volver al inicio</button>
        `;
        overlay.appendChild(divFelicidades);
        document.body.appendChild(overlay);
        // Animación de escala
        const stylePop = document.createElement('style');
        stylePop.innerHTML = `@keyframes popUpScale { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }`;
        document.head.appendChild(stylePop);
        document.getElementById('btn-volver-inicio-popup').onclick = () => {
          overlay.remove();
          stylePop.remove();
          window.location.href = 'index.html';
        };
    });

    // CSS confeti
    const styleConfetti = document.createElement('style');
    styleConfetti.innerHTML = `.confetti { pointer-events: none; }`;
    document.head.appendChild(styleConfetti);

    function formatHora24(hora) {
        // Si ya está en formato HH:mm, devolver igual
        if (/^\d{2}:\d{2}$/.test(hora)) return hora;
        // Si viene en formato HH:mm:ss, recortar
        if (/^\d{2}:\d{2}:\d{2}$/.test(hora)) return hora.slice(0,5);
        return hora;
    }

    renderizarSalon();
    renderizarServicios();
    actualizarTotal();

    serviciosContainer.addEventListener('change', actualizarTotal);

    // Mostrar horarios ocupados al cambiar la fecha
    document.getElementById('fecha-evento').addEventListener('change', mostrarHorariosOcupados);

    function mostrarHorariosOcupados() {
        const fecha = document.getElementById('fecha-evento').value;
        const horariosDiv = document.getElementById('horarios-ocupados');
        if (!fecha) {
            horariosDiv.innerHTML = '';
            return;
        }
        const reservas = obtenerPresupuestos().filter(r =>
            r.salon && salonSeleccionado && r.salon.id === salonSeleccionado.id && r.fechaEvento === fecha
        );
        let html = '';
        if (reservas.length > 0) {
            html = '<div class="alert alert-warning mt-2"><strong>Horarios ocupados:</strong><ul class="mb-0">';
            reservas.forEach(r => {
                html += `<li>${r.horaInicio} - ${r.horaFin}</li>`;
            });
            html += '</ul></div>';
        } else {
            html = '<div class="alert alert-success mt-2">No hay horarios ocupados para este día.</div>';
        }
        horariosDiv.innerHTML = html;
    }
});

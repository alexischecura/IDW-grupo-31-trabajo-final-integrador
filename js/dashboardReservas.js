import { obtenerPresupuestos } from './presupuestos.js';

function getSrcImgSalon(salon) {
    if (!salon.imagen) return 'https://placehold.co/60x60/cccccc/333333?text=No+Img';
    if (salon.imagen.startsWith('data:image')) return salon.imagen;
    if (salon.imagen.startsWith('http://') || salon.imagen.startsWith('https://')) return salon.imagen;
    return `images/${salon.imagen}`;
}
function getSrcImgServicio(servicio) {
    if (!servicio.imagen) return 'https://placehold.co/32x32/cccccc/333333?text=No+Img';
    if (servicio.imagen.startsWith('data:image')) return servicio.imagen;
    if (servicio.imagen.startsWith('http://') || servicio.imagen.startsWith('https://')) return servicio.imagen;
    return `imageservicios/${servicio.imagen}`;
}

function renderizarReservas(filtro = '') {
    const tabla = document.getElementById('tabla-reservas-body');
    const reservas = obtenerPresupuestos();
    tabla.innerHTML = '';
    reservas.filter(r => {
        if (!filtro) return true;
        const texto = `${r.nombreApellido} ${r.salon?.nombre} ${r.email} ${r.whatsapp} ${r.tematica}`.toLowerCase();
        return texto.includes(filtro.toLowerCase());
    }).forEach(r => {
        let serviciosHtml = '';
        if (r.servicios && r.servicios.length > 0) {
            serviciosHtml = r.servicios.map(s => `<div class='d-flex align-items-center gap-1 mb-1'><img src='${getSrcImgServicio(s)}' alt='${s.nombre}' style='width: 32px; height: 32px; object-fit: cover; border-radius: 6px;'><span>${s.nombre}</span></div>`).join('');
        } else {
            serviciosHtml = '<span class="text-muted">Sin servicios</span>';
        }
        tabla.innerHTML += `
            <tr>
                <td>${r.id || ''}</td>
                <td><div class='d-flex align-items-center gap-2'><img src='${getSrcImgSalon(r.salon)}' alt='${r.salon?.nombre || ''}' style='width: 48px; height: 48px; object-fit: cover; border-radius: 8px;'><span>${r.salon?.nombre || ''}</span></div></td>
                <td>${serviciosHtml}</td>
                <td>${r.fechaEvento || ''}</td>
                <td>${r.horaInicio || ''} - ${r.horaFin || ''}</td>
                <td>${r.nombreApellido || ''}</td>
                <td>${r.email || ''}</td>
                <td>${r.whatsapp || ''}</td>
                <td>${r.tematica || ''}</td>
                <td class='fw-bold text-success'>$${r.valorTotal ? r.valorTotal.toLocaleString('es-AR') : ''}</td>
                <td class='text-end'><button class='btn btn-sm btn-danger btn-eliminar-reserva' data-id='${r.id}' title='Eliminar'><i class='fas fa-trash-alt'></i></button></td>
            </tr>
        `;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarReservas();
    document.getElementById('busqueda-reservas').addEventListener('input', e => {
        renderizarReservas(e.target.value);
    });
    document.getElementById('tabla-reservas-body').addEventListener('click', e => {
        if (e.target.closest('.btn-eliminar-reserva')) {
            const id = parseInt(e.target.closest('.btn-eliminar-reserva').dataset.id);
            if (confirm('¿Seguro que deseas eliminar esta reserva?')) {
                const reservas = obtenerPresupuestos().filter(r => r.id !== id);
                localStorage.setItem('presupuestos_idwsa', JSON.stringify(reservas));
                renderizarReservas(document.getElementById('busqueda-reservas').value);
            }
        }
    });
}); 


import { obtenerServicios, guardarServicios } from './servicios.js';

document.addEventListener('DOMContentLoaded', () => {
    // La autenticación es manejada por auth.js
    
    const tablaServiciosBody = document.getElementById('tabla-servicios-body');
    const btnNuevoServicio = document.getElementById('btn-nuevo-servicio');
    const modalServicio = new bootstrap.Modal(document.getElementById('modalServicio'));
    const formularioServicio = document.getElementById('formulario-servicio');
    const servicioIdInput = document.getElementById('servicio-id');
    const modalTitle = document.getElementById('modalServicioLabel');
    const inputArchivoImagenServicio = document.getElementById('input-archivo-imagen-servicio');
    const inputEnlaceImagenServicio = document.getElementById('input-enlace-imagen-servicio');
    const inputProyectoImagenServicio = document.getElementById('input-proyecto-imagen-servicio');
    const radioArchivoServicio = document.getElementById('radio-archivo-servicio');
    const radioEnlaceServicio = document.getElementById('radio-enlace-servicio');
    const radioProyectoServicio = document.getElementById('radio-proyecto-servicio');
    const ayudaProyectoImagenServicio = document.getElementById('ayuda-proyecto-imagen-servicio');
    const vistaPreviaImagenServicio = document.getElementById('vista-previa-imagen-servicio');

    let servicios = obtenerServicios();

    function renderizarTabla() {
        tablaServiciosBody.innerHTML = '';
        servicios.forEach(s => {
            let srcImg = 'https://placehold.co/80x60/cccccc/333333?text=No+Img';
            if (s.imagen) {
                if (s.imagen.startsWith('data:image')) {
                    srcImg = s.imagen;
                } else if (s.imagen.startsWith('http://') || s.imagen.startsWith('https://')) {
                    srcImg = s.imagen;
                } else {
                    srcImg = `imageservicios/${s.imagen}`;
                }
            }
            tablaServiciosBody.innerHTML += `
                <tr>
                    <td>${s.id}</td>
                    <td><img src="${srcImg}" alt="${s.nombre}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px;" onerror="this.onerror=null;this.src='https://placehold.co/80x60/cccccc/333333?text=No+Img';"></td>
                    <td>${s.nombre}</td>
                    <td>${s.descripcion}</td>
                    <td>$${s.precio.toLocaleString('es-AR')}</td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-info btn-editar" data-id="${s.id}" title="Editar"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${s.id}" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>`;
        });
    }

    function abrirModalParaCrear() {
        formularioServicio.reset();
        servicioIdInput.value = '';
        modalTitle.textContent = 'Crear Nuevo Servicio';
        inputArchivoImagenServicio.classList.remove('d-none');
        inputEnlaceImagenServicio.classList.add('d-none');
        inputProyectoImagenServicio.classList.add('d-none');
        ayudaProyectoImagenServicio.classList.add('d-none');
        radioArchivoServicio.checked = true;
        radioEnlaceServicio.checked = false;
        radioProyectoServicio.checked = false;
        vistaPreviaImagenServicio.src = '';
        vistaPreviaImagenServicio.style.display = 'none';
        modalServicio.show();
    }

    function abrirModalParaEditar(id) {
        const servicio = servicios.find(s => s.id === id);
        if (servicio) {
            servicioIdInput.value = servicio.id;
            document.getElementById('servicio-nombre').value = servicio.nombre;
            document.getElementById('servicio-descripcion').value = servicio.descripcion;
            document.getElementById('servicio-precio').value = servicio.precio;
            // Manejar imagen
            if (servicio.imagen && servicio.imagen.startsWith('data:image')) {
                radioArchivoServicio.checked = true;
                radioEnlaceServicio.checked = false;
                radioProyectoServicio.checked = false;
                inputArchivoImagenServicio.classList.remove('d-none');
                inputEnlaceImagenServicio.classList.add('d-none');
                inputProyectoImagenServicio.classList.add('d-none');
                ayudaProyectoImagenServicio.classList.add('d-none');
                vistaPreviaImagenServicio.src = servicio.imagen;
                vistaPreviaImagenServicio.style.display = 'block';
            } else if (servicio.imagen && (servicio.imagen.startsWith('http://') || servicio.imagen.startsWith('https://'))) {
                radioArchivoServicio.checked = false;
                radioEnlaceServicio.checked = true;
                radioProyectoServicio.checked = false;
                inputArchivoImagenServicio.classList.add('d-none');
                inputEnlaceImagenServicio.classList.remove('d-none');
                inputProyectoImagenServicio.classList.add('d-none');
                ayudaProyectoImagenServicio.classList.add('d-none');
                inputEnlaceImagenServicio.value = servicio.imagen;
                vistaPreviaImagenServicio.src = servicio.imagen;
                vistaPreviaImagenServicio.style.display = 'block';
            } else if (servicio.imagen) {
                radioArchivoServicio.checked = false;
                radioEnlaceServicio.checked = false;
                radioProyectoServicio.checked = true;
                inputArchivoImagenServicio.classList.add('d-none');
                inputEnlaceImagenServicio.classList.add('d-none');
                inputProyectoImagenServicio.classList.remove('d-none');
                ayudaProyectoImagenServicio.classList.remove('d-none');
                inputProyectoImagenServicio.value = servicio.imagen;
                vistaPreviaImagenServicio.src = `imageservicios/${servicio.imagen}`;
                vistaPreviaImagenServicio.style.display = 'block';
            } else {
                radioArchivoServicio.checked = true;
                radioEnlaceServicio.checked = false;
                radioProyectoServicio.checked = false;
                inputArchivoImagenServicio.classList.remove('d-none');
                inputEnlaceImagenServicio.classList.add('d-none');
                inputProyectoImagenServicio.classList.add('d-none');
                ayudaProyectoImagenServicio.classList.add('d-none');
                vistaPreviaImagenServicio.src = '';
                vistaPreviaImagenServicio.style.display = 'none';
            }
            modalTitle.textContent = 'Editar Servicio';
            modalServicio.show();
        }
    }

    async function manejarSubmit(event) {
        event.preventDefault();
        const id = servicioIdInput.value ? parseInt(servicioIdInput.value) : null;
        let imagenServicio = '';
        if (radioArchivoServicio.checked && inputArchivoImagenServicio.files[0]) {
            imagenServicio = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (evt) => resolve(evt.target.result);
                reader.readAsDataURL(inputArchivoImagenServicio.files[0]);
            });
        } else if (radioEnlaceServicio.checked && inputEnlaceImagenServicio.value) {
            imagenServicio = inputEnlaceImagenServicio.value;
        } else if (radioProyectoServicio.checked && inputProyectoImagenServicio.value) {
            imagenServicio = inputProyectoImagenServicio.value;
        }
        const servicioData = {
            id: id,
            nombre: document.getElementById('servicio-nombre').value,
            descripcion: document.getElementById('servicio-descripcion').value,
            precio: parseFloat(document.getElementById('servicio-precio').value),
            imagen: imagenServicio
        };
        if (id) {
            servicios = servicios.map(s => s.id === id ? servicioData : s);
        } else {
            servicioData.id = servicios.length > 0 ? Math.max(...servicios.map(s => s.id)) + 1 : 1;
            servicios.push(servicioData);
        }
        guardarServicios(servicios);
        renderizarTabla();
        modalServicio.hide();
    }

    function eliminarServicio(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
            servicios = servicios.filter(s => s.id !== id);
            guardarServicios(servicios);
            renderizarTabla();
        }
    }

    btnNuevoServicio.addEventListener('click', abrirModalParaCrear);

    tablaServiciosBody.addEventListener('click', (event) => {
        if (event.target.closest('.btn-editar')) {
            const id = parseInt(event.target.closest('.btn-editar').dataset.id);
            abrirModalParaEditar(id);
        }
        if (event.target.closest('.btn-eliminar')) {
            const id = parseInt(event.target.closest('.btn-eliminar').dataset.id);
            eliminarServicio(id);
        }
    });

    formularioServicio.addEventListener('submit', manejarSubmit);
    
    // --- MANEJO DE INPUTS DE IMAGEN ---
    radioArchivoServicio.addEventListener('change', () => {
        inputArchivoImagenServicio.classList.remove('d-none');
        inputEnlaceImagenServicio.classList.add('d-none');
        inputProyectoImagenServicio.classList.add('d-none');
        ayudaProyectoImagenServicio.classList.add('d-none');
        vistaPreviaImagenServicio.style.display = 'none';
        inputEnlaceImagenServicio.value = '';
        inputProyectoImagenServicio.value = '';
    });
    radioEnlaceServicio.addEventListener('change', () => {
        inputArchivoImagenServicio.classList.add('d-none');
        inputEnlaceImagenServicio.classList.remove('d-none');
        inputProyectoImagenServicio.classList.add('d-none');
        ayudaProyectoImagenServicio.classList.add('d-none');
        vistaPreviaImagenServicio.style.display = 'none';
        inputArchivoImagenServicio.value = '';
        inputProyectoImagenServicio.value = '';
    });
    radioProyectoServicio.addEventListener('change', () => {
        inputArchivoImagenServicio.classList.add('d-none');
        inputEnlaceImagenServicio.classList.add('d-none');
        inputProyectoImagenServicio.classList.remove('d-none');
        ayudaProyectoImagenServicio.classList.remove('d-none');
        vistaPreviaImagenServicio.style.display = 'none';
        inputArchivoImagenServicio.value = '';
        inputEnlaceImagenServicio.value = '';
    });
    inputArchivoImagenServicio.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                vistaPreviaImagenServicio.src = evt.target.result;
                vistaPreviaImagenServicio.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            vistaPreviaImagenServicio.src = '';
            vistaPreviaImagenServicio.style.display = 'none';
        }
    });
    inputEnlaceImagenServicio.addEventListener('input', (e) => {
        const url = e.target.value;
        if (url) {
            vistaPreviaImagenServicio.src = url;
            vistaPreviaImagenServicio.style.display = 'block';
        } else {
            vistaPreviaImagenServicio.src = '';
            vistaPreviaImagenServicio.style.display = 'none';
        }
    });
    inputProyectoImagenServicio.addEventListener('input', (e) => {
        const nombreArchivo = e.target.value;
        if (nombreArchivo) {
            vistaPreviaImagenServicio.src = `imageservicios/${nombreArchivo}`;
            vistaPreviaImagenServicio.style.display = 'block';
        } else {
            vistaPreviaImagenServicio.src = '';
            vistaPreviaImagenServicio.style.display = 'none';
        }
    });
    
    renderizarTabla();
});
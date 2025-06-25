

import { obtenerSalones, guardarSalones } from './salones.js';

document.addEventListener('DOMContentLoaded', () => {
    
    
    // --- OBTENER ELEMENTOS DEL DOM ---
    const tablaSalonesBody = document.getElementById('tabla-salones-body');
    const btnNuevoSalon = document.getElementById('btn-nuevo-salon');
    const modalSalon = new bootstrap.Modal(document.getElementById('modalSalon'));
    const formularioSalon = document.getElementById('formulario-salon');
    const salonIdInput = document.getElementById('salon-id');
    const modalTitle = document.getElementById('modalSalonLabel');
    const inputArchivoImagen = document.getElementById('input-archivo-imagen');
    const inputEnlaceImagen = document.getElementById('input-enlace-imagen');
    const radioArchivo = document.getElementById('radio-archivo');
    const radioEnlace = document.getElementById('radio-enlace');
    const radioProyecto = document.getElementById('radio-proyecto');
    const inputProyectoImagen = document.getElementById('input-proyecto-imagen');
    const ayudaProyectoImagen = document.getElementById('ayuda-proyecto-imagen');
    const vistaPreviaImagen = document.getElementById('vista-previa-imagen');
    
    // --- ESTADO DE LA APLICACIÓN ---
    let salones = obtenerSalones();
    let salonIdParaEliminar = null;

    // --- FUNCIONES ---

    function renderizarTabla() {
        tablaSalonesBody.innerHTML = '';
        if (salones.length === 0) {
            tablaSalonesBody.innerHTML = `<tr><td colspan="6" class="text-center py-4">No hay salones registrados.</td></tr>`;
            return;
        }
        salones.forEach(salon => {
            let srcImg = 'https://placehold.co/80x60/cccccc/333333?text=No+Img';
            if (salon.imagen) {
                if (salon.imagen.startsWith('data:image')) {
                    srcImg = salon.imagen;
                } else if (salon.imagen.startsWith('http://') || salon.imagen.startsWith('https://')) {
                    srcImg = salon.imagen;
                } else {
                    srcImg = `images/${salon.imagen}`;
                }
            }
            tablaSalonesBody.innerHTML += `
                <tr>
                    <td>${salon.id}</td>
                    <td><img src="${srcImg}" alt="${salon.nombre}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px;" onerror="this.onerror=null;this.src='https://placehold.co/80x60/cccccc/333333?text=No+Img';"></td>
                    <td>${salon.nombre}</td>
                    <td>${salon.direccion}</td>
                    <td>$${salon.precio.toLocaleString('es-AR')}</td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-info btn-editar" data-id="${salon.id}" title="Editar"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" data-id="${salon.id}" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>`;
        });
    }

    function abrirModalParaCrear() {
        formularioSalon.reset();
        salonIdInput.value = '';
        modalTitle.textContent = 'Crear Nuevo Salón';
        inputArchivoImagen.classList.remove('d-none');
        inputEnlaceImagen.classList.add('d-none');
        inputProyectoImagen.classList.add('d-none');
        ayudaProyectoImagen.classList.add('d-none');
        radioArchivo.checked = true;
        radioEnlace.checked = false;
        radioProyecto.checked = false;
        vistaPreviaImagen.src = '';
        vistaPreviaImagen.style.display = 'none';
        modalSalon.show();
    }

    function abrirModalParaEditar(id) {
        const salon = salones.find(s => s.id === id);
        if (salon) {
            salonIdInput.value = salon.id;
            document.getElementById('salon-nombre').value = salon.nombre;
            document.getElementById('salon-direccion').value = salon.direccion;
            document.getElementById('salon-precio').value = salon.precio;
            document.getElementById('salon-descripcion').value = salon.descripcion;
            // Manejar imagen
            if (salon.imagen && salon.imagen.startsWith('data:image')) {
                radioArchivo.checked = true;
                radioEnlace.checked = false;
                radioProyecto.checked = false;
                inputArchivoImagen.classList.remove('d-none');
                inputEnlaceImagen.classList.add('d-none');
                inputProyectoImagen.classList.add('d-none');
                ayudaProyectoImagen.classList.add('d-none');
                vistaPreviaImagen.src = salon.imagen;
                vistaPreviaImagen.style.display = 'block';
            } else if (salon.imagen && (salon.imagen.startsWith('http://') || salon.imagen.startsWith('https://'))) {
                radioArchivo.checked = false;
                radioEnlace.checked = true;
                radioProyecto.checked = false;
                inputArchivoImagen.classList.add('d-none');
                inputEnlaceImagen.classList.remove('d-none');
                inputProyectoImagen.classList.add('d-none');
                ayudaProyectoImagen.classList.add('d-none');
                inputEnlaceImagen.value = salon.imagen;
                vistaPreviaImagen.src = salon.imagen;
                vistaPreviaImagen.style.display = 'block';
            } else if (salon.imagen) {
                radioArchivo.checked = false;
                radioEnlace.checked = false;
                radioProyecto.checked = true;
                inputArchivoImagen.classList.add('d-none');
                inputEnlaceImagen.classList.add('d-none');
                inputProyectoImagen.classList.remove('d-none');
                ayudaProyectoImagen.classList.remove('d-none');
                inputProyectoImagen.value = salon.imagen;
                vistaPreviaImagen.src = `images/${salon.imagen}`;
                vistaPreviaImagen.style.display = 'block';
            } else {
                radioArchivo.checked = true;
                radioEnlace.checked = false;
                radioProyecto.checked = false;
                inputArchivoImagen.classList.remove('d-none');
                inputEnlaceImagen.classList.add('d-none');
                inputProyectoImagen.classList.add('d-none');
                ayudaProyectoImagen.classList.add('d-none');
                vistaPreviaImagen.src = '';
                vistaPreviaImagen.style.display = 'none';
            }
            modalTitle.textContent = 'Editar Salón';
            modalSalon.show();
        }
    }

    async function manejarSubmit(event) {
        event.preventDefault();
        const id = salonIdInput.value ? parseInt(salonIdInput.value) : null;
        let imagenSalon = '';
        if (radioArchivo.checked && inputArchivoImagen.files[0]) {
            // Convertir archivo a base64
            imagenSalon = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (evt) => resolve(evt.target.result);
                reader.readAsDataURL(inputArchivoImagen.files[0]);
            });
        } else if (radioEnlace.checked && inputEnlaceImagen.value) {
            imagenSalon = inputEnlaceImagen.value;
        } else if (radioProyecto.checked && inputProyectoImagen.value) {
            imagenSalon = inputProyectoImagen.value;
        }
        const salonData = {
            id: id,
            nombre: document.getElementById('salon-nombre').value,
            direccion: document.getElementById('salon-direccion').value,
            precio: parseFloat(document.getElementById('salon-precio').value),
            descripcion: document.getElementById('salon-descripcion').value,
            imagen: imagenSalon
        };
        if (id) {
            // Actualizar salon existente
            salones = salones.map(s => s.id === id ? salonData : s);
        } else {
            // Crear nuevo salon
            salonData.id = salones.length > 0 ? Math.max(...salones.map(s => s.id)) + 1 : 1;
            salones.push(salonData);
        }
        guardarSalones(salones);
        renderizarTabla();
        modalSalon.hide();
    }
    
    // --- EVENT LISTENERS ---
    
    btnNuevoSalon.addEventListener('click', abrirModalParaCrear);

    tablaSalonesBody.addEventListener('click', (event) => {
        if (event.target.closest('.btn-editar')) {
            const id = parseInt(event.target.closest('.btn-editar').dataset.id);
            abrirModalParaEditar(id);
        }
        if (event.target.closest('.btn-eliminar')) {
            const id = parseInt(event.target.closest('.btn-eliminar').dataset.id);
            if (confirm('¿Estás seguro de que deseas eliminar este salón?')) {
                salones = salones.filter(s => s.id !== id);
                guardarSalones(salones);
                renderizarTabla();
            }
        }
    });

    formularioSalon.addEventListener('submit', manejarSubmit);
    
    // --- MANEJO DE INPUTS DE IMAGEN ---
    radioArchivo.addEventListener('change', () => {
        inputArchivoImagen.classList.remove('d-none');
        inputEnlaceImagen.classList.add('d-none');
        inputProyectoImagen.classList.add('d-none');
        ayudaProyectoImagen.classList.add('d-none');
        vistaPreviaImagen.style.display = 'none';
        inputEnlaceImagen.value = '';
        inputProyectoImagen.value = '';
    });
    radioEnlace.addEventListener('change', () => {
        inputArchivoImagen.classList.add('d-none');
        inputEnlaceImagen.classList.remove('d-none');
        inputProyectoImagen.classList.add('d-none');
        ayudaProyectoImagen.classList.add('d-none');
        vistaPreviaImagen.style.display = 'none';
        inputArchivoImagen.value = '';
        inputProyectoImagen.value = '';
    });
    radioProyecto.addEventListener('change', () => {
        inputArchivoImagen.classList.add('d-none');
        inputEnlaceImagen.classList.add('d-none');
        inputProyectoImagen.classList.remove('d-none');
        ayudaProyectoImagen.classList.remove('d-none');
        vistaPreviaImagen.style.display = 'none';
        inputArchivoImagen.value = '';
        inputEnlaceImagen.value = '';
    });
    inputArchivoImagen.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                vistaPreviaImagen.src = evt.target.result;
                vistaPreviaImagen.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            vistaPreviaImagen.src = '';
            vistaPreviaImagen.style.display = 'none';
        }
    });
    inputEnlaceImagen.addEventListener('input', (e) => {
        const url = e.target.value;
        if (url) {
            vistaPreviaImagen.src = url;
            vistaPreviaImagen.style.display = 'block';
        } else {
            vistaPreviaImagen.src = '';
            vistaPreviaImagen.style.display = 'none';
        }
    });
    inputProyectoImagen.addEventListener('input', (e) => {
        const nombreArchivo = e.target.value;
        if (nombreArchivo) {
            vistaPreviaImagen.src = `images/${nombreArchivo}`;
            vistaPreviaImagen.style.display = 'block';
        } else {
            vistaPreviaImagen.src = '';
            vistaPreviaImagen.style.display = 'none';
        }
    });
    
    // --- INICIALIZACIÓN ---
    renderizarTabla();
});

import { obtenerSalones, guardarSalones } from './salones.js';


if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
    window.location.href = 'loginAdmin.html';
}

// variables /Dom tablero del administrador
const tablaSalonesBody = document.getElementById('tabla-salones-body');
const btnNuevoSalon = document.getElementById('btn-nuevo-salon');
const modalSalon = new bootstrap.Modal(document.getElementById('modalSalon'));
const formularioSalon = document.getElementById('formulario-salon');
const salonIdInput = document.getElementById('salon-id');
const salonNombreInput = document.getElementById('salon-nombre');
const salonDireccionInput = document.getElementById('salon-direccion');
const salonPrecioInput = document.getElementById('salon-precio');
const salonDescripcionInput = document.getElementById('salon-descripcion');
const salonImagenInput = document.getElementById('salon-imagen'); 
const btnSeleccionarImagen = document.getElementById('btn-seleccionar-imagen'); 
const fileInputImagen = document.getElementById('file-input-imagen'); 


const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
const confirmDeleteButton = document.getElementById('confirmDeleteButton');


let salones = obtenerSalones(); // se cargan los salones inciales 


function renderizarTablaSalones() {
    tablaSalonesBody.innerHTML = ''; 

    if (salones.length === 0) {
        tablaSalonesBody.innerHTML = `<tr><td colspan="7" class="text-center py-4">No hay salones registrados.</td></tr>`;
        return;
    }

    salones.forEach(salon => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${salon.id}</td>
            <td><img src="images/${salon.imagen || 'placeholder.png'}" alt="${salon.nombre}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px;" onerror="this.onerror=null;this.src='https://placehold.co/80x60/cccccc/333333?text=No+Img';"></td>
            <td>${salon.nombre}</td>
            <td>${salon.direccion}</td>
            <td>$${salon.precio.toLocaleString('es-AR')}</td>
            <td>${salon.descripcion}</td>
            <td>
                <button class="btn btn-sm btn-info me-2 btn-editar" data-id="${salon.id}" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-eliminar" data-id="${salon.id}" title="Eliminar">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tablaSalonesBody.appendChild(fila);
    });

    
    document.querySelectorAll('.btn-editar').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = parseInt(event.currentTarget.dataset.id);
            cargarSalonParaEdicion(id);
        });
    });

    document.querySelectorAll('.btn-eliminar').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = parseInt(event.currentTarget.dataset.id);
            confirmDeleteButton.dataset.idToDelete = id;
            confirmDeleteModal.show();
        });
    });
}


function cargarSalonParaEdicion(id) {
    const salon = salones.find(s => s.id === id);
    if (salon) {
        salonIdInput.value = salon.id;
        salonNombreInput.value = salon.nombre;
        salonDireccionInput.value = salon.direccion;
        salonPrecioInput.value = salon.precio;
        salonDescripcionInput.value = salon.descripcion;
        salonImagenInput.value = salon.imagen || ''; 
        modalSalon.show();
        formularioSalon.classList.remove('was-validated');
    }
}


function agregarSalon(nuevoSalon) {
    const newId = salones.length > 0 ? Math.max(...salones.map(s => s.id)) + 1 : 1;
    nuevoSalon.id = newId;
    salones.push(nuevoSalon);
    guardarSalones(salones);
    renderizarTablaSalones();
}


function actualizarSalon(salonActualizado) {
    salones = salones.map(s => (s.id === salonActualizado.id ? salonActualizado : s));
    guardarSalones(salones);
    renderizarTablaSalones();
}


function ejecutarEliminacion(id) {
    salones = salones.filter(s => s.id !== id);
    guardarSalones(salones);
    renderizarTablaSalones();
    confirmDeleteModal.hide();
}


btnNuevoSalon.addEventListener('click', () => {
    formularioSalon.reset(); 
    salonIdInput.value = ''; 
    salonImagenInput.value = '';
    fileInputImagen.value = ''; 
    modalSalon.show();
    formularioSalon.classList.remove('was-validated'); 
});


btnSeleccionarImagen.addEventListener('click', () => {
    fileInputImagen.click(); 
});


fileInputImagen.addEventListener('change', (event) => {
    if (event.target.files.length > 0) {
        const fileName = event.target.files[0].name;
        salonImagenInput.value = fileName; 
    }
});


formularioSalon.addEventListener('submit', (event) => {
    event.preventDefault(); 
    event.stopPropagation(); 

    
    if (!formularioSalon.checkValidity()) {
        formularioSalon.classList.add('was-validated');
        return;
    }

    const salonData = {
        nombre: salonNombreInput.value,
        direccion: salonDireccionInput.value,
        precio: parseFloat(salonPrecioInput.value),
        descripcion: salonDescripcionInput.value,
        imagen: salonImagenInput.value || 'placeholder.png' 
    };

    if (salonIdInput.value) {
        
        salonData.id = parseInt(salonIdInput.value);
        actualizarSalon(salonData);
    } else {
        
        agregarSalon(salonData);
    }

    modalSalon.hide(); 
    formularioSalon.classList.remove('was-validated'); 
});

confirmDeleteButton.addEventListener('click', () => {
    const idToDelete = parseInt(confirmDeleteButton.dataset.idToDelete);
    ejecutarEliminacion(idToDelete);
});


document.addEventListener('DOMContentLoaded', renderizarTablaSalones);
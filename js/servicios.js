

// Clave única para guardar los servicios.
export const SERVICIOS_KEY = "servicios_idwsa";

// Listado de servicios predefinido que sirve como punto de partida.
export const SERVICIOS_PREDETERMINADOS = [
    { id: 1, nombre: "Catering Básico", descripcion: "Incluye snacks, bebidas y torta.", precio: 15000, imagen: "Catering Básico.jpg" },
    { id: 2, nombre: "Show de Magia", descripcion: "Un mago profesional por una hora.", precio: 25000, imagen: "Show de Magia.jpg" },
    { id: 3, nombre: "Animación y Juegos", descripcion: "Coordinador de juegos y actividades.", precio: 20000, imagen: "Animación y Juegos.jpg" },
    { id: 4, nombre: "Fotografía Profesional", descripcion: "Cobertura fotográfica del evento.", precio: 30000, imagen: "Fotografía Profesional.jpg" },
    { id: 5, nombre: "Souvenirs Personalizados", descripcion: "Bolsitas de regalo temáticas para cada invitado.", precio: 10000, imagen: "Souvenirs Personalizados.jpg" },
];

/**
 * Carga los servicios predeterminados en localStorage si no existen previamente.
 */
export function inicializarServicios() {
    if (!localStorage.getItem(SERVICIOS_KEY)) {
        localStorage.setItem(SERVICIOS_KEY, JSON.stringify(SERVICIOS_PREDETERMINADOS));
    }
}

/**
 * Obtiene todos los servicios desde localStorage.
 * @returns {Array} - Un array de objetos de servicio.
 */
export function obtenerServicios() {
    inicializarServicios();
    const serviciosJSON = localStorage.getItem(SERVICIOS_KEY);
    return serviciosJSON ? JSON.parse(serviciosJSON) : [];
}

/**
 * Guarda el array de servicios completo en localStorage.
 * @param {Array} servicios - El array de servicios para guardar.
 */
export function guardarServicios(servicios) {
    localStorage.setItem(SERVICIOS_KEY, JSON.stringify(servicios));
}


// Clave única para guardar los salones en el almacenamiento local del navegador.
export const SALONES_KEY = "salones_idwsa";

// Datos iniciales para cargar en el sistema la primera vez que un usuario visita el sitio.
// Esto asegura que el sitio tenga contenido desde el principio.
export const SALONES_PREDETERMINADOS = [
    { id: 1, nombre: "Salón Cielo", direccion: "Av. Fiesta 123", precio: 60000, descripcion: "Espacio amplio con temática celestial, ideal para una fiesta mágica entre las nubes.", imagen: "salaCielo.jpg" },
    { id: 2, nombre: "Salón CasaBlanca", direccion: "Calle Diversión 456", precio: 70000, descripcion: "Diseño moderno y acogedor, perfecto para celebrar con un toque de glamour.", imagen: "sala-casablanca.jpg" },
    { id: 3, nombre: "Salón Arco Iris", direccion: "Ruta Colorida 789", precio: 90000, descripcion: "Entorno vibrante y lleno de color, donde la diversión nunca termina.", imagen: "salaArco.webp" },
    { id: 4, nombre: "Salón Lawn Party", direccion: "Blvd. Juego 321", precio: 90000, descripcion: "Toque natural y aire libre, ideal para juegos y entretenimiento al estilo picnic.", imagen: "salaLawn.jpg" },
    { id: 5, nombre: "Salón Fantasía", direccion: "Camino Magia 654", precio: 40000, descripcion: "Un mundo de imaginación con decorados de cuentos de hadas.", imagen: "sala-fantasia.jpeg" },
    { id: 6, nombre: "Salón Pirata", direccion: "Isla Aventura 987", precio: 65000, descripcion: "Aventura marina con barcos y tesoros para los pequeños exploradores.", imagen: "sala-pirata.jpg" }
];

/**
 * Comprueba si ya existen datos de salones en localStorage. 
 * Si no existen, carga los datos predeterminados.
 */
export function inicializarSalones() {
    if (!localStorage.getItem(SALONES_KEY)) {
        localStorage.setItem(SALONES_KEY, JSON.stringify(SALONES_PREDETERMINADOS));
    }
}

/**
 * Obtiene todos los salones desde localStorage.
 * Llama a la inicialización para asegurar que siempre haya datos.
 * @returns {Array} - Un array de objetos de salón.
 */
export function obtenerSalones() {
    inicializarSalones(); 
    const salonesJSON = localStorage.getItem(SALONES_KEY);
    return salonesJSON ? JSON.parse(salonesJSON) : [];
}

/**
 * Guarda el array de salones completo en localStorage, sobreescribiendo lo anterior.
 * @param {Array} salones - El array de salones para guardar.
 */
export function guardarSalones(salones) {
    localStorage.setItem(SALONES_KEY, JSON.stringify(salones));
}
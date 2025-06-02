/* Compas los salones iniciales son los que eran estaticas. Ahora se van a almacenar en el LocalStorage
y se rendirizan en la pagina principal (index.html) para ser visto por el usuario visitante y
 se renderizan en el panel de administrador (adminAltaSalon.html) para que el administrador pueda modificarlos (crud) 
 que se reflejan en el localStorage y se actualizan en la pagina principal. 
  export funciones permite importar y usar estas funciones en  adminAltaSalon*/ 
  /*para importar en python no se usa el exportar para el import. mientras en js hay que exportar primero*/ 

export const SALONES_KEY = "salones_idwsa";


export const SALONES_INICIALES = [
    { id: 1, nombre: "Salón Cielo", direccion: "Av. Fiesta 123", precio: 60000, descripcion: "Espacio amplio con temática celestial, ideal para una fiesta mágica entre las nubes.", imagen: "salaCielo.jpg" },
    { id: 2, nombre: "Salón CasaBlanca", direccion: "Calle Diversión 456", precio: 70000, descripcion: "Diseño moderno y acogedor, perfecto para celebrar con un toque de glamour.", imagen: "sala-casablanca.jpg" },
    { id: 3, nombre: "Salón Arco Iris", direccion: "Ruta Colorida 789", precio: 90000, descripcion: "Entorno vibrante y lleno de color, donde la diversión nunca termina.", imagen: "salaArco.webp" },
    { id: 4, nombre: "Salón Lawn Party", direccion: "Blvd. Juego 321", precio: 90000, descripcion: "Toque natural y aire libre, ideal para juegos y entretenimiento al estilo picnic.", imagen: "salaLawn.jpg" },
    { id: 5, nombre: "Salón Fantasía", direccion: "Camino Magia 654", precio: 40000, descripcion: "Un mundo de imaginación con decorados de cuentos de hadas.", imagen: "sala-fantasia.jpeg" },
    { id: 6, nombre: "Salón Pirata", direccion: "Isla Aventura 987", precio: 65000, descripcion: "Aventura marina con barcos y tesoros para los pequeños exploradores.", imagen: "sala-pirata.jpg" }
];


export function inicializarLocalStorage() {
    if (!localStorage.getItem(SALONES_KEY)) {
        localStorage.setItem(SALONES_KEY, JSON.stringify(SALONES_INICIALES));
    }
}

export function obtenerSalones() {
    inicializarLocalStorage(); 
    const salonesJSON = localStorage.getItem(SALONES_KEY);
    return salonesJSON ? JSON.parse(salonesJSON) : [];
}


export function guardarSalones(salones) {
    localStorage.setItem(SALONES_KEY, JSON.stringify(salones));
}
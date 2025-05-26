export const salonesDataInicial = [
  {
    id: 1,
    nombre: "Salón Cielo",
    direccion: "Av. Fiesta 123",
    descripcion: "Espacio amplio con temática celestial, ideal para una fiesta mágica entre las nubes.",
    precio: 60000,
    imagen: "images/salaCielo.jpg"
  },
  {
    id: 2,
    nombre: "Salón CasaBlanca",
    direccion: "Calle Diversión 456",
    descripcion: "Diseño moderno y acogedor, perfecto para celebrar con un toque de glamour.",
    precio: 70000,
    imagen: "images/sala-casablanca.jpg"
  },
  {
    id: 3,
    nombre: "Salón Arco Iris",
    direccion: "Ruta Colorida 789",
    descripcion: "Entorno vibrante y lleno de color, donde la diversión nunca termina.",
    precio: 90000,
    imagen: "images/salaArco.webp"
  },
  {
    id: 4,
    nombre: "Salón Lawn Party",
    direccion: "Blvd. Juego 321",
    descripcion: "Toque natural y aire libre, ideal para juegos y entretenimiento al estilo picnic.",
    precio: 90000,
    imagen: "images/salaLawn.jpg"
  },
  {
    id: 5,
    nombre: "Salón Fantasía",
    direccion: "Camino Magia 654",
    descripcion: "Un mundo de imaginación con decorados de cuentos de hadas.",
    precio: 40000,
    imagen: "images/sala-fantasia.jpeg"
  },
  {
    id: 6,
    nombre: "Salón Pirata",
    direccion: "Isla Aventura 987",
    descripcion: "Aventura marina con barcos y tesoros para los pequeños exploradores.",
    precio: 65000,
    imagen: "images/sala-pirata.jpg"
  }
];

export function initializeLocalStorage() {
  if (!localStorage.getItem("salones")) {
    localStorage.setItem("salones", JSON.stringify(salonesDataInicial));
  }
}



export const PRESUPUESTOS_KEY = "presupuestos_idwsa";

// Reservas de ejemplo (predeterminadas)
export const PRESUPUESTOS_PREDETERMINADOS = [
  {
    id: 1,
    salon: {
      id: 1,
      nombre: "Salón Cielo",
      imagen: "salaCielo.jpg",
      direccion: "Av. Fiesta 123",
      descripcion: "Espacio amplio con temática celestial, ideal para una fiesta mágica entre las nubes.",
      precio: 60000
    },
    servicios: [
      {
        id: 1,
        nombre: "Catering Básico",
        imagen: "Catering Básico.jpg",
        precio: 15000
      }
    ],
    fechaEvento: "2025-09-30",
    horaInicio: "11:00",
    horaFin: "13:00",
    nombreApellido: "Emily Johnson",
    whatsapp: "+81 965-431-3024",
    email: "emily.johnson@x.dummyjson.com",
    tematica: "cumpleaños",
    valorTotal: 75000,
    fechaCreacion: "2025-06-20T08:00:00.000Z"
  },
  {
    id: 2,
    salon: {
      id: 2,
      nombre: "Salón CasaBlanca",
      imagen: "sala-casablanca.jpg",
      direccion: "Calle Diversión 456",
      descripcion: "Diseño moderno y acogedor, perfecto para celebrar con un toque de glamour.",
      precio: 70000
    },
    servicios: [
      {
        id: 2,
        nombre: "Show de Magia",
        imagen: "Show de Magia.jpg",
        precio: 25000
      },
      {
        id: 3,
        nombre: "Animación y Juegos",
        imagen: "Animación y Juegos.jpg",
        precio: 20000
      }
    ],
    fechaEvento: "2025-10-15",
    horaInicio: "15:00",
    horaFin: "18:00",
    nombreApellido: "Michael Williams",
    whatsapp: "+49 258-627-6644",
    email: "michael.williams@x.dummyjson.com",
    tematica: "fiesta temática",
    valorTotal: 115000,
    fechaCreacion: "2025-06-20T08:10:00.000Z"
  },
  {
    id: 3,
    salon: {
      id: 3,
      nombre: "Salón Arco Iris",
      imagen: "salaArco.webp",
      direccion: "Ruta Colorida 789",
      descripcion: "Entorno vibrante y lleno de color, donde la diversión nunca termina.",
      precio: 90000
    },
    servicios: [
      {
        id: 4,
        nombre: "Fotografía Profesional",
        imagen: "Fotografía Profesional.jpg",
        precio: 30000
      },
      {
        id: 5,
        nombre: "Souvenirs Personalizados",
        imagen: "Souvenirs Personalizados.jpg",
        precio: 10000
      }
    ],
    fechaEvento: "2025-11-05",
    horaInicio: "17:00",
    horaFin: "20:00",
    nombreApellido: "Sophia Brown",
    whatsapp: "+81 210-652-2785",
    email: "sophia.brown@x.dummyjson.com",
    tematica: "graduación",
    valorTotal: 130000,
    fechaCreacion: "2025-06-20T08:20:00.000Z"
  }
];

export function inicializarPresupuestos() {
  if (!localStorage.getItem(PRESUPUESTOS_KEY)) {
    localStorage.setItem(PRESUPUESTOS_KEY, JSON.stringify(PRESUPUESTOS_PREDETERMINADOS));
  }
}

export function obtenerPresupuestos() {
  inicializarPresupuestos();
  const presupuestosJSON = localStorage.getItem(PRESUPUESTOS_KEY);
  return presupuestosJSON ? JSON.parse(presupuestosJSON) : [];
}

export function agregarPresupuesto(nuevoPresupuesto) {
  const presupuestos = obtenerPresupuestos();
  nuevoPresupuesto.id = presupuestos.length > 0 ? Math.max(...presupuestos.map(p => p.id)) + 1 : 1;
  presupuestos.push(nuevoPresupuesto);
  localStorage.setItem(PRESUPUESTOS_KEY, JSON.stringify(presupuestos));
} 

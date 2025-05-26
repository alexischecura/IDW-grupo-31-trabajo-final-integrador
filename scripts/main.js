import { initializeLocalStorage } from './dataInicial.js';
import { renderSalonesDesdeLocalStorage } from './renderSalones.js';

document.addEventListener("DOMContentLoaded", () => {
  initializeLocalStorage();
  renderSalonesDesdeLocalStorage();
});

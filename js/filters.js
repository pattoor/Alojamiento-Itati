// --------- Filtros y lista de alojamientos ---------
import { cargarAlojamientos } from "./dataLoader.js";
import { agregarMarcadores, map } from "./map.js";

let alojamientos = [];

// Función para renderizar las cards
function renderizarCards(alojamientosAMostrar) {
  const cards = document.getElementById("cards");
  cards.innerHTML = ""; // Limpiar cards anteriores

  alojamientosAMostrar
    .sort((a, b) => a.nombre.localeCompare(b.nombre))
    .forEach(a => {
      // Card
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h4>${a.nombre}</h4>
        <p>📞 ${a.telefono}</p>
        <p>Tipo: ${a.tipo}</p>
        ${a.rating ? `<p>⭐ ${a.rating}</p>` : ''}
      `;

      div.addEventListener("click", () => {
        map.setView([a.lat, a.lng], 16);
        // Abre popup si el marcador existe (necesitas asociarlo)
      });
      cards.appendChild(div);
    });

  // Actualizar marcadores
  agregarMarcadores(alojamientosAMostrar);
}

// Función para aplicar filtros -- checkboxes y select --
function aplicarFiltros() {
  // Obtener checkboxes seleccionados
  const serviciosSeleccionados = Array.from(
    document.querySelectorAll('.filters input[type="checkbox"]:checked')
  ).map(cb => cb.value);

  // Obtener tipo seleccionado
  const tipoSeleccionado = document.getElementById("tipo").value;

  console.log("Servicios filtrados:", serviciosSeleccionados);
  console.log("Tipo filtrado:", tipoSeleccionado);

  // Filtrar alojamientos -> filtros y tipo
  const filtrados = alojamientos.filter(a => {
    const cumpleServicio = serviciosSeleccionados.length === 0 || 
      serviciosSeleccionados.some(servicio => a[servicio] === true);

    const cumpleTipo = tipoSeleccionado === "" || 
      a.tipo.toLowerCase() === tipoSeleccionado.toLowerCase();

    return cumpleServicio && cumpleTipo;
  });

  console.log("Alojamientos después de filtros:", filtrados.length);
  renderizarCards(filtrados);
}

// Cargar alojamientos una sola vez
cargarAlojamientos().then(datos => {
  //console.log("Alojamientos en filters.js:", datos);
  alojamientos = datos;

  // Renderizar todas las cards inicialmente
  renderizarCards(alojamientos);

  // ---------- CONECTAR CHECKBOXES --------
  // Agregar event listeners a checkboxes
  const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", aplicarFiltros);
  });

  // Agregar event listener al select de tipo
  document.getElementById("tipo").addEventListener("change", aplicarFiltros);

}).catch(error => console.error("Error en filters.js:", error));
// --------- Filtros y lista de alojamientos ---------
import { cargarAlojamientos } from "./dataLoader.js";
import { agregarMarcadores, map } from "./map.js";

// Cargar alojamientos una sola vez
cargarAlojamientos().then(alojamientos => {
  console.log("Alojamientos en filters.js:", alojamientos);  // Agrega esto
  agregarMarcadores(alojamientos);

  // Generar lista de alojamientos
  const cards = document.getElementById("cards");
  alojamientos
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

      /* unit test dataset local
      div.innerHTML = `
        <h4>${a.nombre}</h4>
        <p>📞 ${a.telefono}</p>
        <p>Tipo: ${a.tipo}</p>
        <p>Servicios: ${a.servicios.join(", ")}</p>
      `;*/

      div.addEventListener("click", () => {
        map.setView([a.lat, a.lng], 16);
        // Abre popup si el marcador existe (necesitas asociarlo)
      });

      cards.appendChild(div);
    });

  // Almacena para filtros futuros
  window.alojamientos = alojamientos;
}).catch(error => console.error("Error en filters.js:", error));
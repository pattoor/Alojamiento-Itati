// 📍 Coordenadas del centro del pueblo (CAMBIAR ESTO)
const PUEBLO_COORDS = [-27.272755, -58.242561]; // lat, lng
const ZOOM_INICIAL = 15;
const LIMITES_PUEBLO = L.latLngBounds( // limites del mapa (CAMBIAR ESTO)
  [-27.353371, -58.352878], // esquina inferior izquierda
  [-27.248275, -58.132981]  // esquina superior derecha
);

// Inicializar mapa
export const map = L.map("map", {
  maxBounds: LIMITES_PUEBLO,
  maxBoundsViscosity: 1.0,
  minZoom: 12,
  maxZoom: 17   
}).setView(PUEBLO_COORDS, ZOOM_INICIAL);

// Capa base (OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Grupo para marcadores (lo vamos a usar después para filtros)
const markersLayer = L.layerGroup().addTo(map);

// Marcador de prueba (BORRAR después)
L.marker(PUEBLO_COORDS)
  .addTo(markersLayer)
  .bindPopup("<b>Centro del pueblo</b><br>Mapa funcionando ✅");

// Cargar alojamientos y pintarlos
export function agregarMarcadores(alojamientos) {
  console.log("Agregando marcadores para:", alojamientos);  // 
  markersLayer.clearLayers();
  alojamientos.forEach(a => {
    //console.log("Agregando marcador:", a.nombre, a.lat, a.lng); 
    if (isNaN(a.lat) || isNaN(a.lng)) {
      console.error("Lat/lng inválidos para", a.nombre, a.lat, a.lng);
      return;
    }
    L.marker([a.lat, a.lng]).addTo(markersLayer)
      .bindPopup(`<b>${a.nombre}</b><br>${a.telefono}`);
  });
  console.log("Marcadores agregados al layer. Total: ", markersLayer.getLayers().length);  // 
}


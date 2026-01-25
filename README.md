# Alojamiento Itati

## Objetivo del Proyecto
Esta aplicación web proporciona una opción rápida y visual para encontrar alojamientos disponibles durante festividades en el pueblo de Itatí. Utiliza un mapa interactivo para mostrar ubicaciones de alojamientos, junto con una lista filtrable de opciones, facilitando la reserva en eventos locales.

## Funcionalidades
- Mapa interactivo con alojamientos
- Filtros por tipo y servicios
- Lista ordenada de alojamientos
- Datos cargados desde Google Sheets
- Diseño responsive

## Tecnologías
- HTML / CSS / JavaScript (Vanilla)
- Leaflet + OpenStreetMap
- Google Sheets como datasource
- GitHub Pages

## Archivos Principales y Flujo
- **`index.html`**: Página principal que estructura el mapa, lista de alojamientos y filtros.
- **`css/styles.css`**: Estilos para el diseño responsivo del mapa y cards.
- **`js/map.js`**: Inicializa el mapa Leaflet, define límites y agrega marcadores de alojamientos.
- **`js/dataLoader.js`**: Carga datos de alojamientos desde un archivo JSON o CSV (local o remoto).
- **`js/filters.js`**: Gestiona la carga de datos, genera la lista de cards, agrega marcadores al mapa y maneja eventos de clic.
- **`data/alojamientos.json`**: Archivo JSON con datos de alojamientos (usado actualmente).
- **`data/Alojamiento ITATI.csv`**: Archivo CSV alternativo con datos exportados de Google Sheets.

**Flujo breve**: Al cargar la página, `index.html` ejecuta los scripts en orden. `map.js` configura el mapa, `filters.js` carga datos via `dataLoader.js`, agrega marcadores al mapa y genera cards en la lista.

## Instrucciones para Modificar y Visualizar en el Mapa
1. **Configurar el Mapa**:
   - Edita `js/map.js` para cambiar coordenadas del pueblo (`PUEBLO_COORDS`), zoom inicial (`ZOOM_INICIAL`) y límites (`LIMITES_PUEBLO`).
   - Asegúrate de que el `<div id="map">` en `index.html` tenga el tamaño deseado.

2. **Actualizar Datos de Alojamiento**:
   - Para usar JSON local: Modifica `data/alojamientos.json` con nuevos alojamientos (formato: id, nombre, tipo, lat, lng, telefono, servicios[]).
   - Para usar CSV (Google Sheets): En `js/dataLoader.js`, cambia `fetch("./data/alojamientos.json")` a `fetch("./data/Alojamiento ITATI.csv")` y ajusta el parsing si es necesario (ver comentarios en el código).
   - Para Google Sheets remoto: Define una variable `const URL = "TU_URL_DE_GOOGLE_SHEETS_AQUI";` y usa `fetch(URL)` en `js/dataLoader.js`. Asegúrate de que la URL sea pública y exporte CSV válido.

3. **Ejecutar Localmente**:
   - Abre un servidor local (e.g., `python -m http.server 8000` en la raíz del proyecto) o con la extension "Live server".
   - Ve a `http://localhost:8000` en el navegador.
   - Los marcadores y lista deberían aparecer. Si no, revisa la consola (F12) por errores.

4. **Personalizaciones Adicionales**:
   - Filtros: Los checkboxes en `index.html` están preparados; implementa lógica en `js/filters.js` para filtrar por wifi/cochera.
   - Estilos: Modifica `css/styles.css` para cambiar colores o layout.

## Notas
- Asegúrate de que las coordenadas (lat/lng) sean números decimales válidos.
- Para producción, sube a un hosting que soporte HTTPS (requerido para algunos navegadores).
- Si usas Google Sheets, comparte la hoja con permisos de lectura pública.

¡Disfruta explorando alojamientos en Itatí!</content>
<parameter name="filePath">e:\code_ex\FL_API-IA\Aloja-Itati\README.md
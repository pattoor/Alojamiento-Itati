// --------- Carga de datos de alojamientos ---------
export async function cargarAlojamientos() {
  const resp = await fetch("data/alojamientos.json");
  const alojamientos = await resp.json();
  console.log("Alojamientos desde JSON:", alojamientos);  // Agrega esto
  return alojamientos.map(a => ({ ...a,
    wifi: a.servicios.includes("wifi"),  // Ajusta según servicios
    cochera: a.servicios.includes("cochera"),
    carpa: a.servicios.includes("carpa"),
    activo: a.servicios.includes("activo")  // se carga igual
  })).filter(a => a.activo); // Filtra solo activos
}





/* -- fetch desde Google Sheets CSV (alternativa) --
function toBool(v) { // Convierte "TRUE"/"FALSE" a boolean
  return String(v).toLowerCase().trim() === "true";
}

export async function cargarAlojamientos() {
  const res = await fetch("https://docs.google.com/spreadsheets/d/1kYc7VKXNQ1o_LhQjWqQRbaznu8m8Hm_X_pRBfH-1bgA/export?format=csv");
  const text = await res.text();
  console.log("Dataset:", text);  // Vista preliminar del CSV para debug

  const filas = text.split("\n").slice(1);
  // console.log("Filas después de split y slice:", filas); // Limpieza para el parser

  const alojamientos = filas.map(f => {
    //console.log("Procesando fila:", f.trim()); // revisa cada elemento
    const [
      nombre, tipo, lat, lng, telefono, wifi, cochera, carpa, activo
    ] = f.split(",");

    return {
      nombre,
      tipo,
      lat: parseFloat(lat) / 1000000,
      lng: parseFloat(lng) / 1000000,
      telefono: telefono.trim(),
      wifi: toBool(wifi),
      cochera: toBool(cochera),
      carpa: toBool(carpa),
      activo: toBool(activo)  // Asume true por defecto, ya que el filter estaba removiendo todo
    };
  });

  console.log("Alojamientos parseados:", alojamientos);  // Agrega esto
  return alojamientos;
}
*/

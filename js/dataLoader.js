/* retorno de datos de alojamientos.json; verifica fetch exitoso
const res = await fetch(URL);
const text = await res.text();
console.log(text); */

// --------- Carga de datos de alojamientos ---------
export async function cargarAlojamientos() {
  const res = await fetch("https://docs.google.com/spreadsheets/d/1cz--GRqfb9DkLJglELGpT1Y8x1yIZ66-D3JVo1HDWEk/export?format=csv");
  const text = await res.text();
  console.log("Dataset:", text);  // Vista preliminar del CSV para debug

  const filas = text.split("\n").slice(1);
  // console.log("Filas después de split y slice:", filas); // Limpieza para el parser

  const alojamientos = filas.map(f => {
    //console.log("Procesando fila:", f.trim()); // revisa cada elemento
    const [
      nombre, tipo, lat, lng, telefono, wifi, cochera, activo
    ] = f.split(",");

    return {
      nombre,
      tipo,
      lat: parseFloat(lat) / 1000000,
      lng: parseFloat(lng) / 1000000,
      telefono,
      wifi: wifi === "true",
      cochera: cochera === "true",
      activo: true  // Asume true por defecto, ya que el filter estaba removiendo todo
    };
  });

  console.log("Alojamientos parseados:", alojamientos);  // Agrega esto
  return alojamientos;
}

/* test de carga de JSON local
export async function cargarAlojamientos() {
  const res = await fetch("./data/alojamientos.json");
  const alojamientos = await res.json();
  console.log("Alojamientos desde JSON:", alojamientos);  // Agrega esto
  return alojamientos.map(a => ({
    ...a,
    wifi: a.servicios.includes("internet"),  // Ajusta según servicios
    cochera: a.servicios.includes("cochera"),
    activo: true  // Asume true
  }));
}*/
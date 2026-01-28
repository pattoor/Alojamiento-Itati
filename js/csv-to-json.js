import fs from "fs"; // node file system - ya includo en github actions

filtros = ["wifi", "cochera", "carpa", "activo"]

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      // comilla escapada ""
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result.map(v => v.trim());
}

const csv = fs.readFileSync("data/alojamientos-ITATI.csv", "utf-8");
const lines = csv.trim().split("\n");

const headers = parseCSVLine(lines.shift()); // primera línea como headers

const toBool = v => String(v).toLowerCase() === "true";

const alojamientos = lines.map(line => {
  const values = parseCSVLine(line);
  const obj = {};

  headers.forEach((h, i) => {
    let v = values[i] ?? "";

    if (filtros.includes(h)) {
      v = toBool(v);
    } else if (["lat", "lng"].includes(h)) {
      v = parseFloat(v) / 1000000 ; //formato-> numero: decimales
    } else if (h === "tipo") {
      // tipos separados por coma dentro del string
      v = v.split(",").map(t => t.trim());
    }
    obj[h] = v;
  });

  return obj;
})//.filter(a => a.activo); // filtrar solo activos

const output = {
  meta: {
    updated_at: new Date().toISOString(),
    total: alojamientos.length
  },
  alojamientos
};

fs.writeFileSync(
  "data/alojamientos.json",
  JSON.stringify(output, null, 2)
);

// Servicios HTTP hacia la API. TODO (paquetes 1.4.1 a 1.4.4): reemplazar los datos de demostración del store.
export async function obtenerSalud() {
  const respuesta = await fetch('/api/health');
  if (!respuesta.ok) throw new Error('La API no responde');
  return respuesta.json();
}

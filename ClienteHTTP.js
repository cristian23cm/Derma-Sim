// Cliente HTTP genérico hacia el proveedor de IA.
// TODO (paquete 1.4.4): adaptar la solicitud y la respuesta al proveedor elegido por el equipo.
// Contrato supuesto: POST { prompt } -> { veredicto, texto, evidencia }.
export class ClienteHTTP {
  constructor(url, clave, { timeoutMs = 30000 } = {}) {
    this.url = url;
    this.clave = clave;
    this.timeoutMs = timeoutMs;
  }

  async completar(prompt) {
    const respuesta = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.clave}` },
      body: JSON.stringify({ prompt }),
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    if (!respuesta.ok) throw new Error(`El servicio de IA respondió ${respuesta.status}`);
    return respuesta.json();
  }
}

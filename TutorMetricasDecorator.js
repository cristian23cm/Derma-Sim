// Decorator: mide el tiempo de respuesta del tutor sin tocar al adaptador (meta: 10 s o menos).
export class TutorMetricasDecorator {
  constructor(interno, metricas) {
    this.interno = interno;
    this.metricas = metricas;
  }

  async evaluar(caso, decision) {
    const t0 = Date.now();
    const resultado = await this.interno.evaluar(caso, decision);
    resultado.tiempoMs = Date.now() - t0;
    this.metricas?.registrarLatencia?.(resultado.tiempoMs);
    return resultado;
  }
}

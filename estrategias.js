// Strategy: estilo de la retroalimentación del tutor.
export class RetroExplicable {
  armarInstrucciones({ caso }) {
    return `Evalúa la decisión frente a "${caso.diagnosticoReferencia.nombre}" y explica la evidencia visual y clínica.`;
  }
}

export class RetroBreve {
  armarInstrucciones() {
    return 'Indica en tres frases si acertó y cuál fue la pista principal.';
  }
}

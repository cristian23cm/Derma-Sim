// Builder: arma la solicitud al modelo por partes y exige el diagnóstico de referencia (riesgo R4).
export class PromptBuilder {
  constructor() {
    this.partes = [];
    this.tieneReferencia = false;
  }

  conCaso(caso) {
    this.partes.push(`Caso: ${caso.historiaClinica.descripcion}`);
    return this;
  }

  conDecision(decision) {
    this.partes.push(`Decisión del estudiante: ${decision.diagnostico}`);
    return this;
  }

  conReferencia(diagnostico) {
    this.partes.push(`Diagnóstico de referencia: ${diagnostico.nombre}`);
    this.tieneReferencia = true;
    return this;
  }

  conInstrucciones(texto) {
    this.partes.push(texto);
    return this;
  }

  build() {
    if (!this.tieneReferencia) throw new Error('Falta el diagnóstico de referencia');
    return this.partes.join('\n');
  }
}

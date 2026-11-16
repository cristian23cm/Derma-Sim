import { PromptBuilder } from './PromptBuilder.js';

// Adapter: traduce evaluar(caso, decision) al formato del proveedor de IA y de vuelta.
// El negocio solo conoce { resultado, retroalimentacion, evidencia }.
export class TutorIAAdapter {
  constructor({ cliente, estrategia }) {
    this.cliente = cliente; // acceso al proveedor de IA
    this.estrategia = estrategia; // forma de la retroalimentación
  }

  async evaluar(caso, decision) {
    const prompt = new PromptBuilder()
      .conCaso(caso)
      .conDecision(decision)
      .conReferencia(caso.diagnosticoReferencia)
      .conInstrucciones(this.estrategia.armarInstrucciones({ caso }))
      .build();
    const r = await this.cliente.completar(prompt);
    return { resultado: r.veredicto, retroalimentacion: r.texto, evidencia: r.evidencia };
  }
}

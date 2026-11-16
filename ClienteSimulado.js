// Cliente de prueba: no consume el servicio de IA. Solo compara texto; NO es un modelo clínico.
export class ClienteSimulado {
  async completar(prompt) {
    const decision = /Decisión del estudiante: (.*)/.exec(prompt)?.[1]?.trim().toLowerCase();
    const referencia = /Diagnóstico de referencia: (.*)/.exec(prompt)?.[1]?.trim().toLowerCase();
    const acierto = Boolean(decision) && decision === referencia;
    return {
      veredicto: acierto ? 'correcto' : 'incorrecto',
      texto: acierto
        ? 'Tu decisión coincide con el diagnóstico de referencia. (Respuesta simulada)'
        : 'Tu decisión no coincide con el diagnóstico de referencia. (Respuesta simulada)',
      evidencia: 'Evidencia simulada para pruebas.',
    };
  }
}

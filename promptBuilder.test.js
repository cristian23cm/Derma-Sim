import test from 'node:test';
import assert from 'node:assert/strict';
import { PromptBuilder } from '../src/integraciones/tutorIA/PromptBuilder.js';

const caso = { historiaClinica: { descripcion: 'Lesión pigmentada de bordes irregulares' }, diagnosticoReferencia: { nombre: 'Melanoma' } };

test('build() sin diagnóstico de referencia lanza un error (riesgo R4)', () => {
  const builder = new PromptBuilder().conCaso(caso).conDecision({ diagnostico: 'Nevus' });
  assert.throws(() => builder.build(), /diagnóstico de referencia/);
});

test('build() con todas las partes incluye caso, decisión y referencia', () => {
  const texto = new PromptBuilder()
    .conCaso(caso)
    .conDecision({ diagnostico: 'Nevus' })
    .conReferencia(caso.diagnosticoReferencia)
    .conInstrucciones('Explica la evidencia')
    .build();
  assert.match(texto, /Lesión pigmentada/);
  assert.match(texto, /Decisión del estudiante: Nevus/);
  assert.match(texto, /Diagnóstico de referencia: Melanoma/);
});

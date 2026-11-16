import test from 'node:test';
import assert from 'node:assert/strict';
import { TutorFactorySimulado } from '../src/integraciones/tutorIA/TutorFactory.js';
import { crearTutor } from '../src/integraciones/tutorIA/index.js';

const caso = { historiaClinica: { descripcion: 'Lesión pigmentada' }, diagnosticoReferencia: { nombre: 'Melanoma' } };

test('la fábrica simulada crea un tutor que devuelve el formato interno y el tiempo de respuesta', async () => {
  const latencias = [];
  const tutor = new TutorFactorySimulado().crear({ retro: 'explicable' }, { registrarLatencia: (ms) => latencias.push(ms) });
  const r = await tutor.evaluar(caso, { diagnostico: 'Melanoma' });
  assert.equal(r.resultado, 'correcto');
  assert.ok(r.retroalimentacion && r.evidencia);
  assert.equal(typeof r.tiempoMs, 'number');
  assert.equal(latencias.length, 1);
});

test('una decisión distinta de la referencia se evalúa como incorrecta', async () => {
  const tutor = crearTutor({ proveedor: 'simulado', retro: 'breve' });
  const r = await tutor.evaluar(caso, { diagnostico: 'Nevus melanocítico' });
  assert.equal(r.resultado, 'incorrecto');
});

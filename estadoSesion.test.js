import test from 'node:test';
import assert from 'node:assert/strict';
import { Iniciada } from '../src/services/estadoSesion.js';
import { TransicionInvalida } from '../src/errores.js';

test('evaluar sin decisión registrada se rechaza', () => {
  const sesion = { estado: new Iniciada() };
  assert.equal(sesion.estado.puedeEvaluar(), false);
  assert.throws(() => sesion.estado.evaluar(sesion, {}), TransicionInvalida);
});

test('tras un fallo de la IA se puede reintentar y la decisión se conserva', () => {
  const sesion = { estado: new Iniciada() };
  sesion.estado.registrarDecision(sesion, { diagnostico: 'Nevus' });
  sesion.estado.fallarIA(sesion);
  assert.equal(sesion.estado.nombre, 'errorIA');
  sesion.estado.reintentar(sesion);
  assert.equal(sesion.estado.nombre, 'decisionRegistrada');
  assert.deepEqual(sesion.decision, { diagnostico: 'Nevus' });
});

test('el recorrido feliz termina en finalizada', () => {
  const sesion = { estado: new Iniciada() };
  sesion.estado.registrarDecision(sesion, { diagnostico: 'Nevus' });
  sesion.estado.evaluar(sesion, { resultado: 'correcto' });
  sesion.estado.finalizar(sesion);
  assert.equal(sesion.estado.nombre, 'finalizada');
});

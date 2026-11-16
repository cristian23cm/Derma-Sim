import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { SesionService } from '../src/services/SesionService.js';
import { DecisionRegistrada, Iniciada } from '../src/services/estadoSesion.js';
import { ErrorIANoDisponible, TransicionInvalida } from '../src/errores.js';

const caso = { historiaClinica: { descripcion: 'Lesión pigmentada' }, diagnosticoReferencia: { nombre: 'Melanoma' } };

function armar({ tutor, estado }) {
  const guardadas = [];
  const sesion = { casoId: 'c1', decision: { diagnostico: 'Melanoma' }, estado };
  const eventos = new EventEmitter();
  const emitidos = [];
  eventos.on('sesion.evaluada', (e) => emitidos.push(e));
  const servicio = new SesionService({
    sesiones: { obtener: async () => sesion, guardar: async (s) => guardadas.push(s.estado.nombre) },
    casos: { obtener: async () => caso },
    tutor,
    eventos,
  });
  return { servicio, sesion, guardadas, emitidos };
}

test('evaluar con éxito guarda la evaluación y emite el evento', async () => {
  const tutor = { evaluar: async () => ({ resultado: 'correcto', retroalimentacion: 'ok', evidencia: 'e', tiempoMs: 120 }) };
  const { servicio, sesion, guardadas, emitidos } = armar({ tutor, estado: new DecisionRegistrada() });
  const r = await servicio.evaluar('s1');
  assert.equal(r.resultado, 'correcto');
  assert.equal(sesion.estado.nombre, 'evaluada');
  assert.deepEqual(guardadas, ['evaluada']);
  assert.deepEqual(emitidos, [{ sesionId: 's1', tiempoMs: 120 }]);
});

test('si la IA falla, la sesión queda en errorIA y la decisión se conserva', async () => {
  const tutor = { evaluar: async () => { throw new Error('caído'); } };
  const { servicio, sesion, guardadas } = armar({ tutor, estado: new DecisionRegistrada() });
  await assert.rejects(() => servicio.evaluar('s1'), ErrorIANoDisponible);
  assert.equal(sesion.estado.nombre, 'errorIA');
  assert.deepEqual(sesion.decision, { diagnostico: 'Melanoma' });
  assert.deepEqual(guardadas, ['errorIA']);
});

test('no se evalúa una sesión sin decisión', async () => {
  const tutor = { evaluar: async () => { throw new Error('no debe llamarse'); } };
  const { servicio } = armar({ tutor, estado: new Iniciada() });
  await assert.rejects(() => servicio.evaluar('s1'), TransicionInvalida);
});

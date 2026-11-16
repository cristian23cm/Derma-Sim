import test from 'node:test';
import assert from 'node:assert/strict';
import { crearApp } from '../src/app.js';

test('GET /api/health responde ok', async () => {
  const servidor = crearApp().listen(0);
  try {
    const { port } = servidor.address();
    const r = await fetch(`http://127.0.0.1:${port}/api/health`);
    assert.equal(r.status, 200);
    const cuerpo = await r.json();
    assert.equal(cuerpo.estado, 'ok');
  } finally {
    servidor.close();
  }
});

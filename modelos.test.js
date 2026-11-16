import test from 'node:test';
import assert from 'node:assert/strict';
import { Caso, Sesion, Usuario, Diagnostico } from '../src/models/index.js';

test('los esquemas validan los campos obligatorios sin conectarse a la base de datos', () => {
  const caso = new Caso({});
  const error = caso.validateSync();
  assert.ok(error.errors.codigo && error.errors.titulo && error.errors['fuente.licencia']);
  assert.ok(new Sesion({}).validateSync().errors.estudianteId);
  assert.ok(new Usuario({ alias: 'a', rol: 'otro' }).validateSync().errors.rol);
  assert.ok(new Diagnostico({}).validateSync().errors.codigo);
});

import { TutorFactoryReal, TutorFactorySimulado } from './TutorFactory.js';

// Devuelve el tutor listo para usar según la configuración (TUTOR_PROVEEDOR).
export function crearTutor(configTutor, metricas) {
  const fabrica = configTutor.proveedor === 'real' ? new TutorFactoryReal() : new TutorFactorySimulado();
  return fabrica.crear(configTutor, metricas);
}

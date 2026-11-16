import { ErrorIANoDisponible, TransicionInvalida } from '../errores.js';

// Facade: expone la práctica de un caso y coordina casos, sesiones, tutor y eventos.
// Recibe sus dependencias por el constructor, lo que permite probarlo con objetos falsos.
export class SesionService {
  constructor({ sesiones, casos, tutor, eventos }) {
    Object.assign(this, { sesiones, casos, tutor, eventos });
  }

  async evaluar(id) {
    const sesion = await this.sesiones.obtener(id);
    if (sesion.estado.nombre === 'errorIA') sesion.estado.reintentar(sesion);
    if (!sesion.estado.puedeEvaluar()) {
      throw new TransicionInvalida('La sesión no está lista para evaluarse: falta registrar la decisión');
    }
    const caso = await this.casos.obtener(sesion.casoId);
    let resultado;
    try {
      resultado = await this.tutor.evaluar(caso, sesion.decision);
    } catch {
      sesion.estado.fallarIA(sesion);
      await this.sesiones.guardar(sesion); // la decisión se conserva
      throw new ErrorIANoDisponible();
    }
    sesion.estado.evaluar(sesion, resultado);
    await this.sesiones.guardar(sesion);
    this.eventos.emit('sesion.evaluada', { sesionId: id, tiempoMs: resultado.tiempoMs });
    return resultado;
  }
}

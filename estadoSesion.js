import { TransicionInvalida } from '../errores.js';

// State: ciclo de vida de la sesión (iniciada -> decisionRegistrada -> evaluada -> finalizada; errorIA).
class EstadoBase {
  puedeEvaluar() {
    return false;
  }
  registrarDecision() {
    throw new TransicionInvalida(`No se puede registrar la decisión en el estado "${this.nombre}"`);
  }
  evaluar() {
    throw new TransicionInvalida(`No se puede evaluar en el estado "${this.nombre}"`);
  }
  fallarIA() {
    throw new TransicionInvalida(`El estado "${this.nombre}" no admite un fallo de la IA`);
  }
  reintentar() {
    throw new TransicionInvalida(`El estado "${this.nombre}" no admite reintentos`);
  }
  finalizar() {
    throw new TransicionInvalida(`No se puede finalizar en el estado "${this.nombre}"`);
  }
}

export class Iniciada extends EstadoBase {
  nombre = 'iniciada';
  registrarDecision(sesion, decision) {
    sesion.decision = decision;
    sesion.estado = new DecisionRegistrada();
  }
}

export class DecisionRegistrada extends EstadoBase {
  nombre = 'decisionRegistrada';
  puedeEvaluar() {
    return true;
  }
  evaluar(sesion, resultado) {
    sesion.evaluacion = resultado;
    sesion.estado = new Evaluada();
  }
  fallarIA(sesion) {
    sesion.estado = new ErrorIA(); // la decisión se conserva
  }
}

export class ErrorIA extends EstadoBase {
  nombre = 'errorIA';
  reintentar(sesion) {
    sesion.estado = new DecisionRegistrada();
  }
}

export class Evaluada extends EstadoBase {
  nombre = 'evaluada';
  finalizar(sesion) {
    sesion.estado = new Finalizada();
  }
}

export class Finalizada extends EstadoBase {
  nombre = 'finalizada';
}

export const ESTADOS = { iniciada: Iniciada, decisionRegistrada: DecisionRegistrada, errorIA: ErrorIA, evaluada: Evaluada, finalizada: Finalizada };

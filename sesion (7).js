import { defineStore } from 'pinia';

// Estado de la práctica (Observer: los componentes reaccionan a los cambios de este store).
// Los datos son de DEMOSTRACIÓN: no son un caso clínico real.
const CASO_DEMO = {
  codigo: 'DEMO-001',
  historiaClinica: 'Caso de demostración para probar la interfaz. Sustituir por casos reales del banco (paquete 1.4.6).',
  imagen: null,
};

export const useSesionStore = defineStore('sesion', {
  state: () => ({ estado: 'inicio', caso: null, decision: '', evaluacion: null }),
  actions: {
    iniciar() {
      this.caso = CASO_DEMO;
      this.decision = '';
      this.evaluacion = null;
      this.estado = 'caso';
    },
    registrarDecision(texto) {
      this.decision = texto;
      this.estado = 'decisionRegistrada';
    },
    async evaluar() {
      // TODO (paquete 1.4.4): llamar a POST /api/sesiones/:id/evaluacion
      this.evaluacion = { resultado: 'pendiente', retroalimentacion: 'Aquí se mostrará la retroalimentación del tutor.' };
      this.estado = 'evaluada';
    },
  },
});

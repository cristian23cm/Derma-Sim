import { TutorIAAdapter } from './TutorIAAdapter.js';
import { TutorMetricasDecorator } from './TutorMetricasDecorator.js';
import { RetroBreve, RetroExplicable } from './estrategias.js';
import { ClienteHTTP } from './ClienteHTTP.js';
import { ClienteSimulado } from './ClienteSimulado.js';

// Factory Method: la fábrica fija los pasos de la creación y las subclases eligen el cliente.
export class TutorFactory {
  crearCliente() {
    throw new Error('Lo define cada fábrica concreta');
  }

  crear(config, metricas) {
    const adapter = new TutorIAAdapter({
      cliente: this.crearCliente(config),
      estrategia: config.retro === 'breve' ? new RetroBreve() : new RetroExplicable(),
    });
    return new TutorMetricasDecorator(adapter, metricas);
  }
}

export class TutorFactoryReal extends TutorFactory {
  crearCliente(config) {
    return new ClienteHTTP(config.urlIA, config.claveIA);
  }
}

export class TutorFactorySimulado extends TutorFactory {
  crearCliente() {
    return new ClienteSimulado();
  }
}

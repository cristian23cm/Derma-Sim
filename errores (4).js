export class TransicionInvalida extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = 'TransicionInvalida';
    this.status = 409;
  }
}

export class ErrorIANoDisponible extends Error {
  constructor() {
    super('El servicio de IA no está disponible. Puedes reintentar sin perder tu decisión.');
    this.name = 'ErrorIANoDisponible';
    this.status = 503;
  }
}

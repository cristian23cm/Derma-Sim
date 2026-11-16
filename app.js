import express from 'express';
import cors from 'cors';
import healthRouter from './routes/health.js';
import { manejarErrores } from './middleware/errores.js';

// Capa de API: rutas REST. Las rutas de casos, sesiones y métricas se agregan en la etapa
// de Construcción (paquetes 1.4.2 a 1.4.5 de la EDT).
export function crearApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api/health', healthRouter);
  app.use(manejarErrores);
  return app;
}

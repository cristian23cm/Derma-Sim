import { Router } from 'express';

// Chain of Responsibility (informe de patrones, sección 5.3.1).
// TODO (paquete 1.4.3): reemplazar la lectura de req.usuario por la verificación real de credenciales.
export function autenticar(req, res, next) {
  if (!req.usuario) return res.status(401).json({ error: 'Se requiere iniciar sesión' });
  return next();
}

export function requerirRol(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.usuario?.rol)) return res.status(403).json({ error: 'Rol no autorizado' });
    return next();
  };
}

export const _router = Router; // reservado para agrupar rutas protegidas

// Último eslabón de la cadena de middleware: convierte los errores en respuestas JSON.
export function manejarErrores(err, _req, res, _next) {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Error interno del servidor' });
}

# API de Derma-Sim

Servicio REST en Node.js + Express. Sigue la arquitectura en capas del proyecto (ver `docs/`):

```
src/
├── routes/            Capa de API (rutas REST)
├── middleware/        Cadena de middleware (errores, seguridad)
├── services/          Lógica de negocio: SesionService (fachada) y estadoSesion (State)
├── integraciones/
│   └── tutorIA/       Subsistema del tutor de IA: Adapter, Factory Method, Strategy, Decorator, Builder
├── models/            Esquemas de MongoDB (usuarios, diagnosticos, casos, sesiones)
└── config/            Configuración y conexión a la base de datos
```

## Ejecutar

```bash
cd server
cp .env.example .env      # complete los valores
npm install
npm test                  # pruebas unitarias (node:test)
npm run dev               # API en http://localhost:3000
```

Sin `MONGODB_URI` la API inicia igual (solo expone `GET /api/health`). Con `TUTOR_PROVEEDOR=simulado`
el tutor responde sin consumir el servicio de IA.

## Pendiente por paquete de la EDT

| Paquete | Pendiente |
|---|---|
| 1.4.1 y 1.4.3 | Rutas de casos y sesiones; repositorios de Mongoose; credenciales reales (`middleware/seguridad.js`) |
| 1.4.4 | Adaptar `ClienteHTTP` al proveedor de IA elegido |
| 1.4.5 | Registro de métricas por sesión (suscripción al evento `sesion.evaluada`) |
| 1.4.6 | Carga del banco inicial de casos (con fuente y licencia verificadas) |

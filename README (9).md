# Interfaz web de Derma-Sim

Aplicación de una sola página con Vue 3, Pinia y Vue Router.

```bash
cd client
npm install
npm run dev      # http://localhost:5173 (las llamadas a /api se redirigen a http://localhost:3000)
npm run build    # compilación para despliegue
```

Las vistas actuales (`InicioView`, `CasoView`, `ResultadoView`) usan datos de **demostración**; se conectan a la API en la
etapa de Construcción (paquetes 1.4.1 y 1.4.2). El aviso de uso educativo (`AvisoUsoEducativo`) debe permanecer visible.

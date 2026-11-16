# Derma-Sim

**Simulador clínico de casos dermatológicos con agente tutor de IA.**
Proyecto académico de la Universidad Santiago de Cali (USC) · Facultad de Ingeniería · Ingeniería de Sistemas · línea ONCO-SIM.

> **Aviso de uso educativo:** Derma-Sim no diagnostica pacientes reales y no sustituye el criterio clínico. La evaluación y la
> retroalimentación las genera una inteligencia artificial.

## ¿Qué hace?
El estudiante de ciencias de la salud analiza un caso dermatológico (historia clínica e imagen dermatoscópica), propone su
diagnóstico y recibe una evaluación con **retroalimentación explicable** de un agente tutor de IA. El sistema registra
métricas de cada sesión (coherencia, pertinencia y tiempo de respuesta) para apoyar la revisión clínica.

**Fuera del alcance de esta versión:** uso clínico real, datos de pacientes reales, entrenamiento de modelos de IA propios, otras
especialidades, integraciones institucionales y aplicaciones móviles nativas.

## Tecnologías (propuesta de diseño)
| Capa | Tecnología |
|---|---|
| Presentación | Vue 3, Pinia, Vue Router (Vite) |
| API | Node.js, Express |
| Datos | MongoDB (Mongoose) |
| Tutor de IA | Servicio de IA generativa externo, siempre mediante un adaptador |
| Despliegue | Railway (PaaS) y GitHub Actions para integración continua |

## Diseño de la interfaz
Prototipo y pantallas de la interfaz en Figma: [Derma-Sim en Figma](https://www.figma.com/design/wPYIHqBJjgnFinKgN0upEv/Derma-Sim?node-id=0-1&t=6zXniUoQ0qKCAXAq-1).
Detalle en [`docs/diseno/figma.md`](docs/diseno/figma.md).

## Estructura del repositorio
```
derma-sim/
├── client/        Interfaz web (Vue 3)
├── server/        API REST, modelos, servicios y subsistema del tutor de IA (con pruebas)
├── docs/          Documentación del proyecto (gestión y diseño, enlace al diseño en Figma) y datos de planeación
├── scripts/       Utilidades (creación de Issues y Milestones en GitHub)
└── .github/       Integración continua y plantillas de Issues y Pull Requests
```

## Cómo ejecutarlo
Requisitos: Node.js 20 o superior y una instancia de MongoDB (local o en la nube).

```bash
# 1. API
cd server
cp .env.example .env        # complete MONGODB_URI y, si aplica, IA_URL e IA_CLAVE
npm install
npm test                    # pruebas
npm run dev                 # http://localhost:3000/api/health

# 2. Interfaz (en otra terminal)
cd client
npm install
npm run dev                 # http://localhost:5173
```

## Hitos planificados
| Hito | Semana | Fecha (viernes) |
|---|---|---|
| 001 Acta de Constitución aprobada | S1 | 02/10/2026 |
| 002 Plan de gestión y cronograma aprobados | S2 | 09/10/2026 |
| 003 Análisis completo | S3 | 16/10/2026 |
| 004 Diseño completo | S4 | 23/10/2026 |
| 005 Primera versión funcional | S6 | 06/11/2026 |
| 006 Aplicativo integrado | S7 | 13/11/2026 |
| 007 Pruebas completas | S8 | 20/11/2026 |
| 008 Documentación entregada | S9 | 27/11/2026 |
| 009 Entrega y sustentación final | S10 | 04/12/2026 |

Fechas indicativas hasta confirmar el calendario académico. El estado real está en **Milestones** y **Projects** de este repositorio.

## Gestión del proyecto
- Metodología: PMBOK (6.ª ed.) para la gestión y TSP para el desarrollo (Análisis, Diseño, Construcción y Pruebas).
- Documentos: ver [`docs/README.md`](docs/README.md).
- Cómo colaborar: ver [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Equipo
| Integrante | Rol |
|---|---|
| Cristian Orlando Lasso Mulato | Líder del equipo, Director de Proyecto y Planeador |
| Jhon Steven Buitrago Quitiaquez | Analista |
| Harold Alexis Idrobo Puertocarrero | Desarrollador |
| Jacobo Restrepo Cadavid | Desarrollador |
| Juan Pablo Nieto Cobo | Tester |

Aprobador académico: Docente de Gestión de Proyectos TI (USC).

## Licencia
Por definir por el equipo y el docente (proyecto académico). Hasta entonces, todos los derechos quedan reservados a sus autores.

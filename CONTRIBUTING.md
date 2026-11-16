# Guía de contribución

Derma-Sim se desarrolla con **TSP** dentro de un calendario de 10 semanas. Esta guía resume el flujo de trabajo del equipo.

## Ramas
- `main`: siempre estable y desplegable. Se protege: solo se cambia mediante Pull Request.
- Ramas de trabajo: `feat/<id>-<tema>`, `fix/<id>-<tema>`, `docs/<tema>`, `test/<tema>`.
  Ejemplo: `feat/1023-visor-casos` (el ID es el de la Lista de Actividades).

## Commits
Mensajes en español, en imperativo y con prefijo: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`.
Ejemplo: `feat: agrega el visor de casos con historia clínica e imagen`.

## Pull Requests
1. Cree la rama desde `main`, haga cambios pequeños y súbala.
2. Abra el Pull Request con la plantilla y enlace la tarea (`Cierra #N`).
3. Se requiere **revisión entre pares**: al menos un integrante distinto del autor debe aprobarlo.
4. La integración continua (`CI`) debe pasar antes de fusionar.
5. Fusione con *Squash and merge* y borre la rama.

## Definición de terminado
Código revisado, pruebas que pasan, documentación actualizada, sin secretos ni datos de pacientes y con fuente y licencia
registradas para cualquier imagen o caso.

## Seguimiento
- Las tareas están en **Issues**, los hitos en **Milestones** y el tablero en **Projects**.
- Registre el tiempo y los defectos en las bitácoras TSP (`LOGT` y `LOGD`) o en Process Dashboard.
- Un cambio que afecte el alcance, un hito o un criterio de éxito requiere solicitud de cambio aprobada por el docente
  (ver `docs/gestion/`).

## Datos sensibles
Nunca suba `.env`, claves de API ni datos que identifiquen a una persona. Solo se usan casos desidentificados, públicos o
suministrados por el docente (Ley 1581 de 2012 y Decreto 1377 de 2013).

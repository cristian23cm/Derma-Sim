#!/usr/bin/env bash
# Crea en GitHub las etiquetas, los Milestones (hitos 001 a 009) y los Issues (42 actividades) de Derma-Sim.
# Requisitos: GitHub CLI (https://cli.github.com) autenticado con `gh auth login`.
# Uso:           scripts/crear-issues.sh USUARIO/derma-sim
# Solo mostrar:  DRY_RUN=1 scripts/crear-issues.sh USUARIO/derma-sim
set -euo pipefail

REPO="${1:?Uso: scripts/crear-issues.sh USUARIO/derma-sim}"
DRY="${DRY_RUN:-0}"
cd "$(dirname "$0")/.."

run() {
  if [ "$DRY" = "1" ]; then printf '+ %q ' "$@"; printf '\n'; else "$@"; fi
}

echo "== Etiquetas"
while IFS='|' read -r nombre color descripcion; do
  [ -z "$nombre" ] && continue
  run gh label create "$nombre" --repo "$REPO" --color "$color" --description "$descripcion" --force
done < scripts/etiquetas.txt

echo "== Milestones (hitos)"
while IFS=$'\t' read -r titulo vence descripcion; do
  [ -z "$titulo" ] && continue
  run gh api -X POST "repos/$REPO/milestones" -f title="$titulo" -f due_on="$vence" -f description="$descripcion" --silent || echo "   (ya existe: $titulo)"
done < docs/planeacion/hitos.tsv

echo "== Issues (actividades)"
while IFS=$'\t' read -r id titulo paquete fase responsable semana hito estado descripcion; do
  [ -z "$id" ] && continue
  cuerpo="$descripcion

**ID de la actividad:** $id
**Paquete EDT:** $paquete
**Responsable (principal y alterno):** $responsable
**Semana planificada:** $semana
**Hito:** $hito"
  if [ "$DRY" = "1" ]; then
    printf '+ gh issue create --repo %q --title %q --label %q --milestone %q  [estado: %s]\n' "$REPO" "$titulo" "tsp,fase:$fase" "$hito" "$estado"
  else
    url="$(gh issue create --repo "$REPO" --title "$titulo" --body "$cuerpo" --label "tsp,fase:$fase" --milestone "$hito")"
    echo "   $url"
    if [ "$estado" = "cerrada" ]; then
      gh issue close "$url" --repo "$REPO" --reason completed --comment "Documento elaborado (ver docs/gestion/)."
    fi
  fi
done < docs/planeacion/actividades.tsv

echo "Listo. Cree el tablero en la pestaña Projects del repositorio y agregue los Issues (ver README)."

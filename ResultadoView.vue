<script setup>
import { useRouter } from 'vue-router';
import { useSesionStore } from '../stores/sesion.js';

const sesion = useSesionStore();
const router = useRouter();

function otroCaso() {
  sesion.iniciar();
  router.push({ name: 'caso' });
}
</script>

<template>
  <section v-if="sesion.evaluacion">
    <h1>Resultado</h1>
    <p><strong>Tu decisión:</strong> {{ sesion.decision }}</p>
    <div class="panel">
      <h2>Retroalimentación</h2>
      <p>{{ sesion.evaluacion.retroalimentacion }}</p>
      <p class="etiqueta-ia">Evaluación y retroalimentación generadas por una IA</p>
    </div>
    <button class="boton" @click="otroCaso">Practicar otro caso</button>
  </section>
  <p v-else>Aún no hay un resultado.</p>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSesionStore } from '../stores/sesion.js';

const sesion = useSesionStore();
const router = useRouter();
const decision = ref('');

async function enviar() {
  sesion.registrarDecision(decision.value);
  await sesion.evaluar();
  router.push({ name: 'resultado' });
}
</script>

<template>
  <section v-if="sesion.caso" class="caso">
    <div class="panel">
      <h2>Historia clínica</h2>
      <p>{{ sesion.caso.historiaClinica }}</p>
    </div>
    <div class="panel">
      <h2>Imagen dermatoscópica</h2>
      <div class="imagen-vacia">La imagen del caso se mostrará aquí</div>
    </div>
    <div class="panel completo">
      <h2>Tu decisión diagnóstica</h2>
      <input v-model="decision" placeholder="Escribe o selecciona tu diagnóstico" />
      <button class="boton" :disabled="!decision" @click="enviar">Enviar para evaluación</button>
    </div>
  </section>
  <p v-else>Primero inicia una práctica desde el inicio.</p>
</template>

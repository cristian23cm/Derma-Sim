<script setup>
import { useRouter } from 'vue-router';
import { useSesionStore } from '../stores/sesion.js';

const sesion = useSesionStore();
const router = useRouter();

function iniciar() {
  sesion.iniciar();
  router.push({ name: 'caso' });
}
</script>

<template>
  <section>
    <h1>Practica tu razonamiento clínico dermatológico</h1>
    <p>Analiza un caso, propone tu diagnóstico y recibe una retroalimentación explicable generada por una IA.</p>
    <button class="boton" @click="iniciar">Iniciar práctica</button>
  </section>
</template>

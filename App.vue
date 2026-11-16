<script setup>
import AvisoUsoEducativo from './components/AvisoUsoEducativo.vue';
</script>

<template>
  <header class="barra">
    <RouterLink to="/" class="marca">Derma-Sim</RouterLink>
  </header>
  <main class="contenido">
    <AvisoUsoEducativo />
    <RouterView />
  </main>
</template>

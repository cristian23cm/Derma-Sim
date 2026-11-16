import { createRouter, createWebHistory } from 'vue-router';
import InicioView from '../views/InicioView.vue';
import CasoView from '../views/CasoView.vue';
import ResultadoView from '../views/ResultadoView.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'inicio', component: InicioView },
    { path: '/caso', name: 'caso', component: CasoView },
    { path: '/resultado', name: 'resultado', component: ResultadoView },
  ],
});

<!-- src/App.vue -->

<template>
  <div id="obf-pws">
    <app-header></app-header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    'app-header': Header
  },
};
</script>

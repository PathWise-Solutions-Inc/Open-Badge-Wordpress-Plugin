<!-- src/components/Header.vue -->

<template>
  <header class="app-header">
    <h1 class="app-title">Pathwise Badge Connect</h1>
    <h2 class="app-sub-title">by Pathwise Solutions Inc.</h2>
    <admin-notices></admin-notices>
    <nav-bar></nav-bar>
  </header>
</template>

<script>
import NavBar from './NavBar.vue';
import AdminNotices from './AdminNotices.vue';

export default {
  name: 'Header',
  components: {
    NavBar,
    AdminNotices
  },
};
</script>

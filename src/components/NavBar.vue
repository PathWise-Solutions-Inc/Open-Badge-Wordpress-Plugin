<template>
  <nav class="nav-bar">
    <ul>
      <li>
        <router-link
            :to="{ path: '/wp-admin/admin.php', query: { page: 'obf-pws-badges' } }"
            :class="{ active: isActiveTab('') }"
        >
          Badges
        </router-link>
      </li>
      <li>
        <router-link
            :to="{ path: '/wp-admin/admin.php', query: { page: 'obf-pws-badges', tab: 'triggers' } }"
            :class="{ active: isActiveTab('triggers') }"
        >
          Triggers
        </router-link>
      </li>
      <li>
        <router-link
            :to="{ path: '/wp-admin/admin.php', query: { page: 'obf-pws-badges', tab: 'settings' } }"
            :class="{ active: isActiveTab('settings') }"
        >
          Settings
        </router-link>
      </li>
      <li>
        <router-link
            :to="{ path: '/wp-admin/admin.php', query: { page: 'obf-pws-badges', tab: 'log' } }"
            :class="{ active: isActiveTab('log') }"
        >
          Log
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    currentTab() {
      return this.$route.query.tab || '';
    },
  },
  methods: {
    isActiveTab(tab) {
      return this.currentTab === tab;
    },
  },
};
</script>

<style scoped>
.nav-bar a.active {
  background-color: var(--nav-text-color);
  color: var(--background-color);
}
</style>

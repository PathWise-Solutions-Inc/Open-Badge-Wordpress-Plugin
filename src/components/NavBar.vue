<template>
  <nav class="nav-bar">
    <ul>
      <li>
        <router-link
            :to="{ query: { tab: 'badges' } }"
        :class="{ active: isActiveTab('badges') }"
        >
        Badges
        </router-link>
      </li>
      <li>
        <router-link
            :to="{ query: { tab: 'triggers' } }"
        :class="{ active: isActiveTab('triggers') }"
        >
        Triggers
        </router-link>
      </li>
      <li>
        <router-link
            :to="{ query: { tab: 'settings' } }"
        :class="{ active: isActiveTab('settings') }"
        >
        Settings
        </router-link>
      </li>
      <li>
        <router-link
            :to="{ query: { tab: 'log' } }"
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
      // Reads the 'tab' query parameter from the Vue router's current route state (from the hash)
      return this.$route.query.tab || 'badges'; // Default to 'badges'
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
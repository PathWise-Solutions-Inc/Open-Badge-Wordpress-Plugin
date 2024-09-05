<!-- src/components/AdminNotices.vue -->

<template>
  <div class="admin-notices">
    <transition-group name="notice" tag="div">
      <div
          v-for="notice in activeNotices"
          :key="notice.id"
          :class="['notice-card', notice.type.toLowerCase()]"
      >
        <div class="notice-header">
          <div class="notice-title">{{ notice.subject }}</div>
          <button class="dismiss-button" @click="dismissNotice(notice.id)">
            <span class="dismiss-label">Dismiss</span>
            <font-awesome-icon icon="times" />
          </button>
        </div>
        <div class="notice-content">
          <div class="notice-description">{{ notice.description }}</div>
          <div v-if="notice.action" class="notice-action">
            <a :href="notice.action" class="action-button">Take Action</a>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AdminNotices',
  computed: {
    ...mapState(['notices']),
    activeNotices() {
      return this.notices.filter(notice => notice.status);
    }
  },
  methods: {
    ...mapActions(['fetchNotices', 'dismissNotice']),
    async loadNotices() {
      await this.fetchNotices();
    },
    async dismissNotice(id) {
      await this.$store.dispatch('dismissNotice', id);
    }
  },
  mounted() {
    this.loadNotices();
  }
};
</script>

<style scoped>
.admin-notices {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}

.notice-card {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid;
  border-left: 5px solid;
  background-color: var(--background-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.notice-card.notice {
  border-color: blue;
}

.notice-card.success {
  border-color: green;
}

.notice-card.error {
  border-color: red;
}

.notice-card.warning {
  border-color: yellow;
}

.notice-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.notice-title {
  font-weight: bold;
  margin: 0;
}

.notice-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 5px;
}

.notice-description {
  flex: 1;
}

.notice-action {
  flex: 0 0 auto;
  display: flex;
  align-items: flex-end;
}

.dismiss-button {
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.dismiss-label {
  font-size: 12px;
  font-weight: normal;
  text-transform: uppercase;
  color: transparent;
  transition: color 0.3s;
  left: 10px;
  top: 5px;
}

.dismiss-button:hover .dismiss-label {
  color: var(--primary-color);
}

.dismiss-button:hover svg {
  color: var(--primary-color);
}

.action-button {
  background-color: var(--primary-color);
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: var(--secondary-color);
}

.notice-enter-active, .notice-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.notice-enter, .notice-leave-to /* .notice-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

<template>
  <div class="badges-page">
    <div class="badges-header">
      <input
          v-model="searchQuery"
          placeholder="Search badges..."
          class="search-input"
      />
      <button @click="syncBadges" class="sync-button" :disabled="syncing">
        <font-awesome-icon v-if="syncing" icon="spinner" spin />
        {{ syncing ? 'Syncing...' : 'Sync Badges' }}
      </button>
    </div>

    <div v-if="loading" class="spinner-container">
      <font-awesome-icon icon="spinner" spin class="loading-spinner" />
    </div>
    <div v-else>
      <div v-if="filteredBadges.length > 0">
        <div v-for="badge in filteredBadges" :key="badge.id" class="badge-card">
          <div class="badge-left">
            <img :src="badge.image" alt="Badge Image" class="badge-image" />
          </div>
          <div class="badge-right">
            <h2 class="badge-name">
              {{ badge.name }}
              <span v-if="badge.alt_language.length > 0 && badge.alt_language !== 'N/A'" class="badge-pill language-pill">{{ badge.alt_language.join(', ') }}</span>
              <span v-if="badge.category.length > 0" class="badge-pill category-pill">{{ badge.category.join(', ') }}</span>
              <span v-if="parseInt(badge.expires) === 1" class="badge-pill expiry-pill">Expires after 1 day</span>
              <span v-else-if="parseInt(badge.expires) > 1" class="badge-pill expiry-pill">Expires after {{ badge.expires }} days</span>
            </h2>
            <p class="badge-description">
              {{ badge.description.length > 380 ? badge.description.slice(0, 370) + '...' : badge.description }}
            </p>
          </div>
        </div>
      </div>
      <p v-else>No badges found. Please sync to load badges.</p>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { mapGetters, mapActions } from 'vuex';

library.add(faSpinner);

export default {
  name: 'Badges',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      syncing: false,
      searchQuery: '',
      loading: true, // Added loading state
    };
  },
  computed: {
    ...mapGetters(['getBadges']),
    badges() {
      return this.getBadges;
    },
    filteredBadges() {
      return this.badges.filter((badge) =>
          badge.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions(['fetchBadges']),
    async syncBadges() {
      this.syncing = true;
      try {
        const response = await fetch('/wp-json/obf-pws/v1/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'obf-api-key': '9b255783-6844-42f6-be24-3ac62c178859',
            'X-WP-Nonce': obfOptions.nonce,
          },
        });

        if (!response.ok) {
          throw new Error(`Sync failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          await this.fetchBadges();
        } else {
          alert('Failed to sync badges: ' + (data.message || 'Unknown error'));
        }
      } catch (error) {
        alert('An error occurred while syncing badges: ' + error.message);
        console.error('Sync Error:', error);
      } finally {
        this.syncing = false;
      }
    }
  },
  async mounted() {
    this.loading = true;
    await this.fetchBadges();
    this.loading = false; // Hide the spinner once badges are loaded
  },
};
</script>

<style scoped>
.badges-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 300px;
}

.sync-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.sync-button:disabled {
  background-color: grey;
  cursor: not-allowed;
}

.badge-card {
  display: flex;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.badge-left {
  flex: 0 0 128px;
}

.badge-image {
  width: 128px;
  height: 128px;
  object-fit: contain;
  border-radius: 8px;
}

.badge-right {
  flex: 1;
  padding-left: 20px;
}

.badge-name {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 10px;
}

.badge-description {
  font-size: 16px;
  margin-bottom: 10px;
}

.badge-pill {
  display: inline-block;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  color: white;
  position: relative;
  top: -4px; /* Adjust this value to align the pill vertically */
}

.language-pill {
  background-color: #3498db;
}

.category-pill {
  background-color: #9b59b6;
}

.expiry-pill {
  background-color: #e74c3c;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* Add more space above and below the spinner */
}

.loading-spinner {
  font-size: 3rem; /* Larger spinner */
  color: var(--primary-color);
}
</style>
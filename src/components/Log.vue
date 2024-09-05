<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." class="search-input" />

    <div v-if="loading" class="spinner-container">
      <font-awesome-icon icon="spinner" spin class="loading-spinner" />
    </div>
    <div v-else>
      <div v-if="filteredLogs.length > 0">
        <table class="log-table">
          <thead>
          <tr>
            <th @click="sortBy('id')">ID</th>
            <th @click="sortBy('user_name')">User</th>
            <th @click="sortBy('badge_name')">Badge</th>
            <th @click="sortBy('type')">Type</th>
            <th @click="sortBy('message')">Message</th>
            <th @click="sortBy('post_title')">Where</th>
            <th @click="sortBy('created_at')">When</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="log in filteredLogs" :key="log.id">
            <td>{{ log.id }}</td>
            <td><a :href="getUserLink(log.user_id)">{{ log.user_name }}</a></td>
            <td><a :href="getBadgeLink(log.badge_id)">{{ log.badge_name }}</a></td>
            <td>{{ log.type }}</td>
            <td>{{ log.message }}</td>
            <td>
              <a :href="getPostLink(log.post_id)" v-if="log.post_id">{{ log.post_title }}</a>
              <span v-else><a href="/wp-admin/admin.php?page=obf-pws-badges">Badge Admin</a></span>
            </td>
            <td>{{ formatDate(log.created_at) }}</td>
          </tr>
          </tbody>
        </table>

        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>

      <div v-else class="no-entries">
        There are currently no entries in the log.
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { mapActions } from 'vuex';

library.add(faSpinner);

export default {
  name: 'Log',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      logs: [],
      searchQuery: '',
      sortColumn: 'created_at',
      sortOrder: 'desc',
      currentPage: 1,
      perPage: 10,
      loading: true, // Added loading state
    };
  },
  computed: {
    filteredLogs() {
      // Ensure logs is an array before sorting and filtering
      if (!Array.isArray(this.logs)) {
        return [];
      }

      let filtered = [...this.logs]; // Make a copy of the array

      // Global search filter
      if (this.searchQuery) {
        filtered = filtered.filter(log =>
            Object.values(log).some(value =>
                String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
            )
        );
      }

      // Sorting
      filtered = filtered.sort((a, b) => {
        const modifier = this.sortOrder === 'asc' ? 1 : -1;
        if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier;
        if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier;
        return 0;
      });

      // Pagination
      const start = (this.currentPage - 1) * this.perPage;
      const end = this.currentPage * this.perPage;
      return filtered.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.logs.length / this.perPage);
    }
  },
  methods: {
    ...mapActions(['fetchLogs']),
    async loadLogs() {
      this.loading = true;
      try {
        const response = await this.fetchLogs();

        // Check if response contains logs and map them to this.logs
        if (response && Array.isArray(response)) {
          this.logs = response; // Assign the entire response directly to logs
        } else {
          console.error('Unexpected response format:', response);
          this.logs = []; // Set to empty if the response is unexpected
        }
      } finally {
        this.loading = false;
      }
    },
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortOrder = 'asc';
      }
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    formatDate(date) {
      const options = {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
      return new Date(date).toLocaleDateString('en-US', options);
    },
    getBadgeLink(badgeId) {
      return badgeId ? `/wp-admin/admin.php?page=obf-pws-badges` : '#';
    },
    getPostLink(postId) {
      return postId ? `/wp-admin/post.php?post=${postId}&action=edit` : '#';
    },
    getUserLink(userId) {
      return userId ? `/wp-admin/user-edit.php?user_id=${userId}` : '#';
    }
  },
  async mounted() {
    await this.loadLogs();
  }
};
</script>

<style scoped>
.log-table {
  width: 100%;
  border-collapse: collapse;
}

.log-table th,
.log-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.log-table th {
  background-color: #f4f4f4;
  cursor: pointer;
}

.log-table th:hover {
  background-color: #e2e2e2;
}

.search-input {
  margin-bottom: 15px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.pagination button {
  padding: 8px 12px;
  cursor: pointer;
}

.no-entries {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  padding: 50px 0;
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

<template>
  <div>
    <div class="filter-buttons">
      <button
          :class="{ active: selectedFilter === 'all' }"
          @click="setFilter('all')"
      >
        All
      </button>
      <button
          :class="{ active: selectedFilter === 'admin' }"
          @click="setFilter('admin')"
      >
        Admin
      </button>
      <button
          :class="{ active: selectedFilter === 'users' }"
          @click="setFilter('users')"
      >
        Users
      </button>

      <button
          class="export-button"
          @click="exportToCSV"
      >
        Export to CSV
      </button>

      <!-- New Clear Log Button -->
      <button
          class="clear-log-button"
          @click="clearLog"
      >
        Clear Log
      </button>
    </div>


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
              <span v-else><a href="/wp-admin/admin.php?page=pathwise-badge-connect">Badge Admin</a></span>
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
      loading: true,
      selectedFilter: 'all',
    };
  },
  computed: {
    filteredLogs() {
      if (!Array.isArray(this.logs)) {
        return [];
      }

      let filtered = [...this.logs];

      // Filter by selectedFilter
      if (this.selectedFilter === 'admin') {
        filtered = filtered.filter(log => log.post_id === '');
      } else if (this.selectedFilter === 'users') {
        filtered = filtered.filter(log => log.post_id !== '');
      }

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
      // Calculate total pages based on filtered logs (not paginated)
      let filtered = [...this.logs];

      if (this.selectedFilter === 'admin') {
        filtered = filtered.filter(log => log.post_id === '');
      } else if (this.selectedFilter === 'users') {
        filtered = filtered.filter(log => log.post_id !== '');
      }

      if (this.searchQuery) {
        filtered = filtered.filter(log =>
            Object.values(log).some(value =>
                String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
            )
        );
      }

      return Math.ceil(filtered.length / this.perPage);
    }
  },
  methods: {
    ...mapActions(['fetchLogs']),
    async exportToCSV() {
      this.loading = true;
      try {
        // Make a request to the backend route
        const response = await fetch('/wp-json/pathwise-badge-connect/v1/export-logs', {
          method: 'GET',
          headers: {
            'X-WP-Nonce': pbcOptions.nonce,
            'pbc-api-key': pbcOptions.pbcApiKey,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to export CSV: ${response.statusText}`);
        }

        // Convert response to a Blob
        const blob = await response.blob();

        // Create a link element to trigger the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'logs-export.csv');
        document.body.appendChild(link);
        link.click();

        // Clean up the link element
        link.parentNode.removeChild(link);
      } catch (error) {
        console.error('Error exporting CSV:', error);
        alert('Failed to export logs. Please try again.');
      } finally {
        this.loading = false;
      }
    },
    async clearLog() {
      const confirmed = confirm("Are you sure you want to clear all logs?");
      if (!confirmed) return;

      this.loading = true;
      try {
        const response = await fetch('/wp-json/pathwise-badge-connect/v1/clear-logs', {
          method: 'DELETE',
          headers: {
            'X-WP-Nonce': pbcOptions.nonce,
            'pbc-api-key': pbcOptions.pbcApiKey,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to clear logs: ${response.statusText}`);
        }

        alert("Logs cleared successfully.");
        await this.loadLogs(); // Reload logs after clearing
      } catch (error) {
        console.error('Error clearing logs:', error);
        alert('Failed to clear logs. Please try again.');
      } finally {
        this.loading = false;
      }
    },
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
    setFilter(filter) {
      this.selectedFilter = filter;
      this.currentPage = 1;
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
      return badgeId ? `/wp-admin/admin.php?page=pathwise-badge-connect` : '#';
    },
    getPostLink(postId) {
      return postId ? `/wp-admin/post.php?post=${postId}&action=edit` : '#';
    },
    getUserLink(userId) {
      return userId ? `/wp-admin/user-edit.php?user_id=${userId}` : '#';
    }
  },
  watch: {
    selectedFilter() {
      this.currentPage = 1;
    },
    searchQuery() {
      this.currentPage = 1;
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
  background-color: var(--primary-color);
  color: #fff;
  cursor: pointer;
}

.log-table th:hover {
  background-color: #00a0d2;
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
  height: 300px;
}

.loading-spinner {
  font-size: 3rem; /* Larger spinner */
  color: var(--primary-color);
}

.filter-buttons {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
}

.filter-buttons button {
  padding: 8px 12px;
  border: 1px solid var(--nav-text-color);
  background-color: var(--background-color);
  color: var(--primary-color);
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}

.filter-buttons button.active {
  background-color: var(--primary-color);
  color: #fff;
}

.filter-buttons button:hover {
  background-color: var(--primary-color);
  color: #fff;
}

/* Add styles for Export button */
.filter-buttons button.export-button {
  margin-left: auto; /* Align it to the right */
  padding: 8px 12px;
  border: 1px solid var(--primary-color);
  background-color: var(--background-color);
  color: var(--primary-color);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.filter-buttons button.export-button:hover {
  background-color: var(--primary-color);
  color: #fff;
}

.filter-buttons button.clear-log-button {
  margin-left: 10px;
  padding: 8px 12px;
  border: 1px solid var(--error-text-color);
  background-color: var(--background-color);
  color: var(--error-text-color);
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.filter-buttons button.clear-log-button:hover {
  background-color: var(--error-text-color);
  color: #fff;
}
</style>

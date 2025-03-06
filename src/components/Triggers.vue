<template>
  <div class="triggers-page">
    <div class="triggers-header">
      <input
          v-model="searchQuery"
          placeholder="Search triggers..."
          class="search-input"
      />
      <button @click="addNewTrigger" class="add-trigger-button">Add New Trigger</button>
    </div>

    <div v-if="loading" class="spinner-container">
      <font-awesome-icon icon="spinner" spin class="loading-spinner" />
    </div>
    <div v-else>
      <div v-if="filteredTriggers.length > 0">
        <div v-for="trigger in filteredTriggers" :key="trigger.id || trigger.tempId" class="trigger-card">
          <div class="trigger-left">
            <div class="trigger-image">
              <img :src="getBadgeImage(trigger.badge_id)" alt="Badge Image" />
            </div>
          </div>
          <div class="trigger-right">
            <div class="trigger-header">
              <div class="badge-name-select">
                <div v-if="trigger.isEditing">
                  <select v-model="trigger.badge_id" class="select-box">
                    <option v-for="badge in badges" :key="badge.id" :value="badge.id">{{ badge.name }}</option>
                  </select>
                </div>
                <div v-else>
                  <label class="badge-name">{{ getBadgeName(trigger.badge_id) }}</label>
                </div>
              </div>
              <div class="trigger-actions">
                <button v-if="trigger.isEditing" @click="saveTrigger(trigger)" class="save-button">Save</button>
                <button v-if="trigger.isEditing" @click="cancelTrigger(trigger)" class="cancel-button">Cancel</button>
                <button v-if="trigger.isEditing" @click="confirmDelete(trigger)" class="delete-button">Delete</button>
                <button v-else @click="editTrigger(trigger)" class="edit-button">Edit</button>
              </div>
            </div>
            <div class="trigger-field-group">
              <div v-if="trigger.isEditing" class="trigger-fields-row">
                <div class="trigger-field">
                  <label>Extension</label>
                  <select v-model="trigger.extension" class="select-box" @change="updateTriggerFields(trigger)">
                    <option v-for="(options, extension) in triggerOptions" :key="extension" :value="extension">{{ extension }}</option>
                  </select>
                </div>
                <div class="trigger-field">
                  <label>Trigger Action</label>
                  <select v-model="trigger.trigger_type" class="select-box" @change="updateTriggerFields(trigger)">
                    <option v-for="(options, triggerType) in availableTriggerTypes(trigger)" :key="triggerType" :value="triggerType">{{ triggerType }}</option>
                  </select>
                </div>
                <div class="trigger-field">
                  <label>{{ availableLabel(trigger) }}</label>
                  <select v-model="trigger.object" class="select-box">
                    <option v-for="post in trigger.availablePosts" :key="post.id" :value="post.id">
                      {{ post.title }} (ID: {{ post.id }})
                    </option>
                  </select>
                </div>
              </div>
              <div v-else class="trigger-fields-row">
                <div class="trigger-field">
                  <label>Extension</label>
                  <p class="trigger-value">{{ trigger.extension }}</p>
                </div>
                <div class="trigger-field">
                  <label>Trigger Action</label>
                  <p class="trigger-value">{{ trigger.trigger_type }}</p>
                </div>
                <div class="trigger-field">
                  <label>{{ availableLabel(trigger) }}</label>
                  <p class="trigger-value">{{ trigger.object_title }} (ID: {{ trigger.object }})</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p v-else>Get started by creating your first badge issuing trigger.</p>
    </div>

    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this trigger?</p>
        <button @click="deleteTrigger(triggerToDelete)" class="confirm-delete-button">Yes, Delete</button>
        <button @click="showDeleteModal = false" class="confirm-cancel-button">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { mapGetters, mapActions } from 'vuex';
import triggerOptions from '../samples/trigger-options.json'; // Correctly import the triggerOptions

library.add(faSpinner);

export default {
  name: 'Triggers',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      tempIdCounter: 1,
      showDeleteModal: false,
      triggerToDelete: null,
      triggerOptions, // Load trigger options correctly
      searchQuery: '',
      loading: true, // Added loading state
    };
  },
  computed: {
    ...mapGetters(['getBadges', 'getTriggers']),
    badges() {
      return this.getBadges;
    },
    triggers() {
      return this.getTriggers;
    },
    filteredTriggers() {
      return this.triggers.filter(trigger =>
          this.getBadgeName(trigger.badge_id).toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          trigger.extension.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          trigger.trigger_type.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions(['fetchBadges', 'fetchTriggers', 'saveTriggerToStore', 'deleteTrigger']),
    getBadgeImage(badgeId) {
      const badge = this.badges.find(b => b.id === badgeId);
      return badge ? badge.image : '';
    },
    getBadgeName(badgeId) {
      const badge = this.badges.find(b => b.id === badgeId);
      return badge ? badge.name : 'Select Badge';
    },
    availableTriggerTypes(trigger) {
      return this.triggerOptions[trigger.extension] || {};
    },
    availableObjects(trigger) {
      return this.availableTriggerTypes(trigger)[trigger.trigger_type]?.objects || [];
    },
    availableLabel(trigger) {
      return this.availableTriggerTypes(trigger)[trigger.trigger_type]?.label || 'Object';
    },
    addNewTrigger() {
      if (this.badges.length === 0) {
        console.error('No badges available to assign to the trigger.');
        return;
      }

      const newTrigger = {
        tempId: this.tempIdCounter++,
        badge_id: this.badges[0].id,
        extension: 'WordPress',
        trigger_type: 'User Created',
        object: '',
        isEditing: true,
      };
      this.$store.commit('addTrigger', newTrigger);
    },
    async editTrigger(trigger) {
      trigger.isEditing = true;
      await this.updateTriggerFields(trigger);  // Ensure fields are loaded properly
    },
    async updateTriggerFields(trigger) {
      const postType = this.availableObjects(trigger)[0]; // Assuming there's only one object per trigger
      if (postType) {
        const posts = await this.fetchPostsByType(postType);
        trigger.availablePosts = posts;
      } else {
        trigger.availablePosts = [];
      }
    },
    async saveTrigger(trigger) {
      try {
        // Fetch the post title to store it along with the post ID
        const postTitle = trigger.availablePosts.find(post => post.id === trigger.object)?.title || '';

        // Save the trigger to the store and get the saved trigger response
        const savedTrigger = await this.saveTriggerToStore({
          id: trigger.id,
          badge_id: trigger.badge_id,
          extension: trigger.extension,
          trigger_type: trigger.trigger_type,
          object: trigger.object,
          object_title: postTitle,  // Save post title
        });

        // Remove the temporary trigger if it exists (Important)
        if (trigger.tempId) {
          const tempTriggerIndex = this.triggers.findIndex(t => t.tempId === trigger.tempId);
          if (tempTriggerIndex !== -1) {
            this.$store.commit('deleteTrigger', trigger.tempId);  // Remove temporary trigger
          }
        }

        // Check if the saved trigger already exists in the state (to avoid duplicates - Important)
        const existingTriggerIndex = this.triggers.findIndex(t => t.id === savedTrigger.trigger.id);
        if (existingTriggerIndex === -1) {
          // Add the saved trigger to the store if it's not already there
          this.$store.commit('addTrigger', savedTrigger.trigger);
        }

        // Update the local trigger's data
        trigger.object_title = savedTrigger.trigger.object_title;
        trigger.id = savedTrigger.trigger.id;
        trigger.isEditing = false;

      } catch (error) {
        console.error('Error saving trigger:', error);
      }
    },
    cancelTrigger(trigger) {
      if (!trigger.id) {
        this.$store.commit('deleteTrigger', trigger.tempId);
      } else {
        const originalTrigger = this.triggers.find(t => t.id === trigger.id);
        Object.assign(trigger, originalTrigger);
        trigger.isEditing = false;
      }
    },
    confirmDelete(trigger) {
      this.triggerToDelete = trigger;
      this.showDeleteModal = true;
    },
    async deleteTrigger() {
      try {
        if (this.triggerToDelete.id) {
          // This trigger exists in the database, so we use the store action to delete it
          await this.$store.dispatch('deleteTrigger', this.triggerToDelete.id);
        } else {
          // This is a new, unsaved trigger, so we remove it locally
          this.$store.commit('deleteTrigger', this.triggerToDelete.tempId);
        }
      } catch (error) {
        console.error('Error deleting trigger:', error);
      } finally {
        this.showDeleteModal = false;
        this.triggerToDelete = null;
      }
    },
    async fetchPostsByType(postType) {
      try {
        const response = await fetch(`/wp-json/pathwise-badge-connect/v1/posts-by-type?post_type=${postType}`, {
          method: 'GET',
          headers: {
            'pbc-api-key': pbcOptions.pbcApiKey,
            'X-WP-Nonce': pbcOptions.nonce,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        return data.posts;
      } catch (error) {
        console.error('An error occurred while fetching posts: ' + error.message);
        return [];
      }
    },
  },
  async mounted() {
    this.loading = true;
    await this.fetchTriggers();
    await this.fetchBadges();
    this.loading = false; // Hide the spinner once triggers are loaded
  },
};
</script>

<style scoped>
.triggers-header {
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

.add-trigger-button {
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-trigger-button:hover {
  background-color: #0056b3;
}

.trigger-card {
  display: flex;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.trigger-left {
  flex: 0 0 128px;
}

.trigger-image img {
  width: 128px;
  height: 128px;
  object-fit: contain;
  border-radius: 8px;
}

.trigger-right {
  flex: 1;
  padding-left: 20px;
}

.trigger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.badge-name-select {
  flex: 1;
}

.badge-name {
  font-size: 25px;
  font-weight: bold;
  color: var(--primary-color);
  padding-bottom: 35px;
}

.trigger-actions {
  display: flex;
  gap: 10px;
}

.edit-button,
.save-button,
.cancel-button,
.delete-button {
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  transition: background-color 0.3s ease;
}

.edit-button {
  background-color: var(--primary-color);
  color: white;
}

.edit-button:hover {
  background-color: #0056b3;
}

.save-button {
  background-color: #27ae60;
  color: white;
}

.save-button:hover {
  background-color: #2ecc71;
}

.cancel-button {
  background-color: #7f8c8d;
  color: white;
}

.cancel-button:hover {
  background-color: #95a5a6;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
}

.delete-button:hover {
  background-color: #c0392b;
}

.trigger-field-group {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.trigger-fields-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
}

.trigger-field {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 33.33%;
  box-sizing: border-box;
}

.trigger-value {
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  background-color: #f9f9f9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  max-width: 100%;
  margin-bottom: 0;
}

.trigger-field label {
  font-weight: bold;
  margin-bottom: 5px;
}

.select-box {
  padding: 7px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.select-box:focus {
  border-color: var(--primary-color);
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.confirm-delete-button,
.confirm-cancel-button {
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  width: 120px;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.confirm-delete-button {
  background-color: #e74c3c;
  color: white;
  margin-right: 15px;
}

.confirm-delete-button:hover {
  background-color: #c0392b;
}

.cancel-button {
  background-color: #7f8c8d;
  color: white;
}

.cancel-button:hover {
  background-color: #95a5a6;
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

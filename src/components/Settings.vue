<template>
  <div class="settings-container">
    <div class="section">
      <div class="flex-container">
        <div class="flex-item label-item">
          <label for="status">OpenBadge Connection Status:</label>
        </div>
        <div class="flex-item value-item">
          <span :class="obfStatusClass">{{ obfStatus }}</span>
        </div>
      </div>
      <div class="flex-container">
        <div class="flex-item label-item">
          <label for="cancredStatus">CanCred Connection Status:</label>
        </div>
        <div class="flex-item value-item">
          <span :class="cancredStatusClass">{{ cancredStatus }}</span>
        </div>
      </div>
      <div class="flex-container">
        <div class="flex-item label-item">
          <label for="lastSync">Last Sync:</label>
        </div>
        <div class="value-item">
          <span :class="['pill', timeAgoClass(lastSync)]">{{ timeAgo(lastSync) }}</span>
          <button
              @click="syncNow"
              :class="['pill', syncButtonClass]"
              :disabled="isSyncing"
              class="sync-button"
          >
            <font-awesome-icon :icon="syncIcon" :spin="isSyncing" />
            {{ syncButtonText }}
          </button>
        </div>
      </div>

      <hr />

      <h3>Open Badge Factory API</h3>

      <div class="flex-container">
        <div class="flex-item label-item">
          <label for="clientId">Open Badge Factory API Client ID:</label>
        </div>
        <div class="flex-item value-item">
          <div class="input-group">
            <input
                :type="showClientId ? 'text' : 'password'"
                id="clientId"
                v-model="clientId"
                @input="onInputChange('clientId')"
            />
            <button
                v-if="clientIdChanged || saveSuccessClientId || saveErrorClientId"
                @click="saveOption('clientId')"
                :class="['save-button', buttonClass('clientId')]"
                :disabled="savingClientId"
            >
              <font-awesome-icon v-if="savingClientId" icon="spinner" spin />
              <font-awesome-icon v-else-if="saveSuccessClientId" icon="thumbs-up" />
              <font-awesome-icon v-else-if="saveErrorClientId" icon="times" />
              <font-awesome-icon v-else icon="check" />
            </button>
            <button @click="toggleClientIdVisibility" class="toggle-visibility pill-blue">
              <font-awesome-icon :icon="showClientId ? 'eye-slash' : 'eye'" />
            </button>
          </div>
        </div>
      </div>

      <div class="flex-container">
        <div class="flex-item label-item">
          <label for="clientSecret">Open Badge Factory API Client Secret:</label>
        </div>
        <div class="flex-item value-item">
          <div class="input-group">
            <input
                :type="showClientSecret ? 'text' : 'password'"
                id="clientSecret"
                v-model="clientSecret"
                @input="onInputChange('clientSecret')"
            />
            <button
                v-if="clientSecretChanged || saveSuccessClientSecret || saveErrorClientSecret"
                @click="saveOption('clientSecret')"
                :class="['save-button', buttonClass('clientSecret')]"
                :disabled="savingClientSecret"
            >
              <font-awesome-icon v-if="savingClientSecret" icon="spinner" spin />
              <font-awesome-icon v-else-if="saveSuccessClientSecret" icon="thumbs-up" />
              <font-awesome-icon v-else-if="saveErrorClientSecret" icon="times" />
              <font-awesome-icon v-else icon="check" />
            </button>
            <button @click="toggleClientSecretVisibility" class="toggle-visibility pill-blue">
              <font-awesome-icon :icon="showClientSecret ? 'eye-slash' : 'eye'" />
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div class="section">
        <h3>CanCred Badge Factory API</h3>
        <div class="flex-container">
          <div class="flex-item label-item">
            <label for="clientIdCancred">CanCred API Client ID:</label>
          </div>
          <div class="flex-item value-item">
            <div class="input-group">
              <input
                  :type="showClientIdCancred ? 'text' : 'password'"
                  id="clientIdCancred"
                  v-model="clientIdCancred"
                  @input="onInputChange('clientIdCancred')"
              />
              <button
                  v-if="clientIdCancredChanged || saveSuccessClientIdCancred || saveErrorClientIdCancred"
                  @click="saveOptionCancred('clientIdCancred')"
                  :class="['save-button', buttonClassCancred('clientIdCancred')]"
                  :disabled="savingClientIdCancred"
              >
                <font-awesome-icon v-if="savingClientIdCancred" icon="spinner" spin />
                <font-awesome-icon v-else-if="saveSuccessClientIdCancred" icon="thumbs-up" />
                <font-awesome-icon v-else-if="saveErrorClientIdCancred" icon="times" />
                <font-awesome-icon v-else icon="check" />
              </button>
              <button @click="toggleClientIdVisibilityCancred" class="toggle-visibility pill-blue">
                <font-awesome-icon :icon="showClientIdCancred ? 'eye-slash' : 'eye'" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex-container">
          <div class="flex-item label-item">
            <label for="clientSecretCancred">CanCred API Client Secret:</label>
          </div>
          <div class="flex-item value-item">
            <div class="input-group">
              <input
                  :type="showClientSecretCancred ? 'text' : 'password'"
                  id="clientSecretCancred"
                  v-model="clientSecretCancred"
                  @input="onInputChange('clientSecretCancred')"
              />
              <button
                  v-if="clientSecretCancredChanged || saveSuccessClientSecretCancred || saveErrorClientSecretCancred"
                  @click="saveOptionCancred('clientSecretCancred')"
                  :class="['save-button', buttonClassCancred('clientSecretCancred')]"
                  :disabled="savingClientSecretCancred"
              >
                <font-awesome-icon v-if="savingClientSecretCancred" icon="spinner" spin />
                <font-awesome-icon v-else-if="saveSuccessClientSecretCancred" icon="thumbs-up" />
                <font-awesome-icon v-else-if="saveErrorClientSecretCancred" icon="times" />
                <font-awesome-icon v-else icon="check" />
              </button>
              <button @click="toggleClientSecretVisibilityCancred" class="toggle-visibility pill-blue">
                <font-awesome-icon :icon="showClientSecretCancred ? 'eye-slash' : 'eye'" />
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash, faCheck, faSpinner, faThumbsUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { timeAgo, timeAgoClass } from '../helpers.js';

library.add(faEye, faEyeSlash, faCheck, faSpinner, faThumbsUp, faTimes);

export default {
  name: 'Settings',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      status: 'Connecting...',
      lastSync: 'Checking...',
      clientId: '',
      clientSecret: '',
      clientIdCancred: '',
      clientSecretCancred: '',
      enableLog: false,
      purgeLog: '1_month',
      showClientId: false,
      showClientSecret: false,
      clientIdChanged: false,
      clientSecretChanged: false,
      savingClientId: false,
      savingClientSecret: false,
      saveSuccessClientId: false,
      saveSuccessClientSecret: false,
      saveErrorClientId: false,
      saveErrorClientSecret: false,
      isSyncing: false,
      syncSuccess: false,
      syncError: false,
      syncButtonText: 'Sync Now',
      syncButtonClass: 'pill-green',
      syncIcon: 'sync',
      showClientIdCancred: false,
      showClientSecretCancred: false,
      clientIdCancredChanged: false,
      clientSecretCancredChanged: false,
      savingClientIdCancred: false,
      savingClientSecretCancred: false,
      saveSuccessClientIdCancred: false,
      saveSuccessClientSecretCancred: false,
      saveErrorClientIdCancred: false,
      saveErrorClientSecretCancred: false,

    };
  },
  computed: {
    badges() {
      return this.$store.getters.getBadges;
    },
    obfStatus() {
      return this.$store.getters.getConnectionStatus('obf');
    },
    obfStatusClass() {
      return this.$store.getters.getConnectionStatusClass('obf');
    },
    cancredStatus() {
      return this.$store.getters.getConnectionStatus('cancred');
    },
    cancredStatusClass() {
      return this.$store.getters.getConnectionStatusClass('cancred');
    },
  },
  methods: {
    timeAgo,
    timeAgoClass,
    toggleClientIdVisibility() {
      this.showClientId = !this.showClientId;
    },
    toggleClientIdVisibilityCancred() {
      this.showClientIdCancred = !this.showClientIdCancred;
    },
    toggleClientSecretVisibility() {
      this.showClientSecret = !this.showClientSecret;
    },
    toggleClientSecretVisibilityCancred() {
      this.showClientSecretCancred = !this.showClientSecretCancred;
    },
    onInputChange(field) {
      if (field === 'clientId') {
        this.clientIdChanged = true;
        this.saveSuccessClientId = false;
        this.saveErrorClientId = false;
      } else if (field === 'clientSecret') {
        this.clientSecretChanged = true;
        this.saveSuccessClientSecret = false;
        this.saveErrorClientSecret = false;
      } else if (field === 'clientIdCancred') {
        this.clientIdCancredChanged = true;
        this.saveSuccessClientIdCancred = false;
        this.saveErrorClientIdCancred = false;
      } else if (field === 'clientSecretCancred') {
        this.clientSecretCancredChanged = true;
        this.saveSuccessClientSecretCancred = false;
        this.saveErrorClientSecretCancred = false;
      }
    },
    buttonClass(field) {
      if (field === 'clientId') {
        if (this.savingClientId) return 'pill-blue';
        if (this.saveSuccessClientId) return 'pill-green';
        if (this.saveErrorClientId) return 'pill-red';
      } else if (field === 'clientSecret') {
        if (this.savingClientSecret) return 'pill-blue';
        if (this.saveSuccessClientSecret) return 'pill-green';
        if (this.saveErrorClientSecret) return 'pill-red';
      }
      return '';
    },
    buttonClassCancred(field) {
      if (field === 'clientIdCancred') {
        if (this.savingClientIdCancred) return 'pill-blue';
        if (this.saveSuccessClientIdCancred) return 'pill-green';
        if (this.saveErrorClientIdCancred) return 'pill-red';
      } else if (field === 'clientSecretCancred') {
        if (this.savingClientSecretCancred) return 'pill-blue';
        if (this.saveSuccessClientSecretCancred) return 'pill-green';
        if (this.saveErrorClientSecretCancred) return 'pill-red';
      }
      return '';
    },
    async fetchLastSync() {
      try {
        const response = await fetch('/wp-json/pathwise-badge-connect/v1/last-sync', {
          method: 'GET',
          headers: {
            'pbc-api-key': pbcOptions.pbcApiKey,
            'X-WP-Nonce': pbcOptions.nonce,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch last sync time');
        }

        const data = await response.json();

        if (data.last_sync) {
          this.lastSync = new Date(data.last_sync);
        }
      } catch (error) {
        console.error('Error fetching last sync time:', error);
      }
    },
    async saveOption(field) {
      try {
        let optionValue;
        if (field === 'clientId') {
          this.savingClientId = true;
          this.saveSuccessClientId = false;
          optionValue = this.clientId;
        } else if (field === 'clientSecret') {
          this.savingClientSecret = true;
          this.saveSuccessClientSecret = false;
          optionValue = this.clientSecret;
        }

        await this.saveToWordPressOption({
          client_id: this.clientId,
          client_secret: this.clientSecret,
        });

        // Reload the connection status after successfully saving the credentials
        await this.reloadConnectionStatus();

      } catch (error) {
        console.error(`Failed to save ${field}:`, error);
        if (field === 'clientId') {
          this.saveErrorClientId = true;
        } else if (field === 'clientSecret') {
          this.saveErrorClientSecret = true;
        }
      } finally {
        if (field === 'clientId') {
          this.savingClientId = false;
        } else if (field === 'clientSecret') {
          this.savingClientSecret = false;
        }
      }
    },
    async saveOptionCancred(field) {
      try {
        let optionValue;
        if (field === 'clientIdCancred') {
          this.savingClientIdCancred = true;
          this.saveSuccessClientIdCancred = false;
          optionValue = this.clientIdCancred;
        } else if (field === 'clientSecretCancred') {
          this.savingClientSecretCancred = true;
          this.saveSuccessClientSecretCancred = false;
          optionValue = this.clientSecretCancred;
        }

        await this.saveToWordPressOptionCancred({
          client_id: this.clientIdCancred,
          client_secret: this.clientSecretCancred,
        });

      } catch (error) {
        console.error(`Failed to save ${field}:`, error);
        if (field === 'clientId') {
          this.saveSuccessClientId = true;
          this.clientIdChanged = false;
        }
        if (field === 'clientIdCancred') {
          this.saveErrorClientIdCancred = true;
        } else if (field === 'clientSecretCancred') {
          this.saveErrorClientSecretCancred = true;
        }
      } finally {
        if (field === 'clientIdCancred') {
          this.savingClientIdCancred = false;
        } else if (field === 'clientSecretCancred') {
          this.savingClientSecretCancred = false;
        }
      }
    },
    async reloadConnectionStatus() {
      await this.$store.dispatch('fetchConnectionStatus');
    },
    async saveToWordPressOption(options) {
      const response = await fetch('/wp-json/pathwise-badge-connect/v1/settings/obf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'pbc-api-key': pbcOptions.pbcApiKey,
          'X-WP-Nonce': pbcOptions.nonce,
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to save settings');
      }
    },
    async saveToWordPressOptionCancred(options) {
      const response = await fetch('/wp-json/pathwise-badge-connect/v1/settings/cancred', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'pbc-api-key': pbcOptions.pbcApiKey,
          'X-WP-Nonce': pbcOptions.nonce,
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to save CanCred settings');
      }
    },
    async syncNow() {
      this.isSyncing = true;
      this.syncButtonText = 'Syncing';
      this.syncButtonClass = 'pill-blue';
      this.syncIcon = 'spinner';

      try {
        const response = await fetch('/wp-json/pathwise-badge-connect/v1/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'pbc-api-key': pbcOptions.pbcApiKey,
            'X-WP-Nonce': pbcOptions.nonce,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to sync badges');
        }

        const data = await response.json();

        if (data.success) {
          this.lastSync = new Date(data.last_sync);
          this.$store.commit('setBadges', data.badges); // Store the badges in Vuex
          this.syncSuccess = true;
          this.syncButtonText = 'Sync Now';
          this.syncButtonClass = 'pill-green';
          this.syncIcon = 'sync';
        } else {
          throw new Error(data.message || 'Unknown error during sync');
        }
      } catch (error) {
        console.error('Sync failed:', error);
        this.syncError = true;
        this.syncButtonText = 'Error';
        this.syncButtonClass = 'pill-red';
        this.syncIcon = 'times';
        setTimeout(() => {
          this.resetSyncButton();
        }, 5000); // Reset button after 5 seconds
      } finally {
        this.isSyncing = false;
      }
    },
    resetSyncButton() {
      this.syncButtonText = 'Sync Now';
      this.syncButtonClass = 'pill-green';
      this.syncIcon = 'sync';
      this.syncError = false;
    }
  },
  async mounted() {
    await this.fetchLastSync();
    await this.$store.dispatch('fetchSettings'); // OBF
    await this.$store.dispatch('fetchConnectionStatus'); // OBF
    await this.$store.dispatch('fetchCancredSettings');
    await this.$store.dispatch('fetchCancredConnectionStatus');

    const obf = this.$store.getters.getObfSettings;
    this.clientId = obf.clientId;
    this.clientSecret = obf.clientSecret;
    const cancred = this.$store.getters.getCancredSettings;
    this.clientIdCancred = cancred.clientId;
    this.clientSecretCancred = cancred.clientSecret;
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label-item {
  flex: 0 1 auto;
  flex-basis: 300px;
  margin-right: 20px;
  text-align: left;
}

.value-item {
  flex: 1;
  display: flex;
  align-items: center;
}

.input-group {
  position: relative;
  width: 100%;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px 14px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

button.toggle-visibility,
button.save-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  cursor: pointer;
  font-size: 16px;
  outline: none;
  padding: 8px 14px;
  border-radius: 4px;
}

button.save-button {
  right: 55px;
}

button.toggle-visibility {
  right: 4px;
}

button.toggle-visibility.pill-blue,
button.save-button.pill-green,
button.save-button.pill-blue,
button.save-button.pill-red,
button.sync-button.pill-green,
button.sync-button.pill-blue,
button.sync-button.pill-red {
  border: none;
  cursor: pointer;
}

button.sync-button {
  border: 1px solid var(--success-bg-color) !important;
  margin-left: 15px;
}

button.toggle-visibility:hover,
button.save-button:hover,
button.sync-button:hover {
  opacity: 0.8;
}

hr {
  border: 0;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}
</style>

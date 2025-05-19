import { createStore } from "vuex";

export default createStore({
    state: {
        badges: [],
        triggers: [],
        notices: [],
        connectionStatuses: {
            obf: {
                status: 'Connecting...',
                class: 'pill pill-yellow'
            },
            cancred: {
                status: 'Connecting...',
                class: 'pill pill-yellow'
            }
        },
        obfSettings: {
            clientId: '',
            clientSecret: ''
        },
        cancredSettings: {
            clientId: '',
            clientSecret: ''
        }
    },
    mutations: {
        setBadges(state, badges) {
            state.badges = badges;
        },
        setTriggers(state, triggers) {
            state.triggers = triggers.map(trigger => ({
                ...trigger,
                object_title: trigger.object_title || '',
            }));
        },
        addTrigger(state, trigger) {
            state.triggers.unshift(trigger);
        },
        updateTrigger(state, updatedTrigger) {
            const index = state.triggers.findIndex(trigger => trigger.id === updatedTrigger.id);
            if (index !== -1) {
                state.triggers.splice(index, 1, updatedTrigger);
            }
        },
        deleteTrigger(state, triggerId) {
            state.triggers = state.triggers.filter(trigger => trigger.id !== triggerId && trigger.tempId !== triggerId);
        },
        setNotices(state, notices) {
            state.notices = notices;
        },
        dismissNotice(state, noticeId) {
            state.notices = state.notices.map(notice =>
                notice.id === noticeId ? { ...notice, status: false } : notice
            );
        },
        setConnectionStatus(state, { provider, status }) {
            const statusClass = {
                'Connecting...': 'pill pill-yellow',
                'Connected': 'pill pill-green',
                'Credential Error': 'pill pill-red',
                'Not Connected': 'pill pill-red',
                'Error Checking Status': 'pill pill-red',
                'PBC Error': 'pill pill-red',
            }[status] || 'pill pill-unknown';

            if (state.connectionStatuses[provider]) {
                state.connectionStatuses[provider].status = status;
                state.connectionStatuses[provider].class = statusClass;
            }
        },
        setObfSettings(state, settings) {
            state.obfSettings = { ...settings };
        },
        setCancredSettings(state, settings) {
            state.cancredSettings = { ...settings };
        }
    },
    actions: {
        async fetchLogs({ commit }) {
            try {
                const response = await fetch('/wp-json/pathwise-badge-connect/v1/logs', {
                    method: 'GET',
                    headers: {
                        'pbc-api-key': pbcOptions.pbcApiKey,
                        'X-WP-Nonce': pbcOptions.nonce,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch logs');
                }

                const data = await response.json();
                return data; // Ensure the logs array is returned correctly
            } catch (error) {
                console.error('An error occurred while fetching logs: ' + error.message);
                return [];
            }
        },
        async fetchBadges({ commit }) {
            try {
                const response = await fetch('/wp-json/pathwise-badge-connect/v1/badges', {
                    method: 'GET',
                    headers: {
                        'pbc-api-key': pbcOptions.pbcApiKey,
                        'X-WP-Nonce': pbcOptions.nonce,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch badges');
                }

                const data = await response.json();
                commit('setBadges', data.badges);
            } catch (error) {
                console.error('An error occurred while fetching badges: ' + error.message);
            }
        },
        async fetchTriggers({ commit }) {
            try {
                const response = await fetch('/wp-json/pathwise-badge-connect/v1/triggers', {
                    method: 'GET',
                    headers: {
                        'pbc-api-key': pbcOptions.pbcApiKey,
                        'X-WP-Nonce': pbcOptions.nonce,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch triggers');
                }

                const data = await response.json();

                // Ensure each trigger includes the object_title
                const triggersWithTitles = data.triggers.map(trigger => ({
                    ...trigger,
                    object_title: trigger.object_title || '', // Fallback if title is not fetched
                }));

                commit('setTriggers', triggersWithTitles);
            } catch (error) {
                console.error('An error occurred while fetching triggers: ' + error.message);
            }
        },
        async saveTriggerToStore({ commit }, trigger) {
            try {
                const response = await fetch('/wp-json/pathwise-badge-connect/v1/triggers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'pbc-api-key': pbcOptions.pbcApiKey,
                        'X-WP-Nonce': pbcOptions.nonce,
                    },
                    body: JSON.stringify(trigger),
                });

                if (!response.ok) {
                    throw new Error('Failed to save trigger');
                }

                const data = await response.json();

                // Ensure the trigger returned by the API has the correct ID and object_title
                if (trigger.id) {
                    commit('updateTrigger', data.trigger);
                } else {
                    commit('addTrigger', data.trigger);
                }

                return data; // Return the saved trigger data including object_title
            } catch (error) {
                console.error('An error occurred while saving the trigger: ' + error.message);
            }
        },
        async deleteTrigger({ commit }, triggerId) {
            try {
                const response = await fetch(`/wp-json/pathwise-badge-connect/v1/triggers/${triggerId}`, {
                    method: 'DELETE',
                    headers: {
                        'pbc-api-key': pbcOptions.pbcApiKey,
                        'X-WP-Nonce': pbcOptions.nonce,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete trigger');
                }

                // Commit the mutation to remove the trigger from the state
                commit('deleteTrigger', triggerId);
            } catch (error) {
                console.error('An error occurred while deleting the trigger: ' + error.message);
            }
        },
        async fetchNotices({ commit }) {
            try {
                const response = await fetch('/wp-json/pathwise-badge-connect/v1/notices', {
                    method: 'GET',
                    headers: {
                        'pbc-api-key': pbcOptions.pbcApiKey,
                        'X-WP-Nonce': pbcOptions.nonce,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch notices');
                }

                const data = await response.json();
                commit('setNotices', data.notices);
            } catch (error) {
                console.error('An error occurred while fetching notices: ' + error.message);
            }
        },
        async dismissNotice({ commit }, noticeId) {
            try {
                const response = await fetch(`/wp-json/pathwise-badge-connect/v1/notices/${noticeId}`, {
                    method: 'DELETE',
                    headers: {
                        'pbc-api-key': pbcOptions.pbcApiKey,
                        'X-WP-Nonce': pbcOptions.nonce,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to dismiss notice');
                }

                commit('dismissNotice', noticeId);
            } catch (error) {
                console.error('An error occurred while dismissing the notice: ' + error.message);
            }
        },
        async fetchConnectionStatus({ commit }) {
            try {
                const response = await fetch('/wp-json/pathwise-badge-connect/v1/connection-status?provider=obf', {
                    method: 'GET',
                    headers: {
                        'pbc-api-key': pbcOptions.pbcApiKey,
                        'X-WP-Nonce': pbcOptions.nonce,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch OBF connection status');

                const data = await response.json();
                commit('setConnectionStatus', { provider: 'obf', status: data.connection_status });
            } catch (error) {
                console.error('Error fetching OBF connection status:', error);
                commit('setConnectionStatus', { provider: 'obf', status: 'Error Checking Status' });
            }
        },
        async fetchCancredConnectionStatus({ commit }) {
            try {
                const response = await fetch('/wp-json/pathwise-badge-connect/v1/connection-status?provider=cancred', {
                    method: 'GET',
                    headers: {
                        'pbc-api-key': pbcOptions.pbcApiKey,
                        'X-WP-Nonce': pbcOptions.nonce,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch CanCred connection status');

                const data = await response.json();
                commit('setConnectionStatus', { provider: 'cancred', status: data.connection_status });
            } catch (error) {
                console.error('Error fetching CanCred connection status:', error);
                commit('setConnectionStatus', { provider: 'cancred', status: 'Error Checking Status' });
            }
        },
        async fetchSettings({ commit }) {
            try {
                const response = await fetch('/wp-json/pathwise-badge-connect/v1/settings/obf', {
                    method: 'GET',
                    headers: {
                        'pbc-api-key': pbcOptions.pbcApiKey,
                        'X-WP-Nonce': pbcOptions.nonce,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch OBF settings');

                const data = await response.json();
                if (data && data.settings) {
                    commit('setObfSettings', {
                        clientId: data.settings.client_id,
                        clientSecret: data.settings.client_secret
                    });
                }
            } catch (error) {
                console.error('Error fetching OBF settings:', error);
            }
        },
        async fetchCancredSettings({ commit }) {
            try {
                const response = await fetch('/wp-json/pathwise-badge-connect/v1/settings/cancred', {
                    method: 'GET',
                    headers: {
                        'pbc-api-key': pbcOptions.pbcApiKey,
                        'X-WP-Nonce': pbcOptions.nonce,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch CanCred settings');

                const data = await response.json();
                if (data && data.settings) {
                    commit('setCancredSettings', {
                        clientId: data.settings.client_id,
                        clientSecret: data.settings.client_secret
                    });
                }
            } catch (error) {
                console.error('Error fetching CanCred settings:', error);
            }
        }
    },
    getters: {
        getBadges: (state) => state.badges,
        getTriggers: (state) => state.triggers,
        getNotices: (state) => state.notices,
        getConnectionStatus: (state) => (provider) => state.connectionStatuses[provider]?.status || '',
        getConnectionStatusClass: (state) => (provider) => state.connectionStatuses[provider]?.class || '',
        getObfSettings: (state) => state.obfSettings,
        getCancredSettings: (state) => state.cancredSettings
    }
});

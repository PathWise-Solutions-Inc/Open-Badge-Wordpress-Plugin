import { createStore } from "vuex";

export default createStore({
    state: {
        badges: [],
        triggers: [],
        notices: [],
        connectionStatus: 'Connecting...',
        connectionStatusClass: 'pill pill-yellow'
    },
    mutations: {
        setBadges(state, badges) {
            state.badges = badges;
        },
        setTriggers(state, triggers) {
            state.triggers = triggers.map(trigger => ({
                ...trigger,
                object_title: trigger.object_title || '', // Ensure object_title is properly set
            }));
        },
        addTrigger(state, trigger) {
            // Check if a trigger with the same ID or tempId already exists
            const existingTrigger = state.triggers.find(t => t.id === trigger.id || t.tempId === trigger.tempId);
            if (!existingTrigger) {
                state.triggers.unshift(trigger); // Add the new trigger to the beginning of the list
            }
        },
        updateTrigger(state, updatedTrigger) {
            const index = state.triggers.findIndex(trigger => trigger.id === updatedTrigger.id);
            if (index !== -1) {
                state.triggers.splice(index, 1, updatedTrigger); // Update the existing trigger in the list
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
        setConnectionStatus(state, status) {
            state.connectionStatus = status;
            // Set class based on status
            switch (status) {
                case 'Connecting...':
                    state.connectionStatusClass = 'pill pill-yellow';
                    break;
                case 'Connected':
                    state.connectionStatusClass = 'pill pill-green';
                    break;
                case 'Credential Error':
                case 'Not Connected':
                case 'Error Checking Status':
                case 'OBF Error':
                    state.connectionStatusClass = 'pill pill-red';
                    break;
                default:
                    state.connectionStatusClass = 'pill pill-unknown';
                    break;
            }
        }
    },
    actions: {
        async fetchLogs({ commit }) {
            try {
                const response = await fetch('/wp-json/obf-pws/v1/logs', {
                    method: 'GET',
                    headers: {
                        'obf-api-key': '9b255783-6844-42f6-be24-3ac62c178859',
                        'X-WP-Nonce': obfOptions.nonce,
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
                const response = await fetch('/wp-json/obf-pws/v1/badges', {
                    method: 'GET',
                    headers: {
                        'obf-api-key': '9b255783-6844-42f6-be24-3ac62c178859',
                        'X-WP-Nonce': obfOptions.nonce,
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
                const response = await fetch('/wp-json/obf-pws/v1/triggers', {
                    method: 'GET',
                    headers: {
                        'obf-api-key': '9b255783-6844-42f6-be24-3ac62c178859',
                        'X-WP-Nonce': obfOptions.nonce,
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
                const response = await fetch('/wp-json/obf-pws/v1/triggers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'obf-api-key': '9b255783-6844-42f6-be24-3ac62c178859',
                        'X-WP-Nonce': obfOptions.nonce,
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
                const response = await fetch(`/wp-json/obf-pws/v1/triggers/${triggerId}`, {
                    method: 'DELETE',
                    headers: {
                        'obf-api-key': '9b255783-6844-42f6-be24-3ac62c178859',
                        'X-WP-Nonce': obfOptions.nonce,
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
                const response = await fetch('/wp-json/obf-pws/v1/notices', {
                    method: 'GET',
                    headers: {
                        'obf-api-key': '9b255783-6844-42f6-be24-3ac62c178859',
                        'X-WP-Nonce': obfOptions.nonce,
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
                const response = await fetch(`/wp-json/obf-pws/v1/notices/${noticeId}`, {
                    method: 'DELETE',
                    headers: {
                        'obf-api-key': '9b255783-6844-42f6-be24-3ac62c178859',
                        'X-WP-Nonce': obfOptions.nonce,
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
                const response = await fetch('/wp-json/obf-pws/v1/connection-status', {
                    method: 'GET',
                    headers: {
                        'obf-api-key': '9b255783-6844-42f6-be24-3ac62c178859',
                        'X-WP-Nonce': obfOptions.nonce,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch connection status');
                }

                const data = await response.json();
                const status = data.connection_status || 'Error checking status';
                commit('setConnectionStatus', status); // Commit the status to Vuex
            } catch (error) {
                console.error('Error fetching connection status:', error);
                commit('setConnectionStatus', 'Error checking status'); // Update on error
            }
        },
    },
    getters: {
        getBadges: (state) => state.badges,
        getTriggers: (state) => state.triggers,
        getNotices: (state) => state.notices,
        getConnectionStatus: (state) => state.connectionStatus,
        getConnectionStatusClass: (state) => state.connectionStatusClass,
    },
});

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style.css';

// Create the app instance
const app = createApp(App);

// --- Initial Load Handling ---
// Read the 'tab' query parameter from the actual browser URL (set by WordPress)
const urlParams = new URLSearchParams(window.location.search);
const initialTab = urlParams.get('tab') || 'badges'; // Default to 'badges' if not present

// Navigate Vue Router to the initial state based on the WordPress URL tab.
// Use router.replace to set the initial history entry without adding the default '/' path.
// This will update the hash fragment (e.g., from #/ to #/?tab=initialTab)
router.replace({ path: '/', query: { tab: initialTab } }).catch(err => {
    console.error("Vue Router initial navigation failed:", err);
});

// Wait for the router to finish its initial navigation and be ready
router.isReady().then(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const mountElement = document.getElementById('pathwise-badge-connect');

        if (mountElement) {
            app.use(router);
            app.use(store);

            app.mount(mountElement);
            console.log('Vue app mounted successfully!');
        } else {
            console.error('Vue app target element #pathwise-badge-connect not found in the DOM.');
        }
    });
}).catch(err => {
    console.error("Vue Router readiness check failed:", err);
});
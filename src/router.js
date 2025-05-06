import { createRouter, createWebHashHistory } from 'vue-router';
import Badges from './components/Badges.vue';
import Triggers from './components/Triggers.vue';
import Settings from './components/Settings.vue';
import Log from './components/Log.vue';

// Define the base route that will hold our dynamic component
// Using '/' as the path after the hash is common with hash history.
// The dynamic component will be attached to this route match.
const routes = [
    {
        path: '/', // This route will match the hash part like #/ or #/?tab=...
        name: 'adminPage', // Give it a name for easier reference
        // The component will be set dynamically in beforeEach
        component: null, // Start with null
        // Pass the tab query parameter as a prop (optional, but good practice)
        props: (route) => ({ tab: route.query.tab }),
    },
    // Optional: Add a catch-all redirect for any other hash paths
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    }
];

const router = createRouter({
    history: createWebHashHistory(), // Keep hash history
    routes,
});

const tabComponents = {
    badges: Badges,
    triggers: Triggers,
    settings: Settings,
    log: Log,
};

router.beforeEach((to, from, next) => {
    // Read the tab parameter from the Vue router's query (which comes from the hash fragment)
    const tab = to.query.tab || 'badges'; // Default to 'badges' if no tab is in the hash query

    const component = tabComponents[tab];

    if (component) {
        // Find the matched route we defined (the one with path '/')
        const matchedRoute = to.matched.find(match => match.name === 'adminPage');

        if (matchedRoute) {
            // Dynamically set the component for this route record
            matchedRoute.components = { default: component };
            next(); // Proceed with the navigation
        } else {
            // Should not happen with the catch-all redirect, but as a fallback
            console.error("Could not find the base adminPage route match.");
            next(false); // Cancel navigation
        }

    } else {
        // If the tab is invalid, redirect to the default tab route within Vue Router
        console.warn(`Invalid tab "${tab}". Redirecting to default "badges".`);
        next({ path: '/', query: { tab: 'badges' }, replace: true }); // replace: true prevents adding invalid route to history
    }
});

export default router;
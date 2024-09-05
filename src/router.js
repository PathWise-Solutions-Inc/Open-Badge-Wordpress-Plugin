import { createRouter, createWebHistory } from 'vue-router';
import Badges from './components/Badges.vue';
import Triggers from './components/Triggers.vue';
import Settings from './components/Settings.vue';
import Log from './components/Log.vue';

const routes = [
    {
        path: '/wp-admin/admin.php',
        component: { render: (h) => h('router-view') },
        props: (route) => ({ tab: route.query.tab }),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const tabComponents = {
    badges: Badges,
    triggers: Triggers,
    settings: Settings,
    log: Log,
};

router.beforeEach((to, from, next) => {
    const tab = to.query.tab || 'badges';
    const component = tabComponents[tab] || Badges; // Default to Badges if the tab is invalid
    if (component) {
        to.matched[0].components.default = component;
        next();
    } else {
        next('/wp-admin/admin.php?tab=badges'); // Redirect to the default tab if invalid
    }
});

export default router;

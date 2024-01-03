import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path:'/',
        name: 'HomeView',
        component: () => import('../views/HomeView.vue'),

    },
    {
        path:'/about',
        name: 'AboutView',
        component: () => import('../views/AboutView.vue'),

    
    },{
        path:'/create',
        name: 'CreateGame',
        component: () => import('../views/CreateGame.vue'),

    },
    {
        path:'/editUsers',
        name: 'editUsers',
        component: () => import('../views/EditUsers.vue'),

    },
    {
        path:'/editGames',
        name: 'editGames',
        component: () => import('../views/EditGames.vue'),

    }



]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (!to.matched.length) {
        next({ name: 'HomeView' }); // Przenieś na stronę główną
    } else {
        next(); // Kontynuuj nawigację do docelowej trasy
    }
});

export default router;
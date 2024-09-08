// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../auth'; // Import your authentication service


const TicketDetails = () => import('../views/TicketDetails.vue');

const SignIn = () => import('../components/SignIn.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TicketDetails,
    meta: { requiresAuth: true } // This route requires authentication
  },

  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: { requiresAuth: false } // This route does not require authentication
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
// Global before guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = auth.isAuthenticated();
  
  // Check if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      next(); // Allow access
    } else {
      next({ name: 'SignIn' }); // Redirect to Sign In page
    }
  } else if (to.name === 'SignIn' && isAuthenticated) {
    // Redirect authenticated users away from SignIn page
    next({ name: 'Home' }); // Redirect to Home or any other route
  } else {
    next(); // Always allow access if no authentication required
  }
});

export default router;
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import global CSS files


const app = createApp(App);
app.use(router);
app.mount('#app');

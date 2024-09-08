// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';

// Create the Vue app instance
const app = createApp(App);

// Use router and i18n plugins
app.use(router);
app.use(i18n);

// Mount the app
app.mount('#app');

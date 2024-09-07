// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import global CSS files
import './assets/vendor/bootstrap/dist/css/bootstrap.min.css';
import './assets/vendor/fancybox/dist/jquery.fancybox.min.css';
import './assets/vendor/pixeden-stroke-7-icon/pe-icon-7-stroke/dist/pe-icon-7-stroke.min.css';
import './assets/vendor/swiper/swiper-bundle.min.css' ;
import './assets/vendor/bootstrap-select/dist/css/bootstrap-select.min.css';
import './assets/vendor/dropzone/dist/min/dropzone.min.css';
import './assets/vendor/quill/dist/quill.snow.css';
import './assets/css/amdesk.min.css';
import './assets/css/custom.css';
import './assets/css/amdesk.min.css';
import './assets/css/custom.css';

const app = createApp(App);
app.use(router);
app.mount('#app');

// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import TicketList from '../components/TicketList.vue'; // Import your components
import TicketDetail from '../components/TicketDetail.vue'; // Example component

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TicketList
  },
  {
    path: '/ticket/:id',
    name: 'TicketDetail',
    component: TicketDetail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

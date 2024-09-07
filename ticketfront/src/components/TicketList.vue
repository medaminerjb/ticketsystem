// src/components/TicketList.vue
<template>
  <div>
    <h1>Tickets</h1>
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        <router-link :to="{ name: 'TicketDetail', params: { id: ticket.id } }">
          {{ ticket.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import TicketService from '../TicketService'; // Adjust path as needed

export default {
  data() {
    return {
      tickets: []
    };
  },
  created() {
    this.fetchTickets();
  },
  methods: {
    async fetchTickets() {
      try {
        const response = await TicketService.getTickets();
        this.tickets = response.data;
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    }
  }
};
</script>

<template>
  <div>
    <h1>Tickets</h1>
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        {{ ticket.title }} - {{ ticket.status }}
        <button @click="editTicket(ticket)">Edit</button>
        <button @click="deleteTicket(ticket.id)">Delete</button>
      </li>
    </ul>
    <!-- Add more functionalities like forms for creating/updating tickets -->
  </div>
</template>

<script>
import { getTickets, deleteTicket } from './TicketService';

export default {
  data() {
    return {
      tickets: [],
    };
  },
  created() {
    this.fetchTickets();
  },
  methods: {
    async fetchTickets() {
      try {
        const response = await getTickets();
        this.tickets = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTicket(id) {
      try {
        await deleteTicket(id);
        this.fetchTickets(); // Refresh the list
      } catch (error) {
        console.error(error);
      }
    },
    editTicket(ticket) {
      // Implement the edit functionality
    },
  },
};
</script>

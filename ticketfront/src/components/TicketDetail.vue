// src/components/TicketDetail.vue
<template>
  <div>
    <h1>{{ ticket.name }}</h1>
    <p>{{ ticket.description }}</p>
  </div>
</template>

<script>
import TicketService from '../TicketService'; // Adjust path as needed

export default {
  props: ['id'],
  data() {
    return {
      ticket: {}
    };
  },
  created() {
    this.fetchTicket();
  },
  methods: {
    async fetchTicket() {
      try {
        const response = await TicketService.getTicket(this.$route.params.id);
        this.ticket = response.data;
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    }
  }
};
</script>

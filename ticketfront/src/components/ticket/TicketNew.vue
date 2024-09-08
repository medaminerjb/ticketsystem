<!-- src/components/TicketInput.vue -->
<template>
    <div class="pb-2">
      <div class="card">
        <div class="card-body">
          <div class="d-flex flex-row align-items-center">
            <input type="text" class="form-control form-control-lg" v-model="newticket" :placeholder="$t('addNew')" />
            <a href="#!" data-mdb-tooltip-init title="Set due date"><i class="fas fa-calendar-alt fa-lg me-3"></i></a>
            <div>
              <button type="button" @click.prevent="addTicket" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary">
                {{ $t('addNew') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../../axios';

  export default {
    data() {
      return {
        newticket: ''
      };
    },
    methods: {
        
        async addTicket() {
      if (!this.newticket.trim()) return;
      try {
        await axios.post('ticket/', { newticket: this.newticket });
        this.$emit('ticket-added');
        this.newticket = '';
    
      } catch (error) {
        console.error('Error adding ticket:', error.response?.data || error.message);
      }
      this.$emit('add', { ...this.newticket });
        }
    }
  };
  </script>
  
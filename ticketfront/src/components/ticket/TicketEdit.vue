<template>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
        <h2>Edit Ticket</h2>
        <input v-model="editedTicket.value" type="text" class="form-control" />
        <button @click="saveChanges" class="btn btn-primary mt-2">Save</button>
      </div>
    </div>
  </template>
  
  <script>
    import axios from '../../axios';
  export default {
    props: {
      ticket: Object,
      isVisible: Boolean
    },
    data() {
      return {
        editedTicket: { ...this.ticket }
      };
    },
    watch: {
      ticket: {
        handler(newTicket) {
          this.editedTicket = { ...newTicket };
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      async saveChanges() {
        console.log('TEST')
        // Ensure you emit the updated ticket
        try {
          await axios.put(`tickets/${this.editedTicket.id}/update/`, {
            ticketId: this.editedTicket.id,
            value: this.editedTicket.value
          });
        } catch (error) {
          console.error('Error updating ticket:', error);
        }
        this.$emit('update', { ...this.editedTicket });
      }
    }
  };
  </script>
  
  <style>
  /* Add some basic styling for the modal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
    max-width: 100%;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  </style>
  
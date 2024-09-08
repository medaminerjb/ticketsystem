<template>

    <ul class="list-group list-group-horizontal rounded-0">
    <li class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
      <div class="form-check">
        <input class="form-check-input me-0" @click.prevent="toggleStatus" type="checkbox" :checked="ticket.done" aria-label="..." />
      </div>
      <p class="lead fw-normal mb-0 ms-3">{{ ticket.value }}</p>
      <div class="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-body-tertiary ms-3">
        <p class="small mb-0">
          <a href="#!" data-mdb-tooltip-init title="Due on date">
            <i class="fas fa-hourglass-half me-2 text-warning"></i>
          </a>
          {{ formatDate(ticket.created_at) }}
        </p>
      </div>
      <div class="d-flex flex-row justify-content-end ms-auto">
        <a href="#!" @click.prevent="editTicket" class="text-info me-2" data-mdb-tooltip-init title="Edit todo">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
        </a>
        <a href="#!" @click.prevent="deleteTicket" class="text-danger" data-mdb-tooltip-init title="Delete todo">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
        </a>
      </div>
    </li>
    </ul>
  </template>
  
  <script>
  export default {
    props: {
      ticket: Object
    },
    methods: {
      toggleStatus() {
        this.$emit('status', this.ticket.id);
      },
      editTicket() {
        this.$emit('edit', this.ticket);
      },
      deleteTicket() {
        this.$emit('delete', this.ticket.id);
      },
      formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    }
  };
  </script>

<style scoped>
#list1 .form-control {
  border-color: transparent;
}
#list1 .form-control:focus {
  border-color: transparent;
  box-shadow: none;
}
#list1 .select-input.form-control[readonly]:not([disabled]) {
  background-color: #fbfbfb;
}</style>

  
// src/components/TicketList.vue
<template>
  <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card" id="list1" style="border-radius: .75rem; background-color: #eff1f2;">
            <div class="card-body py-4 px-4 px-md-5">

              <p class="h1 text-center mt-3 mb-4 pb-3 text-primary">
                <i class="fas fa-check-square me-1"></i>
                <u>{{ $t('myTodos') }}</u>
              </p>
              <div class="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                <p class="small mb-0 me-2 text-muted">Language</p>
                <select v-model="selectedLanguage" @change="changeLanguage">
                  <option value="en">{{ $t('english') }}</option>
                  <option value="fr">{{ $t('french') }}</option>
                  <!-- Add more languages here -->
                </select>
                <p class="small mb-0 ms-4 me-2 text-muted">{{ $t('logout') }}</p>
                <a href="#!" style="color: red;" @click.prevent="logout" data-mdb-tooltip-init title="{{ $t('logout') }}">
             
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                  </svg>
                </a>
              </div>
              <div class="pb-2">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex flex-row align-items-center">
                      <input type="text" class="form-control form-control-lg" v-model="newticket"
                      :placeholder="$t('addNew')">
                      <a href="#!" data-mdb-tooltip-init title="Set due date"><i class="fas fa-calendar-alt fa-lg me-3"></i></a>
                      <div>
                        <button type="button" @click.prevent="addForm" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary"> {{ $t('addNew') }}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr class="my-4">

              

              <ul class="list-group list-group-horizontal rounded-0" v-for="ticket in tickets" :key="ticket.id">
                <li class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                  <div class="form-check">
                    <input class="form-check-input me-0" @click.prevent="statusForm(ticket.id)" type="checkbox" :checked="ticket.done" aria-label="..." />
                  </div>
                </li>
                <li class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                  <p class="lead fw-normal mb-0">{{ ticket.value }}</p>
                </li>
                <li class="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                  <div class="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-body-tertiary">
                    <p class="small mb-0">
                      <a href="#!" data-mdb-tooltip-init title="Due on date">
                        <i class="fas fa-hourglass-half me-2 text-warning"></i>
                      </a>
                      {{ formatDate(ticket.created_at) }}
                    </p>
                  </div>
                </li>
                <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                  <div class="d-flex flex-row justify-content-end mb-1">
                    <a href="#!" @click.prevent="openEditForm(ticket)" class="text-info" data-mdb-tooltip-init title="Edit todo">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                      </svg>
                    </a>
                    <a href="#!" @click.prevent="deleteForm(ticket.id)" class="text-danger" data-mdb-tooltip-init title="Delete todo">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                      </svg>
                    </a>
                  </div>
                  <div class="text-end text-muted">
                    <a href="#!" class="text-muted" data-mdb-tooltip-init title="Created date">
                      <p class="small mb-0">
                        <i class="fas fa-info-circle me-2"></i>{{ formatDate(ticket.created_at) }}</p>
                    </a>
                  </div>
                </li>
              </ul>

              <!-- Edit Form Modal -->
              <div v-if="showEditForm" class="modal" @click.self="showEditForm = false">
                <div class="modal-content">
                  <span @click="showEditForm = false" class="close">&times;</span>
                  <h2>{{ $t('editTodo') }}</h2>
                  <input type="text" v-model="selectedTicket.value" />
                  <button @click="updateTicket">{{ $t('saveChanges') }}</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import axios from '../axios';
import { auth } from '../auth'; // Import your authentication service
export default {
  data() {
    return {
      tickets: [],
      newticket : '',
      selectedTicket: null,
      showEditForm: false,
      selectedLanguage: 'en' // Bind this to the select element

    };
  },
  created() {
    this.fetchTickets();
  },
  methods: {
    async changeLanguage(event) {
    const locale = event.target.value;
    console.log('Selected Locale:', locale); // Debug logging
    if (!locale) {
      console.error('Locale is undefined');
      return;
    }
    try {
      const messages = await import(`../locales/${locale}.json`);
      this.$i18n.setLocaleMessage(locale, messages.default);
      this.$i18n.locale = locale;
    } catch (error) {
      console.error('Error loading locale messages:', error);
    }
  },

    openEditForm(ticket) {
      console.log(ticket);
    this.selectedTicket = { ...ticket }; // Clone ticket for editing
    this.showEditForm = true; // Toggle visibility of the edit form
  },
    async fetchTickets() {
      try {
        const response = await axios.get('ticket/',{});
        this.tickets = response.data;
        console.log('Tickets fetched:', response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    }, formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },

    async addForm() {
    console.log(this.newticket)
      try {
        const response = await axios.post('ticket/', {
          newticket: this.newticket,
        });
        console.log('Login successful:', response.data);
        this.fetchTickets();
      } catch (error) {

        console.error('Login failed:', error.response.data);

      }

    },
    async deleteForm(ticketId) {
      try {
    const response = await axios.delete(`/tickets/${ticketId}/`);
    console.log('Ticket deleted:', response.data);
    this.fetchTickets();
  } catch (error) {
    console.error('Error deleting ticket:', error.response?.data || error.message);
  }

},
async updateTicket() {
      if (!this.selectedTicket || !this.selectedTicket.value.trim()) {
        console.warn('Cannot update with empty value');
        return;
      }
      try {
        await axios.put(`tickets/${this.selectedTicket.id}/update/`,{
          ticketId: this.selectedTicket.id,
          value: this.selectedTicket.value,
        });
        console.log('Ticket updated:', this.selectedTicket);
        this.showEditForm = false; // Hide the edit form
        this.fetchTickets(); // Refresh ticket list
      } catch (error) {
        console.error('Error updating ticket:', error.response?.data || error.message);
      }
    },
    async statusForm(id) {
      try {
        await axios.put(`tickets/${id}/update/`,{

          status: 'status',
        });
        console.log('Ticket updated:', this.selectedTicket);
        this.showEditForm = false; // Hide the edit form
        this.fetchTickets(); // Refresh ticket list
      } catch (error) {
        console.error('Error updating ticket:', error.response?.data || error.message);
      }

    },
    async logout() {
      try {
        // Replace with your actual logout logic
        const token = localStorage.getItem('authToken');
        
        console.log(token)
        auth.logout();
        await axios.post('/logout/',{token:token}); // Example API call
        console.log('Logged out successfully');
        // You might want to redirect or clear user data here
      this.$router.push('/signin'); // Redirect to login page, adjust as needed
      } catch (error) {
        console.error('Error logging out:', error.response?.data || error.message);
      }
    }

    
  }
};
</script>
<style scoped>
/* Modal background */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensure modal is on top */
}

/* Modal content */
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

/* Close button */
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  color: #333;
}

/* Close button hover effect */
.close:hover {
  color: #ff0000;
}

/* Input styles */
.form-control {
  border-radius: 5px;
  border: 1px solid #ced4da;
  box-shadow: none;
  padding: 10px;
  font-size: 16px;
}

.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
}

/* Button styles */
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

/* Modal input field */
.modal-content input[type="text"] {
  border-radius: 5px;
  border: 1px solid #ced4da;
  padding: 10px;
  font-size: 16px;
  width: calc(100% - 22px); /* Adjust width to fit within modal */
}

/* Modal save button */
.modal-content button {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

.modal-content button:hover {
  background-color: #0056b3;
  border-color: #004085;
}
</style>

<style>
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

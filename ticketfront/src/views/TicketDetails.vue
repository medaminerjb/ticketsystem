<!-- src/components/TicketList.vue -->
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
                    <option v-for="language in languages" :key="language.code" :value="language.code">
                      {{ language.name }}
                    </option>
                  </select>
          
                  <p class="small mb-0 ms-4 me-2 text-muted">{{ $t('logout') }}</p>
                  <a href="#!" style="color: red;" @click.prevent="logout" data-mdb-tooltip-init title="{{ $t('logout') }}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                      <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                    </svg>
                  </a>
                </div>
                <TicketInput @add="addForm" />
                <hr class="my-4">
                <TicketListItem
                  v-for="ticket in tickets"
                  :key="ticket.id"
                  :ticket="ticket"
                  @edit="openEditForm"
                  @delete="deleteForm"
                  @status="statusForm"
                />
                <TicketEdit
                :ticket="selectedTicket"
                :isVisible="isModalVisible"
                @close="closeModal"
                @update="updateTicket"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import axios from '../axios';
  import { auth } from '../auth';
  import TicketInput from '../components/ticket/TicketNew.vue';
  import TicketListItem from '../components/ticket/TicketListing.vue';
    import TicketEdit from '../components/ticket/TicketEdit.vue';
  
  export default {
    components: { TicketInput, TicketListItem, TicketEdit },
    data() {
      return {
        languages: JSON.parse(process.env.VUE_APP_LANGUAGES || '[]'),
        tickets: [],
        newticket: '',
        selectedTicket: null,
        isModalVisible: false,
        selectedLanguage: 'en'
      };
    },
    created() {
      this.fetchTickets();
    },
    methods: {
      async changeLanguage(event) {
        const locale = event.target.value;
        if (!locale) return;
        try {
          const messages = await import(`../locales/${locale}.json`);
          this.$i18n.setLocaleMessage(locale, messages.default);
          this.$i18n.locale = locale;
        } catch (error) {
          console.error('Error loading locale messages:', error);
        }
      },
      openEditForm(ticket) {
        this.selectedTicket = { ...ticket };
        this.isModalVisible = true;
      },
        closeModal() {
      this.isModalVisible = false;
    },
      async fetchTickets() {
        try {
          const response = await axios.get('ticket/');
          console.log(response.data);
          this.tickets = response.data;
        } catch (error) {
          console.error('Error fetching tickets:', error);
        }
      },
      async addForm() {

          this.fetchTickets();
      
      },
      async deleteForm(ticketId) {
        try {
          await axios.delete(`/tickets/${ticketId}/`);
          this.fetchTickets();
        } catch (error) {
          console.error('Error deleting ticket:', error);
        }
      },
      async updateTicket() {
        this.isModalVisible = false;
        this.fetchTickets();
    
      },
      async statusForm(id) {
        try {
          await axios.put(`tickets/${id}/update/`, { status: 'status' });
          this.fetchTickets();
        } catch (error) {
          console.error('Error updating status:', error);
        }
      },formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
      async logout() {
        try {
          const token = localStorage.getItem('authToken');
          auth.logout();
          await axios.post('/logout/', { token });
          this.$router.push('/signin');
        } catch (error) {
          console.error('Error logging out:', error);
        }
      }
    }
  };
  </script>
  

  
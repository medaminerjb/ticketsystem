import axios from 'axios';

const API_URL = process.env.VUE_APP_API_ADDRESS;

export const getTickets = () => axios.get(API_URL);
export const createTicket = (ticket) => axios.post(API_URL, ticket);
export const updateTicket = (id, ticket) => axios.put(`${API_URL}${id}/`, ticket);
export const deleteTicket = (id) => axios.delete(`${API_URL}${id}/`);

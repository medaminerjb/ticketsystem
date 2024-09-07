// src/services/auth.js
export const auth = {
    isAuthenticated() {
      // Replace this with your actual authentication logic
      // For example, check if a token exists in local storage
      return !!localStorage.getItem('authToken');
    },
    
    login(token) {
      // Store the token or any other authentication data
      localStorage.setItem('authToken', token);
    },
    
    logout() {
      // Clear the token
      localStorage.removeItem('authToken');
    }
  };
  
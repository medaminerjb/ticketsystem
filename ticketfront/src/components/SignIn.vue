<template>
    <section class="container forms">
      <!-- Login Form -->
      <div v-if="!isSignup" class="form login">
        <div class="form-content">
          <header>Login</header>
          <form @submit.prevent="handleLogin">
            <div class="field input-field">
              <input type="text" v-model="loginEmail" placeholder="username" class="input" required>
            </div>
  
            <div class="field input-field">
              <input :type="loginPasswordType" v-model="loginPassword" placeholder="Password" class="password" required>
              <i @click="togglePassword('login')" :class="['bx', showLoginPassword ? 'bx-show' : 'bx-hide', 'eye-icon']"></i>
            </div>
  
            <div class="form-link">
              <a href="#" class="forgot-pass">Forgot password?</a>
            </div>
  
            <div class="field button-field">
              <button type="submit">Login</button>
            </div>
          </form>
  
          <div class="form-link">
            <span>Don't have an account? <a href="#" @click.prevent="toggleForm" class="link signup-link">Signup</a></span>
          </div>
        </div>
  
        <div class="line"></div>
  
        <div class="media-options">
          <a href="#" class="field facebook">
            <i class='bx bxl-facebook facebook-icon'></i>
            <span>Login with Facebook</span>
          </a>
        </div>
  
        <div class="media-options">
          <a href="#" class="field google">
            <img src="#" alt="" class="google-img">
            <span>Login with Google</span>
          </a>
        </div>
      </div>
  
      <!-- Signup Form -->
      <div v-if="isSignup" class="form signup">
        <div class="form-content">
          <header>Signup</header>
          <form @submit.prevent="handleSignup">
            <div class="field input-field">
              <input type="text" v-model="signupEmail" placeholder="username" class="input" required>
            </div>
  
            <div class="field input-field">
              <input :type="signupPasswordType" v-model="signupPassword" placeholder="Create password" class="password" required>
            </div>
  
            <div class="field input-field">
              <input :type="signupConfirmPasswordType" v-model="signupConfirmPassword" placeholder="Confirm password" class="password" required>
              <i @click="togglePassword('signup')" :class="['bx', showSignupPassword ? 'bx-show' : 'bx-hide', 'eye-icon']"></i>
            </div>
  
            <div class="field button-field">
              <button type="submit">Signup</button>
            </div>
          </form>
  
          <div class="form-link">
    
            <span>Already have an account? <a href="#" type="button" @click.prevent="toggleForm" class="link login-link">Login</a></span>
          </div>
        </div>
  
        <div class="line"></div>
  
        <div class="media-options">
          <a href="#" class="field facebook">
            <i class='bx bxl-facebook facebook-icon'></i>
            <span>Signup with Facebook</span>
          </a>
        </div>
  
        <div class="media-options">
          <a href="#" class="field google">
            <img src="#" alt="" class="google-img">
            <span>Signup with Google</span>
          </a>
        </div>
      </div>
    </section>
  </template>
<script>
import { auth } from '../auth'; // Import your authentication service
import axios from '../axios';
export default {
  data() {
    return {
      isSignup: false, 
      loginEmail: '',
      loginPassword: '',
      signupEmail: '',
      signupPassword: '',
      signupConfirmPassword: '',
      showLoginPassword: false,
      showSignupPassword: false,
    };
  },
  computed: {
    loginPasswordType() {
      return this.showLoginPassword ? 'text' : 'password';
    },
    signupPasswordType() {
      return this.showSignupPassword ? 'text' : 'password';
    },
    signupConfirmPasswordType() {
      return this.showSignupPassword ? 'text' : 'password';
    },
  },
  methods: {
    toggleForm() {
        if (this.isSignup)
      {this.isSignup = !this.isSignup;}
      else {
        this.isSignup = true;

      }

    },
    togglePassword(formType) {
      if (formType === 'login') {
        this.showLoginPassword = !this.showLoginPassword;
      } else if (formType === 'signup') {
        this.showSignupPassword = !this.showSignupPassword;
      }
    },
    async handleLogin() {
      try {
        const response = await axios.post('login/', {
          email: this.loginEmail,
          password: this.loginPassword,
          login : 'login'
        });
        console.log('Login successful:', response.data);
        const token = 'dummy-token'; // Assume you get a token from your API
        console.log('Token:', token);
        auth.login(token); // Store the token
        //this.$router.push({ name: 'Home' }); // Redirect to home page
   
      } catch (error) {
        console.error('Login failed:', error.response.data);

      }
    },
    async handleSignup() {

      if (this.signupPassword !== this.signupConfirmPassword) {
        alert("Passwords do not match!");
        return;
      }  
      try {
        const response = await axios.post('signup/', {
          email: this.loginEmail,
          password: this.loginPassword,
          signup : 'signup'
        });
        console.log('Login successful:', response.data);
   
      } catch (error) {
        console.error('Login failed:', error.response.data);

      }
    },
  },
};




 const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
})      
links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); //preventing form submit
       forms.classList.toggle("show-signup");
    })
})
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}
.container{
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4070f4;
    column-gap: 30px;
}
.form{
    position: absolute;
    max-width: 430px;
    width: 100%;
    padding: 30px;
    border-radius: 6px;
    background: #FFF;
}

.forms.show-signup .form.signup{
    opacity: 1;
    pointer-events: auto;
}
.forms.show-signup .form.login{
    opacity: 0;
    pointer-events: none;
}
header{
    font-size: 28px;
    font-weight: 600;
    color: #232836;
    text-align: center;
}
form{
    margin-top: 30px;
}
.form .field{
    position: relative;
    height: 50px;
    width: 100%;
    margin-top: 20px;
    border-radius: 6px;
}
.field input,
.field button{
    height: 100%;
    width: 100%;
    border: none;
    font-size: 16px;
    font-weight: 400;
    border-radius: 6px;
}
.field input{
    outline: none;
    padding: 0 15px;
    border: 1px solid#CACACA;
}
.field input:focus{
    border-bottom-width: 2px;
}
.eye-icon{
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 18px;
    color: #8b8b8b;
    cursor: pointer;
    padding: 5px;
}
.field button{
    color: #fff;
    background-color: #0171d3;
    transition: all 0.3s ease;
    cursor: pointer;
}
.field button:hover{
    background-color: #016dcb;
}
.form-link{
    text-align: center;
    margin-top: 10px;
}
.form-link span,
.form-link a{
    font-size: 14px;
    font-weight: 400;
    color: #232836;
}
.form a{
    color: #0171d3;
    text-decoration: none;
}
.form-content a:hover{
    text-decoration: underline;
}
.line{
    position: relative;
    height: 1px;
    width: 100%;
    margin: 36px 0;
    background-color: #d4d4d4;
}
.line::before{
    content: 'Or';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFF;
    color: #8b8b8b;
    padding: 0 15px;
}
.media-options a{
    display: flex;
    align-items: center;
    justify-content: center;
}
a.facebook{
    color: #fff;
    background-color: #4267b2;
}
a.facebook .facebook-icon{
    height: 28px;
    width: 28px;
    color: #0171d3;
    font-size: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
}
.facebook-icon,
img.google-img{
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
}
img.google-img{
    height: 20px;
    width: 20px;
    object-fit: cover;
}
a.google{
    border: 1px solid #CACACA;
}
a.google span{
    font-weight: 500;
    opacity: 0.6;
    color: #232836;
}
@media screen and (max-width: 400px) {
    .form{
        padding: 20px 10px;
    }
    
}

</style>
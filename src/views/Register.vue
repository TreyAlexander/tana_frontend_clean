<template>
  <h2>Welcome!</h2>
  <img src="/src/assets/mrChef.png" alt="Mr Chef" class="header-img" />
  <h3>Please register to continue:</h3>

  <div class="auth-page">
    <div class="auth-box">
      <div class="auth-form">
        <input v-model="username" type="text" placeholder="Username" class="auth-input" />
        <input v-model="first_name" type="text" placeholder="First Name" class="auth-input" />
        <input v-model="last_name" type="text" placeholder="Last Name" class="auth-input" />
        <input v-model="phone_number" type="text" placeholder="Phone Number" class="auth-input" />
        <input v-model="email" type="email" placeholder="Email" class="auth-input" />
        <input v-model="restaurant_name" type="text" placeholder="Restaurant Name" class="auth-input" />
        <input v-model="password" type="password" placeholder="Password" class="auth-input" />
        <input v-model="password2" type="password" placeholder="Re-enter Password" class="auth-input" />

        <button @click="register" class="auth-button">Register</button>
        <span class="auth-link" @click="$router.push('/')">Back</span>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser } from '../services/api'

export default {
  name: 'Register',

  data() {
    return {
      username: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      restaurant_name: '',
      password: '',
      password2: ''
    }
  },

  methods: {
    async register() {
      if (this.password !== this.password2) {
        alert('Passwords do not match')
        return
      }

      try {
        const profileData = {
          username: this.username,
          first_name: this.first_name,
          last_name: this.last_name,
          phone_number: this.phone_number,
          email: this.email,
          restaurant_name: this.restaurant_name
        }

        await registerUser({
          ...profileData,
          password: this.password,
          password2: this.password2
        })

        localStorage.setItem('profile', JSON.stringify(profileData))

        alert('Registration successful. Please log in.')
        this.$router.push('/login')
      } catch (error) {
        alert(error.message || 'Registration failed')
      }
    }
  }
}
</script>

<style scoped>
h2 {
  color: #002872;
  margin-top: 20px;
  margin-bottom: 30px;
  text-align: center;
}

h3 {
  color: #002872;
  margin-top: 40px;
  margin-bottom: 0px;
  text-align: center;
}

.header-img {
  display: block;
  margin: 5px auto;
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 20px;
}
</style>
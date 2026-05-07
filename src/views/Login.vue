<template>
      <img src="/src/assets/carmy.png" alt="thebear" class="header-img" />
  <div class="auth-page">
    <div class="auth-box">
      <div v-if="!showForm" class="auth-form">
        <button type="button" @click="showForm = true" class="auth-button">
          Login
        </button>

        <span class="auth-link" @click="$router.push('/register')">
          Register
        </span>
      </div>


      <form v-else class="auth-form" @submit.prevent="login">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="auth-input"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="auth-input"
        />

        <button
          type="submit"
          class="auth-button"
          :disabled="!username || !password"
        >
          Login
        </button>

        <span class="auth-link" @click="goBack"> Back </span>
      </form>
    </div>
  </div>
</template>

<script>
import { loginUser } from '../services/api'

export default {
  name: 'Login',
  data() {
    return {
      showForm: false,
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await loginUser({
          username: this.username,
          password: this.password
        })

        localStorage.setItem('access', response.access)
        localStorage.setItem('refresh', response.refresh)

        this.$router.push('/inventory')
      } catch (error) {
        alert(error.message || 'Login failed')
      }
    },

    goBack() {
      this.showForm = false
      this.username = ''
      this.password = ''
    }
  }
}
</script>

<style scoped>
.header-img {
  display: block;
  margin: 30px auto;    
  width: 350px;         
  height: 180px;        
  object-fit: cover;
}
</style>


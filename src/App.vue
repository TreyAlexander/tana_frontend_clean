<template>
  <div id="app">
    <Navbar :isAuthenticated="authenticated" @logout="logout" />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data() {
    return {
      authenticated: false
    }
  },
  mounted() {
    this.authenticated = localStorage.getItem('isAuthenticated') === 'true'
  },
  methods: {
    setAuthState(value) {
      this.authenticated = value
      localStorage.setItem('isAuthenticated', String(value))
    },
    logout() {
      localStorage.removeItem('log_user')
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      localStorage.setItem('isAuthenticated', 'false')
      this.authenticated = false
      this.$router.push('/login')
    }
  },
  watch: {
    $route() {
      this.authenticated = localStorage.getItem('isAuthenticated') === 'true'
    }
  }
}
</script>

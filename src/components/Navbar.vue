<template>
  <nav class="navbar">
    <h1>TANA</h1>

    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/inventory">Inventory</router-link>
      <router-link to="/profile">Profile</router-link>

      <router-link v-if="!isAuthenticated" to="/login">
        Login
      </router-link>

      <button v-else class="nav-link-button" @click="logout">
        Logout
      </button>
      <router-link to="/register">Register</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isAuthenticated: !!localStorage.getItem("access"),
    };
  },
  mounted() {
    window.addEventListener("auth-changed", this.checkAuth);
  },
  beforeUnmount() {
    window.removeEventListener("auth-changed", this.checkAuth);
  },
  methods: {
    checkAuth() {
      this.isAuthenticated = !!localStorage.getItem("access");
    },
    logout() {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      localStorage.removeItem("profile");

      this.isAuthenticated = false;
      window.dispatchEvent(new Event("auth-changed"));
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #5f82c3;
  color: white;
  text-align: center;
  padding: 20px;
}

.navbar h1 {
  margin: 0 0 12px 0;
  letter-spacing: 4px;
}

.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
}

.nav-links a,
.nav-link-button {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
}

.nav-links a:hover,
.nav-link-button:hover {
  text-decoration: underline;
}

.nav-link-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
}
</style>
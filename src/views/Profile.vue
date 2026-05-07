<template>
  <div class="profile-page">
    <h2>Your Profile</h2>

    <div class="profile-box">
      <input v-model="profile.username" class="profile-field" placeholder="Username" :readonly="!editMode" />
      <input v-model="profile.first_name" class="profile-field" placeholder="First Name" :readonly="!editMode" />
      <input v-model="profile.last_name" class="profile-field" placeholder="Last Name" :readonly="!editMode" />
      <input v-model="profile.phone_number" class="profile-field" placeholder="Phone Number" :readonly="!editMode" />
      <input v-model="profile.email" class="profile-field" placeholder="Email" :readonly="!editMode" />
      <input v-model="profile.restaurant_name" class="profile-field" placeholder="Restaurant Name" :readonly="!editMode" />

      <button v-if="!editMode" @click="editMode = true">Edit Profile</button>
      <button v-else @click="saveProfile">Save Changes</button>
    </div>
  </div>
</template>

<script>
import { updateUser } from '../services/api'

export default {
  name: 'Profile',
  data() {
    return {
      editMode: false,
      profile: {
        pk: null,
        username: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        restaurant_name: ''
      }
    }
  },
  mounted() {
    const savedProfile = localStorage.getItem('profile')

    if (savedProfile) {
      this.profile = JSON.parse(savedProfile)
    }
  },
  methods: {
    async saveProfile() {
      try {
        if (this.profile.pk) {
          await updateUser(this.profile.pk, this.profile)
        }

        localStorage.setItem('profile', JSON.stringify(this.profile))
        this.editMode = false
      } catch (error) {
        alert('Update failed')
      }
    }
  }
}
</script>

<style scoped>
.profile-page {
  min-height: 90vh;
  text-align: center;
  background: #f5efe6;
  padding-top: 60px;
}

h2 {
  color: #002872;
  margin-bottom: 40px;
}

.profile-box {
  width: 500px;
  margin: 0 auto;
}

.profile-field {
  width: 100%;
  background: #6d88c7;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 18px;
  margin-bottom: 15px;
  text-align: center;
  font-size: 18px;
  box-sizing: border-box;
}

.profile-field::placeholder {
  color: white;
}

.profile-field:focus {
  outline: none;
}

.profile-field:read-only {
  cursor: default;
}

.profile-field:not(:read-only) {
  background: #5f7fc1;
  outline: 3px solid #002872;
}

button {
  background: #002872;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 25px;
  margin-top: 20px;
  cursor: pointer;
}
</style>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';


const registData = ref({
  email: '',
  name: '',
  password: '',
  password2: '',
  role: '',
  phone: ''
})

const errorMsg = ref('')
const showSuccess = ref(false)

const sendData = () => {
  if (registData.value.password !== registData.value.password2) {
    errorMsg.value = 'Password and confirm is not same'
    registData.value.password = ''
    registData.value.password2 = ''
    return
  }
  if (registData.value.password.length < 6) {
    errorMsg.value = 'Password must at least 6 charracter'
    registData.value.password = ''
    registData.value.password2 = ''
    return
  }
  axios.post('/regist', registData.value)
    .then(() => {
      registData.value = { email: '', name: '', password: '', password2: '', role: '', phone: '' }
      showSuccess.value = true
    })
    .catch(error => {
      if (error.response?.status == 500) {
        errorMsg.value = 'Internal server error'
      }
      if (error.response?.status == 422) {
        errorMsg.value = 'Please input the field'
      }
      if (error.response?.status == 422 && error.response.data.message == 'validation.unique') {
        errorMsg.value = 'The email has already been taken.'
      }
      if (error.response?.status == 422 && error.response?.data.message == 'The email has already been taken.') {
        errorMsg.value = error.response.data.message
      }

      registData.value = { email: '', name: '', password: '', password2: '', role: '', phone: '' }

    })
}

const goLogin = () => {
  showSuccess.value = false
  router.push('/login')
}

const showPass = ref(false)
const showPass2 = ref(false)

const showToggle = () => showPass.value = !showPass.value
const showToggle2 = () => showPass2.value = !showPass2.value
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">

    <div class="hidden lg:flex w-1/2 items-center justify-center bg-blue-50">
      <img
        src="https://static.vecteezy.com/system/resources/previews/003/689/230/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
        alt="Sign up illustrastion" class="max-w-md" />
    </div>

    <div class="flex w-full lg:w-1/2 items-center justify-center p-8">

      <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h1>
        <p class="text-center text-gray-500 mb-6">
          Join <span class="text-blue-500 font-semibold">TaskFlow</span> today
        </p>

        <div v-if="errorMsg" class="mb-4 text-red-500 text-sm text-center">
          {{ errorMsg }}
        </div>

        <form @submit.prevent="sendData" class="space-y-5">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="text" id="email" v-model="registData.email" placeholder="Enter your email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition" />
          </div>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" id="name" v-model="registData.name" placeholder="Enter your name"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition" />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div class="flex">
              <input :type="showPass ? 'text' : 'password'" id="password" v-model="registData.password"
                placeholder="Enter your password"
                class="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition" />
              <button type="button" @click="showToggle"
                class="px-4 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500 hover:bg-gray-200 transition">
                <i :class="showPass ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
              </button>
            </div>
          </div>

          <div>
            <label for="password2" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div class="flex">
              <input :type="showPass2 ? 'text' : 'password'" id="password2" v-model="registData.password2"
                placeholder="Re-enter your password"
                class="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition" />
              <button type="button" @click="showToggle2"
                class="px-4 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500 hover:bg-gray-200 transition">
                <i :class="showPass2 ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
              </button>
            </div>
          </div>

          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-1">
              Select Role
            </label>
            <div class="flex">
              <select name="" id="" v-model="registData.role"
                class="w-full border px-4 py-2 border-gray-300 rounded-lg text-gray-500">
                <option disabled value="">--SELECT ROLE--</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
            </div>
          </div>

          <button type="submit"
            class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 shadow-md transition transform hover:scale-[1.02]">
            Sign Up
          </button>
        </form>

        <p class="mt-6 text-sm text-center text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-blue-500 font-medium hover:underline">Login</router-link>
        </p>
        <p class="mt-1 text-sm text-center text-gray-600">
          Back to home?
          <router-link to="/" class="text-blue-500 font-medium hover:underline">home</router-link>
        </p>
      </div>
    </div>

    <div v-if="showSuccess" class="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center relative animate-fade-in">
        <img src="https://illustrations.popsy.co/blue/success.svg" alt="Success" class="mx-auto mb-4 w-32" />

        <h2 class="text-2xl font-bold text-gray-800 mb-2">Registration Successful</h2>
        <p class="text-gray-600 mb-6">Your account has been created. Please login to continue.</p>
        <button @click="goLogin"
          class="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 shadow-md transition">
          Go to Login
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
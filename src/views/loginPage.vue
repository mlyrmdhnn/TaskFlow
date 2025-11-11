<script setup>
import axios from 'axios'
import { ref } from 'vue'
import router from '@/router'

// State
const userLogin = ref({
  email: '',
  password: '',
})

const showPass = ref(false)
const showToggle = () => (showPass.value = !showPass.value)

// Modal state
const modal = ref({
  show: false,
  type: 'success', // success | error
  message: ''
})

const closeModal = () => {
  modal.value.show = false
}

const sendData = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  axios
    .post('/login', userLogin.value, {

    })
    .then((res) => {
      modal.value = {
        show: true,
        type: 'success',
        message: 'Loged in',
      }

      localStorage.setItem('token', res.data.token)

      localStorage.setItem('user', JSON.stringify(res.data.user))
      setTimeout(() => {
        closeModal()
        router.push('/main')
      }, 1500)
    })
    .catch((error) => {
      modal.value = {
        show: true,
        type: 'error',
        message: error.response.data.msg || 'Terjadi kesalahan koneksi',
      }
      if (error.response.status == 422) {
        modal.value = {
          show: true,
          type: 'error',
          message: 'Please input your email or password'
        }
      }
    })
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- LEFT: Illustration -->
    <div class="hidden lg:flex w-1/2 items-center justify-center bg-blue-50">
      <img
        src="https://static.vecteezy.com/system/resources/previews/006/405/794/non_2x/account-login-flat-illustration-vector.jpg"
        alt="Login Illustration" class="max-w-md" />
    </div>

    <!-- RIGHT: Login Form -->
    <div class="flex w-full lg:w-1/2 items-center justify-center p-8">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <!-- Title -->
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h1>
        <p class="text-center text-gray-500 mb-6">
          Sign in to continue to
          <span class="text-blue-500 font-semibold">TaskFlow</span>
        </p>

        <!-- Form -->
        <form @submit.prevent="sendData" class="space-y-5">
          <!-- Username -->
          <div>
            <label for="Email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="text" id="Email" v-model="userLogin.email" placeholder="email@example.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition" />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div class="flex">
              <input :type="showPass ? 'text' : 'password'" id="password" v-model="userLogin.password"
                placeholder="Enter your password"
                class="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition" />
              <button type="button" @click="showToggle"
                class="px-4 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500 hover:bg-gray-200 transition">
                <i :class="showPass ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
              </button>
            </div>
          </div>

          <!-- Button -->
          <button type="submit"
            class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 shadow-md transition transform hover:scale-[1.02]">
            Login
          </button>
        </form>

        <!-- Sign Up -->
        <p class="mt-6 text-sm text-center text-gray-600">
          Doesn't have an account?
          <router-link to="/regist" class="text-blue-500 font-medium hover:underline">Sign up</router-link>
        </p>
        <p class="mt-1 text-sm text-center text-gray-600">
          Back to home?
          <router-link to="/" class="text-blue-500 font-medium hover:underline">home</router-link>
        </p>
      </div>
    </div>

    <!-- MODAL -->
    <transition name="fade">
      <div v-if="modal.show" class="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        <div class="bg-white w-80 rounded-xl shadow-lg p-6 text-center animate-fade-in">
          <!-- Icon -->
          <div class="mb-4">
            <i v-if="modal.type === 'success'" class="fa-solid fa-circle-check text-green-500 text-5xl"></i>
            <i v-else class="fa-solid fa-circle-xmark text-red-500 text-5xl"></i>
          </div>
          <!-- Message -->
          <p class="text-gray-700 font-medium">{{ modal.message }}</p>
          <!-- Close Button -->
          <button @click="closeModal"
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            OK
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

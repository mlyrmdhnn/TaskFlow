<script setup>
import { Menu } from 'lucide-vue-next'
import { ref } from 'vue'

const showBar = ref(false)
</script>

<template>
  <header class="bg-[#2C2C3C] py-4 px-6 shadow-md sticky top-0 z-50">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <h1 class="text-2xl font-bold text-white hidden md:flex">TaskFlow</h1>

      <!-- Menu Icon (Mobile) -->
      <h1 class="text-2xl font-bold text-white md:hidden cursor-pointer" @click="showBar = !showBar">
        <Menu />
      </h1>

      <!-- Mobile Sidebar -->
      <transition enter-active-class="transition-all duration-500 ease-out"
        leave-active-class="transition-all duration-500 ease-in" enter-from-class="-translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100" leave-from-class="translate-x-0 opacity-100"
        leave-to-class="-translate-x-full opacity-0">
        <div v-if="showBar"
          class="fixed top-0 left-0 md:hidden w-3/4 h-full bg-[#2c2c2c] shadow-lg z-50 flex flex-col p-6 space-y-6">
          <!-- Close button -->
          <button class="self-end text-white text-2xl" @click="showBar = false">
            ✕
          </button>

          <!-- Links -->
          <ul class="space-y-4 text-left">
            <li>
              <router-link to="/" class="block text-neutral-300 hover:text-amber-500 transition">Home</router-link>
            </li>
            <li>
              <router-link to="/features"
                class="block text-neutral-300 hover:text-amber-500 transition">Features</router-link>
            </li>
            <li>
              <router-link to="/about"
                class="block text-neutral-300 hover:text-amber-500 transition">About</router-link>
            </li>
            <li>
              <router-link to="/contact"
                class="block text-neutral-300 hover:text-amber-500 transition">Contact</router-link>
            </li>
            <li>
              <router-link to="/faq" class="block text-neutral-300 hover:text-amber-500 transition">FAQ</router-link>
            </li>
          </ul>
        </div>
      </transition>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex space-x-8">
        <router-link to="/" class="text-neutral-300 hover:text-amber-500 transition">Home</router-link>
        <router-link to="/features" class="text-neutral-300 hover:text-amber-500 transition">Features</router-link>
        <router-link to="/about" class="text-neutral-300 hover:text-amber-500 transition">About</router-link>
        <router-link to="/contact" class="text-neutral-300 hover:text-amber-500 transition">Contact</router-link>
        <router-link to="/faq" class="text-neutral-300 hover:text-amber-500 transition">FAQ</router-link>
      </nav>

      <!-- Button -->
      <button class="bg-[#3c3c3c] hover:bg-[#3c3c4c] text-white px-5 py-2 rounded-xl shadow-md transition">
        <router-link to="/login">Get Started</router-link>
      </button>
    </div>
  </header>
</template>

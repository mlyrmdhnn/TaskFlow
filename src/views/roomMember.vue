<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useState } from '@/stores/state';
import navBar from '@/components/afterLogin/nav-bar.vue';

const state = useState();
const members = ref([]);
const manager = ref('')
const isLoading = ref(true)

onMounted(() => {
  watch(
    () => state.selectedId, (newVal) => {
      if (newVal) {
        axios.get(`/room/${newVal}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then(res => {
          console.log(res.data)
          members.value = res.data.data
          isLoading.value = false
          manager.value = res.data.manager
        })
      }
    }, { immediate: true })
})
// Pisahkan manager & employee

</script>

<template>
  <nav-bar />
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">

      <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
        <h2
          :class="['mb-4 text-4xl tracking-tight font-extrabold  dark:text-white', isLoading ? 'bg-neutral-300 rounded-full animate-pulse text-neutral-300 w-fit mx-auto' : 'text-gray-900']">
          Our Manager</h2>
        <p
          :class="['font-light sm:text-xl dark:text-gray-400', isLoading ? 'bg-neutral-300 text-neutral-300 rounded-full transform animate-pulse' : 'text-gray-500']">
          Streamline your workflow
          with
          real-time
          monitoring, smart task assignment, and powerful collaboration tools.</p>
      </div>

      <div class="text-center text-gray-500 dark:text-gray-400 mb-8">
        <img class="mx-auto mb-4 w-36 h-36 rounded-full border"
          :src="manager.image_path || '/TaskFlow/img/avatar/user.jpg'" alt="Avatar">
        <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <p :class="[isLoading ? 'bg-neutral-300 text-neutral-300 rounded-full w-20 mx-auto' : '']">{{ manager.name }}
          </p>
        </h3>
        <div>
          <p :class="[isLoading ? 'bg-neutral-300 text-neutral-300 rounded-full w-fit mx-auto' : '']">email = {{
            manager.email }}</p>
          <p :class="[isLoading ? 'bg-neutral-300 text-neutral-300 rounded-full w-fit mx-auto' : '']">phone = {{
            manager.phone }}</p>
          <p :class="[isLoading ? 'bg-neutral-300 text-neutral-300 rounded-full w-fit mx-auto' : '']">role = {{
            manager.role }}</p>
        </div>
      </div>


      <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
        <h2
          :class="['mb-4 text-4xl tracking-tight font-extrabold  dark:text-white', isLoading ? 'text-neutral-300 bg-neutral-300 rounded-full w-fit mx-auto' : 'text-gray-900']">
          Our member</h2>
        <p
          :class="['font-light  sm:text-xl dark:text-gray-400', isLoading ? 'bg-neutral-300 text-neutral-300 rounded-full w-fit mx-auto' : 'text-gray-500']">
          Stay connected, stay productive. Collaborate
          effortlessly, track progress, and complete tasks with clarity and confidence.</p>
      </div>
      <div class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="(d, i) in members" :key="i" class="text-center text-gray-500 dark:text-gray-400">
          <img class="mx-auto mb-4 w-36 h-36 rounded-full border"
            :src="d.user.image_path || '/TaskFlow/img/avatar/user.jpg'" alt="Avatar">
          <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <a href="#" :class="[isLoading ? 'bg-neutral-300 text-neutral-300 rounded-full w-fit mx-auto' : '']">{{
              d.user.name }}</a>
          </h3>
          <div>
            <p :class="[isLoading ? 'bg-neutral-300 text-neutral-300 rounded-full w-fit mx-auto' : '']">email = {{
              d.user.email }}</p>
            <p :class="[isLoading ? 'bg-neutral-300 text-neutral-300 rounded-full w-fit mx-auto' : '']">phone = {{
              d.user.phone }}</p>
            <p :class="[isLoading ? 'bg-neutral-300 text-neutral-300 rounded-full w-fit mx-auto' : '']">role = {{
              d.user.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

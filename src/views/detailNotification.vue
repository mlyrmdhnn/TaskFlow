<script setup>
import NavBar from '@/components/afterLogin/nav-bar.vue';
import { useState } from '@/stores/state';
import { onMounted, watch, ref } from 'vue';
import axios from 'axios';

const state = useState()
const idNotif = ref(0)
const hasil = ref([])
watch(
  () => state.selectedNotifId,
  (newVal) => {
    idNotif.value = newVal
  }, { immediate: true }
)
onMounted(() => {
  axios.get(`/notification/${idNotif.value}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    // console.log(res.data)
    hasil.value = res.data.data
  })
})

const doneTask = (id) => {
  axios.post(`/task/notification/done`, { id: id }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    console.log(res)
  })
}
</script>
<template>
  <NavBar />
  <!--
Install the "flowbite-typography" NPM package to apply styles and format the article content:

URL: https://flowbite.com/docs/components/typography/
-->

  <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
    <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
      <article
        class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <header class="mb-4 lg:mb-6 not-format">
          <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{{
            hasil.description }}</h1>
        </header>
        <p class="lead">{{ hasil.task_description }}</p>
        <div class="mt-4">
          <button @click="doneTask(hasil.id)"
            class="bg-green-500 rounded-lg text-white lead p-2 cursor-pointer hover:bg-green-600 active:bg-green-700 active:scale-95 transition duration-200">Completed!</button>
        </div>
      </article>
    </div>
  </main>
</template>
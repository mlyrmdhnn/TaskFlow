<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import axios from 'axios';
import router from '@/router';
import { ref } from 'vue';
import { useState } from '@/stores/state';
import { House } from 'lucide-vue-next';
import NavBeforeInRoom from '@/components/afterLogin/navBeforeInRoom.vue';

const state = useState();


const hasil = ref([])
const user = JSON.parse(localStorage.getItem('user'))
console.log(user)


const fetchingData = () => {
  if (user.role == 'manager') {
    axios.get('/manager/all-room', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log(res.data.data)
        hasil.value = res.data.data
      })
  } else {

    axios.get('/employe/all-room', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log(res.data)
        hasil.value = res.data.data
      })
  }
}

fetchingData()

const idRoom = ref(null)
const idSelect = (id) => {
  if (localStorage.getItem('selectedRoomId')) {
    localStorage.removeItem('selectedRoomId')
  }
  idRoom.value = id
  state.setRoomId(id)
  router.push('/room')
}

const msg = ref('')
const colour = ref('')
const room_name = ref('');
const createRoom = () => {

  axios.post('/manager/create-room', { room_name: room_name.value }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(() => {
    msg.value = 'Success create room'
    colour.value = 'text-green-500'
    fetchingData()
    setTimeout(() => {
      msg.value = ''
    }, 2000);

  })
}

const invite_link = ref('')

const joinRoom = () => {
  axios.post('/join/invite', { code: invite_link.value },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  ).then(res => {
    msg.value = 'Succes joining room'
    colour.value = 'text-green-500'
    fetchingData()
    console.log(res.data)
    setTimeout(() => {
      msg.value = ''
    }, 2000);
  })
}

const isShow = ref(false)
const isConfirm = ref(false)
const deletedIdRoom = ref('')
const deletedRoomName = ref(0)


const setDeletedRoom = (id, name) => {
  deletedIdRoom.value = id
  deletedRoomName.value = name
  setTimeout(() => {
    showConfirm()
  }, 100);
}

const showConfirm = () => {
  isConfirm.value = !isConfirm.value
}
const showModalDelete = () => {
  isShow.value = !isShow.value
}

const deleteRoom = () => {
  axios.delete(`/room/${deletedIdRoom.value}/delete`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(() => {
    msg.value = 'Succes delete room'
    colour.value = 'text-green-500'
    showConfirm()
    fetchingData()
    setTimeout(() => {
      msg.value = ''
    }, 2000)

  })
}


</script>
<template>
  <NavBeforeInRoom />


  <div tabindex="-1" aria-hidden="true" class="p-5 md:p-0"
    :class="[isShow ? 'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[9999] w-full inset-0 h-full flex items-center justify-center bg-black/70' : 'hidden']">
    <div class="relative p-4 w-full max-w-md">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Delete Room
          </h3>
          <h3 :class="colour">{{ msg }}</h3>
          <button type="button" @click="showModalDelete"
            class="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600">
            ✕
          </button>
        </div>
        <div class="p-4 h-70 overflow-y-auto">

          <div v-for="(r, i) in hasil" :key="i"
            class="mt-2 mb-2 flex items-center justify-between pb-2 border-b-2 border-gray-500">
            <p class=" text-gray-500 dark:text-gray-300">
              {{ r.room_name }}
            </p>
            <button @click="setDeletedRoom(r.room_id, r.room_name)"
              class="bg-red-500 text-white rounded px-2 cursor-pointer">Delete</button>
          </div>
        </div>
        <div class="flex justify-end gap-2 p-4 border-t dark:border-gray-600">
          <button @click="showModalDelete" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button @click="deleteRoom" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <div tabindex="-1" aria-hidden="true"
    :class="[isConfirm ? 'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[9999] w-full inset-0 h-full flex items-center justify-center bg-black/70' : 'hidden']">
    <div class="relative p-4 w-full max-w-md">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Delete Room
          </h3>
          <button type="button" @click="showConfirm"
            class="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600">
            ✕
          </button>
        </div>
        <div class="p-4">
          <p class="text-sm text-gray-500 dark:text-gray-300">
            Are you sure want to delete <span class="text-red-500 underline">{{ deletedRoomName }}</span> room?
          </p>
        </div>
        <div class="flex justify-end gap-2 p-4 border-t dark:border-gray-600">
          <button @click="showConfirm" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button @click="deleteRoom" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>


  <div class="p-4">
    <div v-if="user.role == 'manager'" class="">

      <!-- Start block -->
      <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div class="w-full md:w-1/2">
                <form @submit.prevent="createRoom" class="flex items-center">
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">

                    </div>

                    <input type="text" id="simple-search" v-model="room_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Create Room" required="">
                  </div>
                </form>
                <div :class="['mt-2 ', colour]">{{ msg }}</div>
              </div>
              <div
                class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button type="button"
                  class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                  <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clip-rule="evenodd" fill-rule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                  Create Room
                </button>
                <button @click="showModalDelete"
                  class="bg-red-500 cursor-pointer rounded p-1.5 px-2 hover:bg-red-600 active:bg-red-700 active:scale-95 transition duration-200 text-white">Delete
                  Room</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
    <div v-if="user.role == 'employee'" class="">
      <!-- Start block -->
      <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
          <!-- Start coding here -->

          <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div class="w-full md:w-1/2">
                <form @submit.prevent="joinRoom" class="flex items-center">
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    </div>
                    <input type="text" id="simple-search" v-model="invite_link"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Join Room" required="">
                  </div>
                </form>
                <div :class="['mt-2 ', colour]">{{ msg }}</div>
              </div>
              <div
                class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button type="button"
                  class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                  <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clip-rule="evenodd" fill-rule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                  Join Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
    <div class=" mx-auto max-w-screen-xl px-4 lg:px-12">
      <div class="w-full md:w1/2 rounded shadow-lg bg-gray-50 space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div v-for="(d, i) in hasil" :key="i"
            class="bg-neutral-200 rounded hover:bg-neutral-300 transition duration-200 hover:scale-105">
            <div @click="idSelect(d.room_id)"
              class="text-zinc-700 cursor-pointer min-h-20 flex items-center justify-between p-3">
              <h1 class="text-2xl">{{ d.room_name }}</h1>
              <h1>
                <House />
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
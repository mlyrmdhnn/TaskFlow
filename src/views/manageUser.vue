<script setup>
import navBar from '@/components/afterLogin/nav-bar.vue';
import { watch, ref } from 'vue';
import axios from 'axios';
import { useState } from '@/stores/state';
import { initFlowbite } from 'flowbite';
import { nextTick } from 'vue';

const state = useState()
const userInRoom = ref([])
const roomId = ref(0)



watch(
  () => state.selectedId,
  async (newVal) => {
    roomId.value = newVal

    if (newVal) {
      const res = await axios.get(`/room/${newVal}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      userInRoom.value = res.data.data

      await nextTick()
      initFlowbite()
    }
  },
  { immediate: true }
)


const isOpenTask = ref(false)
const isOpenUser = ref(false)


const showModalTask = () => {
  isOpenTask.value = !isOpenTask.value
}
const showModalUser = () => {
  isOpenUser.value = !isOpenUser.value
}


const selectedUserId = ref(null)
const setUserIdTask = (id) => {
  selectedUserId.value = id
  showModalTask()
}

const setUserIdUser = (id) => {
  selectedUserId.value = id
  showModalUser()
}

const titleTask = ref('')
const taskDescription = ref('')
const msg = ref('')
const assignTask = () => {
  axios.post('/tasks', { task_name: titleTask.value, task_status: 'pending', user_id: selectedUserId.value, room_id: roomId.value, task_description: taskDescription.value }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(() => {
    showModalTask()
    titleTask.value = ''
    taskDescription.value = ''
    msg.value = 'Added new task'
    setTimeout(() => {
      msg.value = ''
    }, 3000)

  }).catch(() => {
    showModalTask()
  })
}

const deleteUser = () => {
  axios.post('/user/delete', { id: selectedUserId.value, room_id: roomId.value }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(() => {
    showModalUser()
  })
}

</script>
<template>
  <navBar />
  <!-- Start block -->
  <!-- {{ userInRoom }} -->
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <!-- Start coding here -->
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div class="w-full md:w-1/2">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                    viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd" />
                  </svg>

                </div>
                <input type="text" id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search" required="">
              </div>
            </form>

          </div>
          <h1 class="text-green-500">{{ msg }}</h1>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-4">#</th>
                <th scope="col" class="px-4 py-3">Name</th>
                <th scope="col" class="px-4 py-3">Email</th>
                <th scope="col" class="px-4 py-3">Phone</th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-gray-700" v-for="(u, i) in userInRoom" :key="i">
                <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ i + 1
                }}
                </th>
                <td class="px-4 py-3">{{ u.user.name }}</td>
                <td class="px-4 py-3">{{ u.user.email }}</td>
                <td class="px-4 py-3 max-w-[12rem] truncate">{{ u.user.phone }}</td>
                <td class="px-4 py-3 flex items-center justify-end">
                  <div class="bg-red-00 gap-2 flex">
                    <button class="bg-red-500 cursor-pointer text-white p-1 rounded"
                      @click="setUserIdUser(u.user.id)">Delete</button>
                    <button class="bg-green-500 cursor-pointer text-white p-1 rounded"
                      @click="setUserIdTask(u.user.id)">Assign
                      Task</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation">
        </nav>
      </div>
    </div>
  </section>

  <!-- Delete User Modal -->
  <div tabindex="-1" aria-hidden="true"
    :class="[isOpenUser ? 'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[9999] w-full inset-0 h-full flex items-center justify-center bg-black opacity-90' : 'hidden']">
    <div class="relative p-4 w-full max-w-md">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Delete User
          </h3>
          <button type="button" @click="showModalUser"
            class="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600">
            ✕
          </button>
        </div>
        <div class="p-4">
          <p class="text-sm text-gray-500 dark:text-gray-300">
            Are you sure want to delete this user?
          </p>
        </div>
        <div class="flex justify-end gap-2 p-4 border-t dark:border-gray-600">
          <button @click="showModalUser" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" @click="deleteUser">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>



  <!-- Assign Task Modal -->
  <div tabindex="-1" aria-hidden="true"
    :class="[isOpenTask ? 'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[9999] w-full inset-0 h-full flex items-center justify-center bg-black opacity-90' : 'hidden']">
    <div class="relative p-4 w-full max-w-md">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-center justify-between p-4 border-b dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Assign Task
          </h3>
          <button type="button" @click="showModalTask"
            class="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600">
            ✕
          </button>
        </div>
        <div class="p-4 space-y-3">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Task {{ titleTask.length }}/50
          </label>
          <input type="text" maxlength="50" placeholder="Task Tittle" v-model="titleTask"
            class="w-full p-2 border rounded dark:bg-gray-600 dark:text-white">
        </div>
        <div class="p-4 space-y-3">

          <label class="text-sm font-medium text-gray-700 dark:text-gray-300" for="">
            Description {{ taskDescription.length }}/1000
          </label>

          <!-- < type="text"> -->
          <textarea v-model="taskDescription" maxlength="1000" id="" class="w-full p-2 border rounded"></textarea>
        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-2 p-4 border-t dark:border-gray-600">
          <button @click="showModalTask" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" @click="assignTask">
            Assign
          </button>
        </div>

      </div>
    </div>
  </div>


</template>
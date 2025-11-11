<script setup>
import NavBar from '@/components/afterLogin/nav-bar.vue';
import axios from 'axios';
import { onMounted, ref, watch, onBeforeMount } from 'vue';
import { useState } from '@/stores/state';
import { Check } from 'lucide-vue-next';
import loading from '@/components/loading.vue';
import router from '@/router';


const user = JSON.parse(localStorage.getItem('user'))
const state = useState()
const notif = ref([])
const task = ref([])
const isLoading = ref(true)
const page = ref('1')

if (user.role == 'manager') {
  router.push('/main')
}


const pageOne = () => {
  page.value = '1'
}

const pageTwo = () => {
  page.value = '2'
}



const getData = () => {
  watch(
    () => state.selectedId, (newVal) => {
      axios.get(`/notification/${newVal}/task`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(res => {
        isLoading.value = false
        console.log(res.data.data)
        task.value = res.data.data[0].task
        notif.value = res.data.data[0].notification
      })
    }, { immediate: true }
  )
}

onMounted(() => {
  getData()
})

const isShowModal = ref(false)

const showModal = () => {
  isShowModal.value = !isShowModal.value
}

const idTask = ref(0)

const setDoneTask = (id) => {
  idTask.value = id
  showModal()
}

const doneTask = () => {
  axios.post('/task/status', { id: idTask.value }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    console.log(res.data)
    // alert('data sudah di selesaikan')
    showModal()
    getData()
  }).catch(() => {
    // alert('error')
  })
}

const notifId = (id) => {
  if (localStorage.getItem('notifID')) {
    localStorage.removeItem('notifID')
  }
  state.setNotifId(id)
  router.push('/notification/detail')
}

</script>

<template>
  <NavBar />

  <div class="p-4 md:p-8 bg-gray-100 min-h-screen">
    <!-- TAB SWITCH -->
    <div class="flex justify-center mb-8">
      <div class="bg-white shadow-lg rounded-full px-2 py-1 flex gap-2 border border-gray-200">
        <button @click="pageTwo" :class="[
          'px-6 py-2 rounded-full font-medium transition-all duration-300',
          page === '2'
            ? 'bg-yellow-500 text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-100'
        ]">
          Notifications
        </button>

        <button @click="pageOne" :class="[
          'px-6 py-2 rounded-full font-medium transition-all duration-300',
          page === '1'
            ? 'bg-blue-500 text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-100'
        ]">
          Your Tasks
        </button>
      </div>
    </div>

    <!-- CONTENT WRAPPER -->
    <section class="bg-white p-6 rounded-xl shadow-lg border border-gray-200">

      <!-- TASK PAGE -->
      <div v-if="page == '1'" class="mt-4">
        <div v-if="isLoading" class="grid place-items-center h-40">
          <loading />
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full border-collapse text-sm">
            <thead class="bg-gray-50 text-gray-600 uppercase text-xs border-b">
              <tr>
                <th class="py-3 px-4 text-left">#</th>
                <th class="py-3 px-4 text-left">Status</th>
                <th class="py-3 px-4 text-left">Task Name</th>
                <th v-if="user.role == 'employee'" class="py-3 px-4 text-left">Action</th>
                <th class="py-3 px-4 text-left">To</th>
                <th class="py-3 px-4 text-left">Created</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(d, i) in task" :key="d.id" class="border-b hover:bg-gray-50 transition">
                <td class="py-3 px-4 font-semibold">{{ i + 1 }}</td>

                <td class="py-3 px-4">
                  <span :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold',
                    d.status === 'pending'
                      ? 'bg-yellow-200 text-yellow-700'
                      : 'bg-green-200 text-green-700'
                  ]">
                    {{ d.status }}
                  </span>
                </td>

                <td class="py-3 px-4 break-words max-w-[300px]">
                  {{ d.task_name }}
                </td>

                <td v-if="user.role == 'employee'" class="py-3 px-4">
                  <button v-if="d.status !== 'done'" @click="setDoneTask(d.id)"
                    class="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition active:scale-95 shadow">
                    <Check />
                  </button>

                  <Check v-else class="text-green-600" />
                </td>

                <td class="py-3 px-4">{{ d.to_username ?? '—' }}</td>
                <td class="py-3 px-4">{{ d.created_at ?? '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- NOTIFICATION PAGE -->
      <div v-if="page == '2'" class="mt-6">
        <div v-if="isLoading" class="grid place-items-center h-40">
          <loading />
        </div>

        <div v-else>
          <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <div v-for="(n, i) in notif" :key="i"
              class="p-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <h1 class="text-yellow-700 font-semibold text-lg mb-4 leading-relaxed">
                {{ n.description }}
              </h1>

              <div class="flex justify-end">
                <button @click="notifId(n.id)"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 active:scale-95 transition">
                  See Detail
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>



  <!-- modal -->

  <div tabindex="-1" aria-hidden="true"
    :class="[isShowModal ? 'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[9999] w-full inset-0 h-full flex items-center justify-center bg-black opacity-90' : 'hidden']">
    <div class="relative p-4 w-full max-w-md">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Completed Task
          </h3>
          <button @click="showModal" type="button"
            class="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600">
            ✕
          </button>
        </div>
        <div class="p-4">
          <p class="text-sm text-gray-500 dark:text-gray-300">
            Are you sure want to ompleted the task?
          </p>
        </div>
        <div class="flex justify-end gap-2 p-4 border-t dark:border-gray-600">
          <button @click="showModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button @click="doneTask" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
            Completed
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

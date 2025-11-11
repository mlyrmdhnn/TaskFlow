<script setup>
import { useState } from '@/stores/state'
import { Bell, ListCheck } from 'lucide-vue-next';
import { NotepadText } from 'lucide-vue-next';
import { Clock } from 'lucide-vue-next';
import { TableProperties } from 'lucide-vue-next';
import { ref, watch, onMounted } from 'vue'
import router from '@/router'
import axios from 'axios'
import graphTask from '@/components/graphTask.vue';
import navBar from '@/components/afterLogin/nav-bar.vue';
import loading from '@/components/loading.vue';
import { UsersRound } from 'lucide-vue-next';



const state = useState()
const hasil = ref([])

const done = ref([])
const pending = ref([])
const user = JSON.parse(localStorage.getItem('user'))
const page = ref(1)
const roomId = ref(0)

const isLoading = ref(true)


onMounted(() => {

  watch(() => state.selectedId, (newVal) => {
    roomId.value = newVal
    if (newVal) {
      axios.get(`/detail-room/${newVal}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(res => {
        hasil.value = res.data
        done.value = res.data.done
        pending.value = res.data.pending
        isLoading.value = false
      })
    }
  }, { immediate: true })
})









const newRoomMember = ref([])

watch(
  () => state.roomMember,
  (newVal) => {
    newRoomMember.value = newVal
  },
  { immediate: true }
)






const notifPage = () => {
  router.push('/user/notification')
}

const manageUser = () => {
  router.push('/user/manage')
}


function formatDateTime(date) {
  const d = new Date(date);

  const tanggal = d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const jam = d.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return `${tanggal} - ${jam}`;
}

const deleteDoneTask = () => {
  axios.post('/tasks/delete', { room_id: roomId.value }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}


</script>
<template>
  <!-- header -->
  <nav-bar />
  <!-- {{ hasil }} -->


  <!-- disini utama -->

  <div class="bg-neutral-300">

    <section class="lg:grid grid-cols-11 gap-3">
      <div class=" w-full col-span-8 px-3 py-3">
        <div class="w-full ">
          <header>
            <section class="md:grid md:grid-cols-4 gap-4 grid grid-cols-2  p-2">
              <div @click="page = 1"
                class="bg-neutral-100 w-full h-20 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-400 cursor-pointer transition duration-200">
                <div class="bg-blue-500 h-10 w-10 hidden md:flex justify-center items-center rounded-full text-white">
                  <h1>
                    <NotepadText />
                  </h1>
                </div>
                <h1 class=" text-2xl md:text-2xl font-bold ">All Tasks</h1>
              </div>
              <div @click="page = 2"
                class="bg-neutral-100 w-full h-20 rounded-lg flex justify-center items-center gap-2 hover:bg-cyan-400 cursor-pointer transition duration-200">
                <div class="w-10 h-10 hidden md:flex justify-center items-center text-white bg-cyan-500 rounded-full">
                  <h1>
                    <ListCheck />
                  </h1>
                </div>
                <h1 class=" text-2xl md:text-2xl font-bold">Completed</h1>
              </div>
              <div @click="page = 3"
                class="bg-neutral-100 w-full h-20 rounded-lg flex justify-center items-center gap-2 hover:bg-red-400 cursor-pointer transition duration-200">
                <div class="bg-red-500 w-10 h-10 hidden md:flex justify-center items-center rounded-full text-white">
                  <h1>
                    <Clock />
                  </h1>
                </div>
                <h1 class=" text-2xl md:text-2xl font-bold">Pending</h1>
              </div>
              <div v-if="user.role == 'employee'" @click="notifPage"
                class="bg-neutral-100 cursor-pointer hover:bg-yellow-200 transition duration-300 w-full h-20 rounded-lg flex justify-center items-center gap-2">
                <div class="text-white rounded-full h-10 w-10 bg-yellow-500 hidden md:flex justify-center items-center">
                  <h1>
                    <Bell />
                  </h1>
                </div>
                <h1 class=" text-2xl md:text-2xl font-bold">notification</h1>
              </div>
              <div v-if="user.role == 'manager'" @click="manageUser"
                class="bg-neutral-100 cursor-pointer hover:bg-zinc-400 transition duration-300 w-full h-20 rounded-lg flex justify-center items-center gap-2">
                <div class="text-white rounded-full h-10 w-10 bg-zinc-500 hidden md:flex justify-center items-center">
                  <h1>
                    <!-- <Bell /> -->
                    <UsersRound />
                  </h1>
                </div>
                <h1 class=" text-2xl md:text-2xl font-bold">Manage User</h1>
              </div>
            </section>
          </header>
          <div class=" mb-2 mt-2 p-2">
            <div class="bg-neutral-100 p-2 flex gap-2">
              <span class="text-green-400">
                <TableProperties />
              </span>
              <span class="font-bold">Task Table</span>
            </div>
          </div>
          <div class="h-110 p-2">
            <div class="bg-neutral-100 h-full p-2 rounded">
              <div class="w-full h-full overflow-y-auto overflow-x-auto p-3">
                <div class="w-full h-full" v-if="isLoading">
                  <loading />
                </div>

                <template v-if="page == 1">
                  <table class="w-full table-auto border-separate border-spacing-y-2" v-if="!isLoading">
                    <thead>
                      <tr class="border-b border-neutral-300 uppercase text-xs tracking-wide">
                        <th class="text-left py-3 px-3">#</th>
                        <th class="text-left py-3 px-3">Status</th>
                        <th class="text-left py-3 px-3">Name</th>
                        <th v-if="user.role == 'employee'" class="text-left py-3 px-3">Action</th>
                        <th class="text-left py-3 px-3">To</th>
                        <th class="text-left py-3 px-3">Created</th>
                      </tr>
                    </thead>

                    <tbody>

                      <template v-for="(d, i) in hasil.data" :key="i">
                        <!-- ROW UTAMA -->
                        <tr class="bg-white border-b border-neutral-300">
                          <td class="py-3 px-3 font-semibold">{{ i + 1 }}</td>
                          <td class="py-3 px-3 font-semibold">------</td>
                          <td class="py-3 px-3 font-semibold">------</td>
                          <td class="py-3 px-3 font-semibold">------</td>
                          <td class="py-3 px-3 font-semibold">------</td>
                        </tr>

                        <!-- ROW TASK PER SATU ITEM -->
                        <tr v-for="(task, ti) in d.tasks" :key="ti" class="bg-gray-50 border-b border-neutral-200">
                          <td class="py-2 px-3">''</td>

                          <td class="py-2 px-3">
                            {{ task.status }}
                          </td>

                          <td class="py-2 px-3 break-words">
                            {{ task.task_name }}
                          </td>

                          <td>{{ d.user.name }}</td>

                          <td>{{ formatDateTime(task.created_at) }}</td>



                          <td v-if="user.role == 'employee'" class="py-2 px-3">
                            <div v-if="task.status === 'pending' && task.user_id === user.id">
                              <!-- <span @click="doneTask(task.id)" class="cursor-pointer">
                              <Check />
                            </span> -->
                              -
                            </div>
                            <div v-else>—</div>
                          </td>

                          <td class="py-2 px-3"></td>
                          <td class="py-2 px-3"></td>
                        </tr>

                      </template>

                    </tbody>
                  </table>
                </template>
                <template v-if="page == 3">
                  <table class="w-full table-auto border-separate border-spacing-y-2" v-if="!isLoading">
                    <thead>
                      <tr class="border-b border-neutral-300 uppercase text-xs tracking-wide">
                        <th class="text-left py-3 px-3">#</th>
                        <th class="text-left py-3 px-3">Status</th>
                        <th class="text-left py-3 px-3">Name</th>
                        <th v-if="user.role == 'employee'" class="text-left py-3 px-3">Action</th>
                        <th class="text-left py-3 px-3">To</th>
                        <th class="text-left py-3 px-3">Created</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="(task, i) in pending" :key="i" class="bg-white border-b border-neutral-300">
                        <td class="py-3 px-3 font-semibold">{{ i + 1 }}</td>
                        <td class="py-3 px-3">{{ task.status }}</td>
                        <td class="py-3 px-3">{{ task.task_name }}</td>
                        <td v-if="user.role == 'employee'" class="py-3 px-3">-</td>
                        <td class="py-3 px-3">{{ task.user.name }}</td>
                        <td class="py-3 px-3">{{ formatDateTime(task.created_at) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </template>
                <template v-if="page == 2">
                  <!-- <h1></h1> -->
                  <div v-if="user.role == 'manager'"><button @click="deleteDoneTask"
                      class="text-white bg-red-500 hover:bg-red-600 active:bg-red-700 active:scale-95 transition duration-200 p-2 roundeed cursor-pointer rounded">Delete
                      all task</button></div>
                  <table class="w-full table-auto border-separate border-spacing-y-2" v-if="!isLoading">
                    <thead>
                      <tr class="border-b border-neutral-300 uppercase text-xs tracking-wide">
                        <th class="text-left py-3 px-3">#</th>
                        <th class="text-left py-3 px-3">Status</th>
                        <th class="text-left py-3 px-3">Name</th>
                        <th v-if="user.role == 'employee'" class="text-left py-3 px-3">Action</th>
                        <th class="text-left py-3 px-3">To</th>
                        <th class="text-left py-3 px-3">Created</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="(task, i) in done" :key="i" class="bg-white border-b border-neutral-300">
                        <td class="py-3 px-3 font-semibold">{{ i + 1 }}</td>
                        <td class="py-3 px-3">{{ task.status }}</td>
                        <td class="py-3 px-3">{{ task.task_name }}</td>
                        <td v-if="user.role == 'employee'" class="py-3 px-3">-</td>
                        <td class="py-3 px-3">{{ task.user.name }}</td>
                        <td class="py-3 px-3">{{ formatDateTime(task.created_at) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </template>

              </div>




            </div>
          </div>

        </div>
      </div>
      <div class="md:mt-3 w-full col-span-3 px-5 md:px-2 py-2">
        <div class="bg-neutral-100 rounded-lg h-144">
          <div class="w-full h-full" v-if="isLoading">
            <loading />
          </div>
          <div v-else>
            <header class="p-2">Task Statistics</header>
            <graphTask />
          </div>
        </div>
      </div>

    </section>
  </div>

</template>

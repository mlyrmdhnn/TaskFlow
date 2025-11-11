<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { Menu } from 'lucide-vue-next';
import { useState } from '@/stores/state';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute()
const state = useState()
const user = ref([])
const isOpen = ref(false)
const isOpenStatus = ref(false)
const code = ref('')

const proffile = () => {
  router.push('/proffile')
}

watch(() => route.fullPath, () => {
  isOpen.value = !isOpen.value
})

const inviteLink = () => {
  axios.post('/invite', { roomId: state.selectedId }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    code.value = res.data.invite_link
  })
}


const logout = () => {
  axios.post('/logout', {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  })
}

console.log('ini dari componen loh ' + route.fullPath)

onMounted(() => {
  axios.get('/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    user.value = res.data.user
  })
})

const showStatus = () => {
  isOpenStatus.value = !isOpenStatus.value
}

const showBar = () => {
  isOpen.value = !isOpen.value
}

const userManage = () => {
  router.push('/user/manage')
}

</script>

<template>
  <div class="relative">
    <div class="bg-[#2c2c3c] h-20 flex justify-between px-6 items-center">
      <h1 class="text-2xl font-bold text-white hidden md:flex">TaskFlow</h1>
      <h1 class="text-white md:hidden" @click="showBar">
        <Menu />
      </h1>
      <div class="flex justify-center md:mr-5 gap-4">
        <div class="text-white hidden md:flex justify-center items-center">
        </div>
        <div class="text-center">
          <span class="text-neutral-100 text-sm">{{ user.name }}</span>
          <h1 class="text-neutral-400 text-sm">{{ user.role }}</h1>
        </div>
        <div @click="proffile"
          class="bg-white cursor-pointer rounded-full w-10 h-10 border-2 border-gray-600 overflow-hidden">
          <img :src="[user.image_path] || 'img/avatar/user.jpg'" alt="" class="w-full h-full object-cover">
        </div>
        <div class="justify-center items-center flex">
          <p @click="showStatus"><i
              :class="['arrow mb-[3px] transform duration-300', isOpenStatus ? 'rotate-225' : 'rotate-45']"></i></p>
        </div>
      </div>
    </div>
  </div>
  <div :class="['absolute right-0 z-1 overflow-hidden rounded-bl-lg p-2 bg-neutral-200', isOpenStatus ? '' : 'hidden']">
    <div class="w-50 bg-white rounded-lg">
      <h1 @click="logout" class="bg-red-500 text-white cursor-pointer rounded-lg p-2 hover:bg-red-700">Logout</h1>
      <div v-if="user.role == 'manager'">
        <h1 @click="inviteLink" class="bg-blue-500 text-white cursor-pointer rounded-lg p-2 mt-2 hover:bg-blue-600">
          Generate Code</h1>
        <h1 @click="userManage" class="bg-yellow-500 text-white rounded-lg p-2 mt-2 hover:bg-yellow-600 cursor-pointer">
          Assign task</h1>
        <h1 @click="userManage" class="bg-zinc-500 text-white rounded-lg p-2 mt-2 hover:bg-zinc-600 cursor-pointer">
          Manage User</h1>
        <div class="px-2">
          <h1 v-if="code != ''" class="text-green-500 font-light mt-2">Code : {{ code }} </h1>
        </div>
      </div>
    </div>
  </div>

  <div :class="['h-full absolute', isOpen ? '' : 'hidden']">
    <div class=" w-56 bg-white shadow-lg border-r flex flex-col p-4">
      <ul class="space-y-3">
        <li>
          <router-link to="/proffile"
            class="block px-3 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 font-medium"
            active-class="bg-amber-200 text-amber-800">
            Proffile
          </router-link>
        </li>

        <li v-if="user.role == 'employee'">
          <router-link to="/user/notification"
            class="block px-3 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 font-medium"
            active-class="bg-amber-200 text-amber-800">
            Notifications
          </router-link>
        </li>

        <li v-else>
          <router-link to="/user/manage"
            class="block px-3 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 font-medium"
            active-class="bg-amber-200 text-amber-800">
            Manage User
          </router-link>
        </li>

        <li>
          <router-link to="/room-member"
            class="block px-3 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 font-medium"
            active-class="bg-amber-200 text-amber-800">
            Member
          </router-link>
        </li>

        <li>
          <router-link to="/room" class="block px-3 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 font-medium"
            active-class="bg-amber-200 text-amber-800">
            Room
          </router-link>
        </li>
        <li>
          <router-link to="/for-me"
            class="block px-3 py-2 rounded-lg hover:bg-amber-100 hover:text-amber-700 font-medium"
            active-class="bg-amber-200 text-amber-800">
            Home
          </router-link>
        </li>
      </ul>
    </div>
  </div>

  <div class="p-2 hidden md:block">
    <div class="flex justify-center items-center gap-5 px-6 py-2 mt-2 mb-2 md:mb-1 md:mt-0 bg-neutral-100">
      <span
        :class="['text-black hover:bg-zinc-600 transform duration-300 hover:text-white rounded-lg p-2', route.fullPath == '/proffile' ? 'text-white bg-zinc-600' : '']"><router-link
          to="/proffile">Proffile</router-link></span>
      <span v-if="user.role == 'employee'"
        :class="['text-black cursor-pointer hover:bg-zinc-600 transform duration-300 hover:text-white rounded-lg p-2', route.fullPath == '/user/notification' ? 'text-white bg-zinc-600' : '']"><router-link
          to="/user/notification">Notifications</router-link></span>

      <span v-else
        :class="['text-black cursor-pointer hover:bg-zinc-600 transform duration-300 hover:text-white rounded-lg p-2', route.fullPath == '/user/manage' ? 'text-white bg-zinc-600' : '']"><router-link
          to="/user/manage">Manage User</router-link></span>
      <span
        :class="['text-black hover:bg-zinc-600 transform duration-300 hover:text-white rounded-lg p-2', route.fullPath == '/room-member' ? 'text-white bg-zinc-600' : '']"><router-link
          to="/room-member">Member</router-link></span>

      <span :class="['text-black hover:bg-zinc-600 transform duration-300 hover:text-white rounded-lg p-2', route.fullPath ==
        '/room' ? 'text-white bg-zinc-600' : '']"><router-link to="/room">Room</router-link></span>
      <span class="text-black hover:bg-zinc-600 transform duration-300 hover:text-white rounded-lg p-2"><router-link
          to="/main">Home</router-link></span>
    </div>
  </div>

</template>
<style scoped>
.arrow {
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}


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
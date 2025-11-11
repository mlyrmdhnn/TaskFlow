<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { Menu } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute()
const user = ref([])
const isOpen = ref(false)
const isOpenStatus = ref(false)

const proffile = () => {
  router.push('/user/proffile')
}

watch(() => route.fullPath, () => {
  isOpen.value = !isOpen.value
})



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
          <img :src="[user.image_path] || '/img/avatar/user.jpg'" alt="" class="w-full h-full object-cover">
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
      </ul>
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
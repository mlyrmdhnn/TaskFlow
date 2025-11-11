<script setup>
import { ref, onMounted } from 'vue';
import navBeforeInRoom from '@/components/afterLogin/navBeforeInRoom.vue';
import axios from 'axios';




const errorMsg = ref('')
const successMsg = ref('')
const succesProffileMsg = ref('')

const showModal = ref(false);
const modalTogle = () => {
  showModal.value = !showModal.value;
};

const avatar = ref('')
const avaImg = ref([
  { image: 'img/avatar/cewe1.png', active: false },
  { image: 'img/avatar/cewe2.png', active: false },
  { image: 'img/avatar/cewe3.png', active: false },
  { image: 'img/avatar/cowo1.png', active: false },
  { image: 'img/avatar/cowo2.png', active: false },
  { image: 'img/avatar/cowo3.png', active: false },
]);

const selectedImg = ref(null);

const selectedAva = (index) => {
  selectedImg.value = avaImg.value[index];
};

const selectAvatar = (index) => {
  selectedAva(index);
  avaImg.value.forEach((a, i) => {
    a.active = i === index;
  });
  avatar.value = avaImg.value[index].image
};

const succes = ref(false)


// struktur user_info
const user_info = ref({
  role: '',
  fullName: '',
  email: '',
  phone: '',
});

// ambil data user saat component mount
onMounted(() => {
  axios.get('/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    user_info.value.role = res.data.user.role
    user_info.value.fullName = res.data.user.name
    user_info.value.email = res.data.user.email
    user_info.value.phone = res.data.user.phone
    avatar.value = res.data.user.image_path
    // successMsg.value = 'Success'

  })
});

// kirim perubahan ke backend
const saveChange = () => {
  axios.put('/proffile', {
    role: user_info.value.role,
    name: user_info.value.fullName,
    email: user_info.value.email,
    phone: user_info.value.phone,
    image: avatar.value
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    succesProffileMsg.value = 'Success'
  })

};

const slide1 = ref(false)
const showPass = ref(false)
const showToggle = () => showPass.value = !showPass.value
const showPass2 = ref(false)
const showToggle2 = () => showPass2.value = !showPass2.value
const showPass3 = ref(false)
const showToggle3 = () => showPass3.value = !showPass3.value

const resetPass = ref({
  oldPass: '',
  newPass: ''
})
const newPassConfirm = ref('')

const showDeleteRoomModal = ref(false)
const headerMsg = ref('')
const msg = ref('')

const updatePass = () => {
  if (newPassConfirm.value != resetPass.value.newPass) {
    errorMsg.value = 'Confirm password and new password must be same charracter'
    return
  }
  axios.put('/password/reset', { oldPass: resetPass.value.oldPass, newPass: resetPass.value.newPass }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    // errorMsg.value = 'Success'
    successMsg.value = 'Success'
  }).catch((e) => {
    errorMsg.value = e.response.data.msg
  })
}

</script>



<template>
  <!-- <div class="w-50 h-50"><img src="/img/avatar/cewe1.png" alt=""></div> -->
  <div v-if="showDeleteRoomModal"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] px-4">
    <div v-if="showDeleteRoomModal" class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ headerMsg }}</h2>
      <p class="text-gray-600 mb-6">{{ msg }}</p>
      <div class="flex justify-center gap-4">
        <button @click="showDeleteRoomModal = false"
          class="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 text-white rounded-lg shadow-md font-semibold transition">
          Close
        </button>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
    <div class="bg-white w-[350px] md:w-1/3 rounded-2xl shadow-2xl p-6 transform transition-all duration-300 scale-100">
      <!-- Avatar Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-10 place-items-center">
        <div v-for="(d, i) in avaImg" :key="i" @click="selectAvatar(i)" :class="[
          'rounded-full h-24 w-24 border overflow-hidden shadow-md transition cursor-pointer',
          d.active ? 'border-4 border-amber-500 scale-110' : 'border border-gray-400 hover:scale-105'
        ]">
          <img :src="d.image" alt="avatar" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-7 flex justify-between">
        <button @click="modalTogle"
          class="px-4 py-2 bg-gray-300 text-gray-700 font-medium shadow transition rounded-md hover:bg-gray-400">
          Exit
        </button>
      </div>
    </div>
  </div>

  <div class="bg-neutral-100 min-h-screen">
    <!-- <nav-bar /> -->
    <navBeforeInRoom />

    <!-- Header -->
    <div class="h-14 flex items-center px-6 font-semibold bg-neutral-100 text-neutral-700 shadow">
      <h1 class="text-2xl">Settings</h1>
    </div>

    <!-- Sub Header -->
    <div class="bg-gray-50 px-6 py-2 flex space-x-3 border-b">
      <button @click="slide1 = !slide1"
        :class="[slide1 ? 'cursor-pointer px-4 py-1 rounded-md bg-gray-200 hover:bg-gray-300 font-medium transition' : 'cursor-pointer px-4 py-1 rounded-md bg-amber-500 text-white font-medium shadow hover:bg-amber-600 transition']">Profile</button>
      <button @click="slide1 = !slide1"
        :class="[slide1 ? 'cursor-pointer px-4 py-1 rounded-md bg-amber-500 text-white font-medium shadow hover:bg-amber-600 transition' : 'cursor-pointer px-4 py-1 rounded-md bg-gray-200 hover:bg-gray-300 font-medium transition']">Security</button>
    </div>

    <!-- Card -->
    <div v-if="!slide1" class="px-6 py-6">
      <div class="border border-gray-200 rounded-xl bg-white shadow-md">
        <!-- Card Header -->
        <div class="bg-gray-50 px-4 py-3 border-b rounded-t-xl">
          <h1 class="text-xl font-semibold text-gray-800">Profile</h1>
          <p class="text-sm text-gray-600">Kelola avatar dan data profile kamu</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="saveChange" action="">
          <section class="px-6 py-6 md:grid md:grid-cols-5 md:gap-4">
            <!-- Avatar -->
            <div class="col-span-1 md:grid md:grid-cols-2">
              <div class="hidden md:flex"></div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-700">Avatar</span>
              </div>
            </div>

            <div class="col-span-4 flex items-center ">
              <div class="rounded-full border-solid overflow-hidden h-24 w-24 border shadow-sm cursor-pointer"
                @click="modalTogle">
                <img :src="avatar || '/img/avatar/user.jpg'" alt="Avatar" class="object-cover w-full h-full" />
              </div>
              <!-- <button @click="modalTogle"
                class="bg-amber-500 cursor-pointer text-white px-5 py-2 rounded-md shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition ml-5">
                Change Avatar
              </button> -->
            </div>
            <!-- <span class="text-green-500 font-semibold ml-10">Avatar Berhasil Di Ubah</span> -->

            <!-- Role (disabled) -->
            <div class="col-span-1 md:h-14 md:grid md:grid-cols-2 mt-3 md:mt-0">
              <div class="hidden md:flex"></div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-700">Role</span>
              </div>
            </div>
            <div class="col-span-4 flex items-center">
              <input type="text"
                class="w-full rounded-md border border-gray-300 bg-gray-200 px-3 py-2 text-gray-700 shadow-sm placeholder-gray-400"
                disabled v-model="user_info.role" />
            </div>

            <!-- email (disabled) -->
            <div class="col-span-1 md:h-14 md:grid md:grid-cols-2 mt-3 md:mt-0">
              <div class="hidden md:flex"></div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-700">Email</span>
              </div>
            </div>
            <div class="col-span-4 flex items-center">
              <input type="text"
                class="w-full rounded-md border border-gray-300 bg-gray-200 px-3 py-2 text-gray-700 shadow-sm placeholder-gray-400"
                disabled v-model="user_info.email" />
            </div>

            <!-- Full Name -->
            <div class="col-span-1 md:h-14 md:grid md:grid-cols-2 mt-3 md:mt-0">
              <div class="hidden md:flex"></div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-700">Full Name</span>
              </div>
            </div>
            <div class="col-span-4 flex items-center">
              <input type="text"
                class="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700 shadow-sm placeholder-gray-400"
                v-model="user_info.fullName" />
            </div>

            <!-- Phone -->
            <div class="col-span-1 md:h-14 md:grid md:grid-cols-2 mt-3 md:mt-0">
              <div class="hidden md:flex"></div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-700">Phone</span>
              </div>
            </div>
            <div class="col-span-4 flex items-center">
              <input type="tel"
                class="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700 shadow-sm placeholder-gray-400"
                v-model="user_info.phone" />
            </div>

            <div class="col-span-5 flex justify-between mt-4">
              <span class="text-green-500 font-light">{{ succesProffileMsg }}</span>
              <div :class="[succes ? 'hidden' : 'flex']"></div>
              <button
                class="bg-amber-500 cursor-pointer text-white px-5 py-2 rounded-md shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition">
                Save Changes
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>

    <div v-else class="px-6 py-6">
      <div class="border border-gray-200 rounded-xl bg-white shadow-md">
        <!-- Card Header -->
        <div class="bg-gray-50 px-4 py-3 border-b rounded-t-xl">
          <h1 class="text-xl font-semibold text-gray-800">Change Password</h1>
          <p class="text-sm text-gray-600">Change Password by entering the old password and the new password</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="updatePass" action="">
          <section class="px-6 py-6 md:grid md:grid-cols-5 md:gap-4">

            <!-- Old Password -->
            <div class="col-span-1 md:h-14 md:grid md:grid-cols-2 mt-3 md:mt-0">
              <div class="hidden md:flex"></div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-700">Old Password</span>
              </div>
            </div>
            <div class="col-span-4 flex items-center">
              <input v-model="resetPass.oldPass" :type="showPass ? 'text' : 'password'" id="password"
                placeholder="Enter your old password"
                class="flex-1 px-4 py-2 border border-gray-300 bg-gray-100 rounded-l-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition" />

              <!-- Tombol toggle -->
              <button type="button" @click="showToggle"
                class="px-4 h-10 py-5 flex outline-none items-center justify-center bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500 hover:bg-gray-200 focus:ring-2 focus:ring-blue-400 transition">
                <i :class="showPass ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
              </button>
            </div>

            <!-- New Password -->
            <div class="col-span-1 md:h-14 md:grid md:grid-cols-2 mt-3 md:mt-0">
              <div class="hidden md:flex"></div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-700">New Password</span>
              </div>
            </div>
            <div class="col-span-4 flex items-center">
              <input v-model="resetPass.newPass" :type="showPass2 ? 'text' : 'password'" id="password"
                placeholder="Enter your new password"
                class="flex-1 px-4 py-2 border border-gray-300 bg-gray-100 rounded-l-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition" />

              <!-- Tombol toggle -->
              <button type="button" @click="showToggle2"
                class="px-4 h-10 py-5 flex outline-none items-center justify-center bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500 hover:bg-gray-200 focus:ring-2 focus:ring-blue-400 transition">
                <i :class="showPass2 ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
              </button>
            </div>

            <!-- New Password -->
            <div class="col-span-1 md:h-14 md:grid md:grid-cols-2 mt-3 md:mt-0">
              <div class="hidden md:flex"></div>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-700">Confirm New Password</span>
              </div>
            </div>
            <div class="col-span-4 flex items-center">
              <input :type="showPass3 ? 'text' : 'password'" id="password" placeholder="Confrim your new password"
                class="flex-1 px-4 py-2 border border-gray-300 bg-gray-100 rounded-l-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                v-model="newPassConfirm" />

              <!-- Tombol toggle -->
              <button type="button" @click="showToggle3"
                class="px-4 h-10 py-5 flex outline-none items-center justify-center bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500 hover:bg-gray-200 focus:ring-2 focus:ring-blue-400 transition">
                <i :class="showPass3 ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
              </button>
            </div>


            <div class="col-span-5 flex justify-between mt-4">
              <!-- <div :class="[succes ? 'hidden' : 'flex']"></div> -->
              <div class="flex"><span class="text-red-500 font-light">{{ errorMsg }}</span><span
                  class="text-green-500 font-light">{{ successMsg }}</span>
              </div>

              <button
                class="bg-amber-500 cursor-pointer text-white px-5 py-2 rounded-md shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition">
                Save Changes
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  </div>
</template>

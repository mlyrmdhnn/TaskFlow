<script setup>
import FooterComp from '@/components/footerComp.vue';
import NavBar from '@/components/navBar.vue';

</script>
<template>
  <NavBar />
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <!-- Header -->
    <section class="text-center py-16">
      <h1 class="text-4xl font-extrabold text-gray-900">Powerful Features</h1>
      <p class="mt-4 text-lg text-gray-600">
        Semua yang kamu butuhkan untuk mengelola pekerjaan lebih produktif 🚀
      </p>
    </section>

    <!-- Features Grid -->
    <section class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">

      <!-- Feature Card -->
      <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <div class="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full mb-4">
          <i class="fas fa-tasks text-blue-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Task Management</h3>
        <p class="text-gray-600">Atur, delegasikan, dan pantau semua tugas dalam satu platform dengan mudah.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <div class="w-14 h-14 flex items-center justify-center bg-green-100 rounded-full mb-4">
          <i class="fas fa-users text-green-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Team Collaboration</h3>
        <p class="text-gray-600">Bekerja sama dengan tim lebih cepat dengan sistem kolaborasi real-time.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <div class="w-14 h-14 flex items-center justify-center bg-yellow-100 rounded-full mb-4">
          <i class="fas fa-chart-line text-yellow-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Progress Tracking</h3>
        <p class="text-gray-600">Lihat progress pekerjaan dengan dashboard visual dan grafik analitik.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <div class="w-14 h-14 flex items-center justify-center bg-purple-100 rounded-full mb-4">
          <i class="fas fa-lock text-purple-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Secure Authentication</h3>
        <p class="text-gray-600">Data aman dengan sistem login, enkripsi, dan manajemen role user.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <div class="w-14 h-14 flex items-center justify-center bg-pink-100 rounded-full mb-4">
          <i class="fas fa-bell text-pink-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Smart Notifications</h3>
        <p class="text-gray-600">Jangan pernah ketinggalan tugas dengan notifikasi real-time.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <div class="w-14 h-14 flex items-center justify-center bg-indigo-100 rounded-full mb-4">
          <i class="fas fa-cloud text-indigo-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Cloud Storage</h3>
        <p class="text-gray-600">Simpan semua dokumen dan data penting di cloud dengan akses kapan saja.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <div class="w-14 h-14 flex items-center justify-center bg-red-100 rounded-full mb-4">
          <i class="fas fa-mobile-alt text-red-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Mobile Friendly</h3>
        <p class="text-gray-600">Gunakan aplikasi di perangkat apa pun dengan desain responsif.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <div class="w-14 h-14 flex items-center justify-center bg-teal-100 rounded-full mb-4">
          <i class="fas fa-cogs text-teal-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Customizable</h3>
        <p class="text-gray-600">Sesuaikan fitur dan tampilan sesuai kebutuhan bisnismu.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <div class="w-14 h-14 flex items-center justify-center bg-orange-100 rounded-full mb-4">
          <i class="fas fa-sync-alt text-orange-600 text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Real-time Sync</h3>
        <p class="text-gray-600">Semua data selalu terupdate otomatis tanpa harus refresh halaman.</p>
      </div>
    </section>
    <FooterComp />
  </div>
</template>

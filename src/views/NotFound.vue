<script setup>
import FooterComp from '@/components/footerComp.vue';
import navBar from '@/components/navBar.vue';
</script>
<template>
  <navBar />
  <div class="min-h-screen md:min-h-fit grid md:grid-cols-2 bg-gray-50 px-6">

    <div class="md:flex hidden flex-col items-center justify-center min-h-screen md:min-h-fit">
      <img src="/img/logo/TaskFlow.png" alt="">
    </div>
    <div class="flex flex-col items-center justify-center min-h-screen md:min-h-fit">
      <h1 class="text-6xl font-extrabold text-gray-800">404</h1>
      <p class="mt-2 text-lg text-gray-600">Halaman tidak ditemukan</p>

      <p class="mt-1 text-gray-500 text-center max-w-md">
        Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
      </p>

      <div class="mt-6 flex space-x-4">
        <RouterLink to="/"
          class="px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition">
          Kembali ke Beranda
        </RouterLink>
        <RouterLink to="/contact"
          class="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium shadow hover:bg-gray-300 transition">
          Pusat Bantuan
        </RouterLink>
      </div>
    </div>
  </div>
  <FooterComp />
</template>

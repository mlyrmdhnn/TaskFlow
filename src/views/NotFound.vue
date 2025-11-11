<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
    <!-- Ilustrasi -->
    <div class="w-72 mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
        class="w-full h-full text-gray-400">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9V5.25a.75.75 0 01.75-.75h9.75a.75.75 0 01.75.75V9m-11.25 0H4.5a.75.75 0 00-.75.75v9.75c0
             .414.336.75.75.75h15a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-3.75m-11.25 0V5.25A.75.75
             0 015.25 4.5h3.75a.75.75 0 01.75.75V9m3 6.75h.008v.008H12v-.008z" />
      </svg>
    </div>

    <!-- Judul -->
    <h1 class="text-6xl font-extrabold text-gray-800">404</h1>
    <p class="mt-2 text-lg text-gray-600">Halaman tidak ditemukan</p>

    <!-- Deskripsi -->
    <p class="mt-1 text-gray-500 text-center max-w-md">
      Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
    </p>

    <!-- Tombol Aksi -->
    <div class="mt-6 flex space-x-4">
      <RouterLink to="/"
        class="px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition">
        Kembali ke Beranda
      </RouterLink>
      <RouterLink to="/help"
        class="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium shadow hover:bg-gray-300 transition">
        Pusat Bantuan
      </RouterLink>
    </div>
  </div>
</template>

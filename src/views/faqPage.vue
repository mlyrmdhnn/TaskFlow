<script setup>
import FooterComp from '@/components/footerComp.vue'
import NavBar from '@/components/navBar.vue'
import { ChevronDown } from "lucide-vue-next"
import { ref } from "vue"

const faqs = ref([
  {
    q: "Apa itu TaskFlow?",
    a: "TaskFlow adalah aplikasi manajemen tugas sederhana namun powerful yang membantu tim dan individu mengatur pekerjaan mereka dengan mudah."
  },
  {
    q: "Apakah TaskFlow gratis digunakan?",
    a: "Ya, TaskFlow menyediakan versi gratis dengan fitur dasar. Untuk fitur premium, tersedia paket berlangganan."
  },
  {
    q: "Bagaimana cara mengundang anggota tim?",
    a: "Anda bisa membagikan link undangan unik dari room yang Anda buat. Anggota cukup masukan link tersebut untuk bergabung."
  },
  {
    q: "Apakah data saya aman?",
    a: "Ya, kami menggunakan autentikasi aman dan praktik enkripsi standar industri untuk melindungi data Anda."
  },
  {
    q: "Apakah bisa diakses dari perangkat mobile?",
    a: "TaskFlow berbasis web responsif, jadi Anda bisa mengaksesnya dengan nyaman dari laptop, tablet, maupun smartphone."
  },
  {
    q: "Apakah TaskFlow mendukung multi-room?",
    a: "Ya, Anda dapat membuat beberapa room untuk memisahkan proyek atau tim agar lebih terorganisir."
  },
  {
    q: "Apakah saya bisa menambahkan deadline untuk setiap tugas?",
    a: "Tentu, Anda bisa menetapkan deadline dan akan ada indikator warna jika tugas mendekati atau melewati batas waktu."
  },
  {
    q: "Apakah bisa mengatur hak akses anggota?",
    a: "Ya, TaskFlow menyediakan role seperti Manager dan Employee untuk membedakan hak akses."
  },
  {
    q: "Apakah ada aplikasi desktop?",
    a: "Saat ini TaskFlow bisa diakses lewat browser, dan aplikasi desktop sedang dalam tahap pengembangan."
  },
  {
    q: "Bagaimana cara melaporkan bug?",
    a: "Anda bisa melaporkan bug melalui menu 'Contact' di aplikasi atau menghubungi tim support kami."
  },
])

const openIndex = ref(null)

const toggleFAQ = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div class="bg-neutral-100 min-h-screen flex flex-col font-sans">
    <!-- NAVBAR -->
    <NavBar />

    <!-- HERO -->
    <section
      class="flex flex-col items-center justify-center text-center px-6 md:px-20 py-24 bg-gradient-to-br from-neutral-50 to-gray-100">
      <h2 class="text-5xl font-extrabold text-gray-800 leading-tight">
        Frequently Asked <span class="text-amber-500">Questions</span>
      </h2>
      <p class="mt-6 text-gray-600 text-lg leading-relaxed max-w-2xl">
        Temukan jawaban untuk pertanyaan yang paling sering ditanyakan tentang TaskFlow.
      </p>
    </section>

    <!-- FAQ LIST -->
    <section class="px-6 md:px-20 py-20 bg-white flex-1">
      <div class="max-w-3xl mx-auto">
        <div v-for="(item, index) in faqs" :key="index" class="border-b border-neutral-200 py-4">
          <button class="w-full flex justify-between items-center text-left focus:outline-none"
            @click="toggleFAQ(index)">
            <span class="text-lg font-semibold text-gray-800">{{ item.q }}</span>
            <ChevronDown
              :class="['h-5 w-5 transition-transform duration-300', openIndex === index ? 'rotate-180 text-amber-500' : 'text-gray-500']" />
          </button>
          <div v-show="openIndex === index" class="mt-3 text-gray-600 leading-relaxed">
            {{ item.a }}
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <FooterComp />
  </div>
</template>

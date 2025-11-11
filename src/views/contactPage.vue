<template>
  <NavBar />
  <section class="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
    <div class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl p-8">

      <!-- Ilustrasi -->
      <div class="flex items-center justify-center">
        <img src="/img/contact.png" alt="Contact Illustration" class="w-4/5 md:w-full" />
      </div>

      <!-- Form Contact -->
      <div>
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <p class="text-gray-600 mb-6">Kami siap membantu Anda, silakan tinggalkan pesan Anda di bawah ini.</p>

        <form @submit.prevent="submitForm" class="space-y-5">
          <div>
            <label for="name" class="block text-gray-700 font-medium mb-1">Nama</label>
            <input type="text" id="name" v-model="form.name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              placeholder="Masukkan nama Anda" required />
          </div>

          <div>
            <label for="email" class="block text-gray-700 font-medium mb-1">Email</label>
            <input type="email" id="email" v-model="form.email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              placeholder="Masukkan email Anda" required />
          </div>

          <div>
            <label for="message" class="block text-gray-700 font-medium mb-1">Pesan</label>
            <textarea id="message" v-model="form.message" rows="5"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none resize-none"
              placeholder="Tulis pesan Anda..." required></textarea>
          </div>

          <button type="submit"
            class="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition">
            Kirim Pesan
          </button>
        </form>
      </div>
    </div>
  </section>
  <FooterComp />
</template>

<script setup>
import FooterComp from "@/components/footerComp.vue"
import NavBar from "@/components/navBar.vue"
import { ref } from "vue"
import emailjs from "emailjs-com"

const form = ref({
  name: "",
  email: "",
  message: ""
})

const submitForm = () => {
  emailjs.send(
    "service_5m0o5gk",
    "template_nuysshr",
    {
      name: form.value.name,
      email: form.value.email,
      message: form.value.message,
    },
    "lMEne5Cijf6cN3R-l"
  )
    .then(() => {
      alert("Pesan berhasil terkirim ")
      form.value = { name: "", email: "", message: "" }
    })
    .catch((err) => {
      console.error("Gagal kirim pesan:", err)
      alert("gagal mengirim pesan ")
    })
}
</script>

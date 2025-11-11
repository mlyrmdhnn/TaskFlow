<script setup>
import CardLanding from '@/components/cardLanding.vue'
import FooterComp from '@/components/footerComp.vue';
import NavBar from '@/components/navBar.vue';
import { ListChecks, ShieldCheck, UserPlus } from "lucide-vue-next"
// import { useRoute } from 'vue-router';
// import { useState } from '@/stores/state';
import router from '@/router';
// const route = useRoute()
// const state = useState()
// state.selectedUrl(route.path)
const tryNoww = () => {
  router.push('/login')
}
</script>

<template>
  <div class="bg-neutral-100 min-h-screen flex flex-col font-sans">
    <!-- HEADER / NAVBAR -->
    <NavBar />
    <!-- HERO SECTION -->
    <section
      class="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-24 bg-gradient-to-br from-neutral-50 to-gray-100">
      <!-- Text -->
      <div class="md:w-1/2 text-center md:text-left">
        <h2 class="text-5xl font-extrabold text-gray-800 leading-tight">
          Make your task management <br />
          <span class="text-amber-500">easier & smarter</span>
        </h2>
        <p class="mt-6 text-gray-600 text-lg leading-relaxed">
          Organize, track, and complete your tasks effortlessly with a simple yet powerful workflow system.
        </p>
        <div class="mt-8 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <button @click="tryNoww"
            class="bg-amber-500 cursor-pointer hover:bg-amber-600 text-white px-6 py-3 rounded-xl shadow-lg transition">
            <!-- <router-link to="/login">Try Now</router-link> -->
            Try Now
          </button>
          <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl transition">
            <router-link to="/more">Learn More</router-link>
          </button>
        </div>
      </div>
      <!-- Image -->
      <div class="md:w-1/2 mt-12 md:mt-0 flex justify-center">
        <img src="/img/preview.jpg" alt="TaskFlow Preview"
          class="rounded-2xl shadow-2xl w-3/4 md:w-full transition hover:scale-105 duration-300" />
      </div>
    </section>

    <!--FEATURES SECTION-->
    <section id="features" class="px-6 md:px-20 py-20 bg-white">
      <div class="text-center mb-14">
        <h2 class="text-4xl font-bold text-gray-800">What TaskFlow Can Do For You</h2>
        <p class="mt-4 text-gray-600 max-w-2xl mx-auto">
          Everything you need to manage tasks, collaborate with your team, and stay productive.
        </p>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CardLanding :icon="ListChecks" desc="Manage all of your tasks in one place" />
        <CardLanding :icon="ShieldCheck" desc="Secure login to keep your data safe" />
        <CardLanding :icon="UserPlus" desc="Quick and easy registration process" />
      </div>
    </section>

    <!--ABOUT SECTION-->
    <section id="about" class="px-6 md:px-20 py-20 bg-neutral-50">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-4xl font-bold text-gray-800">About TaskFlow</h2>
        <p class="mt-6 text-gray-600 leading-relaxed">
          TaskFlow is a lightweight task management application built with Vue and PHP to help teams
          and individuals boost their productivity. With its simple interface and powerful features,
          TaskFlow ensures you stay on track with your goals.
        </p>
      </div>
    </section>

    <!-- LOCATION -->
    <section class="px-6 md:px-20 py-20 bg-neutral-50">
      <div class="text-center">
        <h2 class="text-4xl font-bold text-gray-800">Our Location</h2>
        <div class="w-full mt-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0065039918677!2d106.77800649678954!3d-6.262872399999979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1a626f1a6ad%3A0x29c9bb86aa9ebd5c!2sPT%20AMERTA%20INDAH%20OTSUKA!5e0!3m2!1sid!2sid!4v1755945658740!5m2!1sid!2sid"
            allowfullscreen="" loading="lazy" class="w-full h-100 border-none shadow-lg"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>

    <!--FOOTER-->
    <FooterComp />

  </div>
</template>

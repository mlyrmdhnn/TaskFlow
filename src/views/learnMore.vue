<script setup>
import NavBar from '@/components/navBar.vue';
import footerComp from '@/components/footerComp.vue';
</script>
<template>
  <NavBar />
  <div class="bg-neutral-100 min-h-screen flex flex-col font-sans">
    <!-- HEADER -->


    <!-- HERO -->
    <section class="px-6 md:px-20 py-20 bg-gradient-to-br from-neutral-50 to-gray-100">
      <div class="text-center max-w-3xl mx-auto">
        <h2 class="text-4xl font-extrabold text-gray-800">
          Learn More About <span class="text-amber-500">TaskFlow</span>
        </h2>
        <p class="mt-6 text-gray-600 text-lg leading-relaxed">
          Dive deeper into how TaskFlow helps you manage your workflow, boost productivity,
          and collaborate seamlessly with your team.
        </p>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="px-6 md:px-20 py-20 bg-white">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Image -->
        <div>
          <img src="/img/preview.jpg" alt="Learn More Preview"
            class="rounded-2xl shadow-xl w-full hover:scale-105 transition duration-300" />
        </div>
        <!-- Text -->
        <div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Why Choose TaskFlow?</h3>
          <ul class="space-y-4 text-gray-600 leading-relaxed">
            <li class="list-disc"> Simple & intuitive interface</li>
            <li class="list-disc"> Secure login and registration system</li>
            <li class="list-disc"> Team collaboration tools</li>
            <li class="list-disc"> Scalable for personal or team projects</li>
          </ul>
          <div class="mt-8">
            <button class="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl shadow-lg transition">
              <router-link to="/login"> Get Started Today</router-link>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footerComp />
  </div>
</template>
